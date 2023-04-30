import Navbar from './Navbar';
import Theme from './Theme';
import React, { useEffect, useState, useContext, useMemo, useRef } from 'react';
import NotificationBell from './NotificationBell';
import Router, { useRouter } from 'next/router';
import api from '@/services/axiosConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SocketContext } from '@/pages/_app';
import { IUser, INotifications, IRequest, Notification } from '../interfaces';
import Loading from './Loading';

interface IProps {
    children: JSX.Element;
    theme: boolean;
}

interface Status {
    id: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
}

interface IUserContext {
    darkTheme: boolean;
    user: IUser;
    notificationsList: INotifications;
    friendStatus: Status | null;
    friendRequests: IRequest[];
    dmsUnread: number;
    updateUser: (newUser: IUser) => void;
    removeNotification: (notificationObj: Notification) => void;
    removeFriendRequest: (id: number) => void;
    setDmsUnread: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = React.createContext<IUserContext>({
    darkTheme: false,
    user: { id: 0, username: '', token: '', avatar: '', email: '', settings: { notifications: 'ALL', lightmode: 0 }, status: 'ONLINE' },
    notificationsList: { unread: 0, notifications: [] },
    friendStatus: null,
    friendRequests: [],
    dmsUnread: 0,
    updateUser: () => {},
    removeNotification: async () => {},
    removeFriendRequest: () => {},
    setDmsUnread: () => {}
});

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (val: string) => {}
});

