import Navbar from './Navbar';
import Theme from './Theme';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import NotificationBell from './NotificationBell';
import Router, { useRouter } from 'next/router';
import api from '@/services/axiosConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SocketContext } from '@/pages/_app';
import { IUser, INotifications } from '../interfaces';


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
    updateUser: () => void;
    clearNotifications: () => void;
    removeNotification: (key: number) => void;
}

export const UserContext = React.createContext<IUserContext>({
    darkTheme: false,
    user: { id: 0, username: '', token: '', avatar: '', email: '' },
    notificationsList: {unread: 0, notifications: []},
    friendStatus: null,
    updateUser: () => {},
    clearNotifications: () => {},
    removeNotification: () => {}
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
    const [notificationsList, setNotificationsList] = useState<INotifications>({unread: 0, notifications: []});
    const [friendStatus, setFriendStatus] = useState<Status | null>(null);

    useEffect(() => {
        const changeStatus = async (e: MessageEvent) => {
            const obj = JSON.parse(e.data);
            console.log(obj)

            if (obj.type == 'STATUS_CHANGE') {
                setFriendStatus(obj);
            }
            else if (obj.type == 'MESSAGE') {
                setNotificationsList((notificationsList) => {return {unread: notificationsList.unread + 1, notifications: [...notificationsList.notifications, obj]}});
            }
            else if (obj.type == 'FRIEND_REQ') {
                setNotificationsList((notificationsList) => {return {unread: notificationsList.unread + 1, notifications: [...notificationsList.notifications, obj]}});
            }
        }
        socket?.addEventListener('message', changeStatus);

        return () => {
            socket?.removeEventListener('message', changeStatus);
        }
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
        const sendMsg = () => {
          console.log('close')
        }
    
        socket?.addEventListener('close', sendMsg);
    
        return () => {
          socket?.removeEventListener('close', sendMsg);
        }
    });
    

    useEffect(() => {
        const getUser = async () => {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                await api
                    .get(`me?token=${userToken}`)
                    .then((snap) => {
                        setUser(snap.data);
                        console.log(userToken)
                        api.get(`notifications?token=${userToken}`)
                        .then((resp) => {
                            console.log(resp.data)
                            setNotificationsList({unread: resp.data.length, notifications: resp.data});
                            openSocket();
                            setInitializing(false);
                        })
                        .catch((err) => {
                            console.log(err)
                        });
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

        getUser();
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

    const clearNotifications = () => {
        setNotificationsList({...notificationsList, unread: 0});
    }

    const removeNotification = (key: number) => {
        setNotificationsList({unread: 0, notifications: notificationsList.notifications.filter((notification) => notification.message.id != key)});
    }

    if (initializing) return null; // loading screen here

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <UserContext.Provider value={{ darkTheme, user, notificationsList, friendStatus, updateUser, clearNotifications, removeNotification }}>
                <ThemeUpdateContext.Provider value={{ toggleTheme }}>
                    <Navbar noOverlap={noOverlap} />
                    {!mobile && <NotificationBell notificationsList={notificationsList}/>}
                    <Theme noOverlap={noOverlap}>{children}</Theme>
                </ThemeUpdateContext.Provider>
            </UserContext.Provider>
        </div>
    );
}
