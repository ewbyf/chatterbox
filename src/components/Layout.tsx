import Navbar from './Navbar';
import Theme from './Theme';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import NotificationBell from './NotificationBell';
import Router, { useRouter } from 'next/router';
import api from '@/services/axiosConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SocketContext } from '@/pages/_app';
import { IUser, INotifications, IRequest, Notification } from '../interfaces';

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
    updateUser: () => void;
    removeNotification: (notificationObj: Notification) => void;
    removeFriendRequest: (id: number) => void;
    setDmsUnread: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = React.createContext<IUserContext>({
    darkTheme: false,
    user: { id: 0, username: '', token: '', avatar: '', email: '' },
    notificationsList: { unread: 0, notifications: [] },
    friendStatus: null,
    friendRequests: [],
    dmsUnread: 0,
    updateUser: () => {},
    removeNotification: () => {},
    removeFriendRequest: () => {},
    setDmsUnread: () => {},
});

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (val: string) => {}
});

export default function Layout({ children, theme }: IProps) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({ id: 0, username: '', token: '', avatar: '', email: '' });
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
        }, 25000);
      
        return () => clearInterval(interval); 
      }, [socket])

    useEffect(() => {
        const changeStatus = async (e: MessageEvent) => {
            const obj = JSON.parse(e.data);
            console.log(obj);

            if (obj.type == 'STATUS_CHANGE') {
                setFriendStatus(obj);
            } else if (obj.type == 'FRIEND_REQ') {
                setFriendRequests((friendRequests) => [...friendRequests, obj]);
            } else if (obj.type == 'NEW_FRIEND') {
                setNotificationsList((notificationsList) => {
                    return { unread: notificationsList.unread + 1, notifications: [obj, ...notificationsList.notifications] };
                });
            }
            else if (obj.type == 'MESSAGE') {
                setDmsUnread((dmsUnread) => dmsUnread + 1);
            }
        };
        socket?.addEventListener('message', changeStatus);

        return () => {
            socket?.removeEventListener('message', changeStatus);
        };
    }, [socket]);

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
                await api.get(`/friend-requests?token=${userToken}`)
                .then((resp) => {
                    setFriendRequests(resp.data);
                })
                .catch((err) => {
                    localStorage.removeItem('userToken');
                    router.push({
                        pathname: '/login'
                    });
                });
                await api.get(`/notifications?token=${userToken}`).then((resp) => {
                    console.log(resp.data);
                    setNotificationsList({ unread: resp.data.length, notifications: resp.data });
                    openSocket();
                    setInitializing(false);
                })
                .catch((err) => {
                    localStorage.removeItem('userToken');
                    router.push({
                        pathname: '/login'
                    });
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

    const updateUser = () => {
        const userToken = localStorage.getItem('userToken');
        api.get(`me?token=${userToken}`).then((snap) => {
            setUser(snap.data);
        });
    };

    const toggleTheme = (val: string) => {
        if (val == 'light') {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        setDarkTheme(!darkTheme);
    };

    const removeNotification = (notificationObj: Notification) => {
        setNotificationsList((notificationsList) => {return { unread: notificationsList.unread - 1, notifications: notificationsList.notifications.filter((notification) => notification != notificationObj) }});
        if (notificationObj.from) {
            api.post('/clear-notification', { token: user.token, from: notificationObj.from.id})
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
        else if (notificationObj.friend || notificationObj.to) {
            api.post('/clear-notification', { token: user.token, to: (notificationObj.friend ? notificationObj.friend!.id : notificationObj.to!.id)})
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
        else if (notificationObj.channel) {
            api.post('/clear-notification', { token: user.token, channel: notificationObj.channel!.id})
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
    };

    const removeFriendRequest = (id: number) => {
        setFriendRequests(friendRequests.filter((request) => request.from.id != id));
    };

    if (initializing) return null; // loading screen here

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
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
                    setDmsUnread,
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