export default function Layout({ children, theme }: IProps) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({
        id: 0,
        username: '',
        token: '',
        avatar: '',
        email: '',
        settings: { notifications: 'ALL', lightmode: 0 },
        status: 'ONLINE'
    });
    const [initializing, setInitializing] = useState<boolean>(true);
    const [noOverlap, setNoOverlap] = useState<boolean>(false);
    const mobile = useMediaQuery('(max-width: 800px)');
    const router = useRouter();
    const { socket, openSocket, closeSocket } = useContext(SocketContext);
    const [notificationsList, setNotificationsList] = useState<INotifications>({ unread: 0, notifications: [] });
    const [friendStatus, setFriendStatus] = useState<Status | null>(null);
    const [friendRequests, setFriendRequests] = useState<IRequest[]>([]);
    const [dmsUnread, setDmsUnread] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            socket?.send(JSON.stringify({ type: 'PING' }));
        }, 22000);

        return () => clearInterval(interval);
    }, [socket]);

    useEffect(() => {
        const changeStatus = async (e: MessageEvent) => {
            const obj = JSON.parse(e.data);
            console.log(obj);

            if (obj.type == 'STATUS_CHANGE') {
                setFriendStatus(obj);
            } else if (obj.type == 'FRIEND_REQ') {
                setFriendRequests((friendRequests) => [...friendRequests, obj]);
                setNotificationsList({ unread: notificationsList.unread + 1, notifications: [obj, ...notificationsList.notifications] });
            } else if (obj.type == 'NEW_FRIEND') {
                setNotificationsList({ unread: notificationsList.unread + 1, notifications: [obj, ...notificationsList.notifications] });
            } else if (obj.type == 'MESSAGE') {
                const index = notificationsList.notifications.findIndex((notification) => notification.channel?.id == obj.message.channel.id);
                if (index > -1) {
                    console.log(notificationsList.notifications);
                    let temp = notificationsList.notifications;
                    temp[index].count!++;
                    setNotificationsList({ ...notificationsList, notifications: [...temp] });
                } else {
                    let temp = obj.message;
                    temp.count = 1;
                    setNotificationsList({ unread: notificationsList.unread + 1, notifications: [temp, ...notificationsList.notifications] });
                }
                if (obj.message.channel.type == 'direct') {
                    setDmsUnread((dmsUnread) => dmsUnread + 1);
                }
            } else if (obj.type == 'CONNECT_SUCCESS') {
                const userToken = localStorage.getItem('userToken');
                if (userToken) {
                    api.get(`/me?token=${userToken}`)
                        .then((snap) => {
                            setUser(snap.data);
                        })
                        .catch((err) => {
                            localStorage.removeItem('userToken');
                            router.push({
                                pathname: '/login'
                            });
                        });
                }
            }
        };
        socket?.addEventListener('message', changeStatus);

        return () => {
            socket?.removeEventListener('message', changeStatus);
        };
    }, [socket, notificationsList]);

    useEffect(() => {
        const tabClose = () => {
            closeSocket();
        };

        window.addEventListener('unload', tabClose);
        return () => {
            window.removeEventListener('unload', tabClose);
        };
    });

    useEffect(() => {
        const sendMsg = (e: CloseEvent) => {
            console.log(e.code);
        };

        socket?.addEventListener('close', (e) => sendMsg(e));

        return () => {
            socket?.removeEventListener('close', sendMsg);
        };
    });

    useEffect(() => {
        const getData = async () => {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                await api
                    .get(`/me?token=${userToken}`)
                    .then((snap) => {
                        setUser(snap.data);
                    })
                    .catch((err) => {
                        localStorage.removeItem('userToken');
                        router.push({
                            pathname: '/login'
                        });
                    });
                await api
                    .get(`/friend-requests?token=${userToken}`)
                    .then((resp) => {
                        setFriendRequests(resp.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                await api
                    .get(`/notifications?token=${userToken}`)
                    .then((resp) => {
                        setNotificationsList({ unread: resp.data.length, notifications: resp.data.reverse() });
                        openSocket();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                await api
                    .get(`/unreads?token=${userToken}`)
                    .then((resp) => {
                        setDmsUnread(resp.data);
                        setInitializing(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                router.push({
                    pathname: '/login'
                });
            }
        };

        getData();
    }, []);

    useEffect(() => {
        if (router.pathname.startsWith(`/app/messages`) || router.pathname.startsWith(`/app/explore`)) {
            setNoOverlap(true);
        } else {
            setNoOverlap(false);
        }
    }, [router]);

    const updateUser = (newUser: IUser) => {
        setUser(newUser);
    };

    const toggleTheme = (val: string) => {
        if (val == 'light') {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        setDarkTheme(!darkTheme);
    };

    const removeNotification = async (notificationObj: Notification) => {
        setNotificationsList({
            unread: notificationsList.unread - 1,
            notifications: notificationsList.notifications.filter((notification) => notification != notificationObj)
        });
        if (notificationObj.from) {
            await api
                .post('/clear-notification', { token: user.token, from: notificationObj.from.id })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        } else if (notificationObj.friend || notificationObj.to) {
            await api
                .post('/clear-notification', { token: user.token, to: notificationObj.friend ? notificationObj.friend!.id : notificationObj.to!.id })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        } else if (notificationObj.channel) {
            await api
                .post('/clear-notification', { token: user.token, channel: notificationObj.channel!.id })
                .then(async (resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        }
    };

    const removeFriendRequest = (id: number) => {
        const index = notificationsList.notifications.findIndex((noti) => noti.from?.id === id);
        if (index > -1) {
            removeNotification(notificationsList.notifications[index]);
        }
        setFriendRequests(friendRequests.filter((request) => request.from.id != id));
    };

    if (initializing) {
        return (
            <div style={{ backgroundColor: darkTheme ? '#181818' : 'white', height: '100vh' }}>
                <Loading />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }} >
            <UserContext.Provider
                value={{
                    darkTheme,
                    user,
                    notificationsList,
                    friendStatus,
                    friendRequests,
                    dmsUnread,
                    updateUser,
                    removeNotification,
                    removeFriendRequest,
                    setDmsUnread
                }}
            >
                <ThemeUpdateContext.Provider value={{ toggleTheme }}>
                    <Navbar noOverlap={noOverlap} />
                    {!mobile && <NotificationBell />}
                    <Theme noOverlap={noOverlap}>{children}</Theme>
                </ThemeUpdateContext.Provider>
            </UserContext.Provider>
        </div>
    );
}
