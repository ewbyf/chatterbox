import Navbar from './Navbar';
import Theme from './Theme';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import NotificationBell from './NotificationBell';
import Router, { useRouter } from 'next/router';
import api from '@/services/axiosConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SocketContext } from '@/pages/_app';
import { IUser } from '../interfaces';

interface IProps {
    children: JSX.Element;
    theme: boolean;
}

interface Status {
    id: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
}

interface Notifications {
    id: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
}

interface IUserContext {
    darkTheme: boolean;
    user: IUser;
    notifications: Notifications[];
    friendStatus: Status | null;
    updateUser: () => void;
}

export const UserContext = React.createContext<IUserContext>({
    darkTheme: false,
    user: { id: 0, username: '', token: '', avatar: '', email: '' },
    notifications: [],
    friendStatus: null,
    updateUser: () => {}
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
    const [notifications, setNotifications] = useState<Notifications[]>([]);
    const [friendStatus, setFriendStatus] = useState<Status | null>(null);

    useEffect(() => {
        const changeStatus = async (e: MessageEvent) => {
            console.log(JSON.parse(e.data));

            const obj = JSON.parse(e.data);

            if (obj.type == 'STATUS_CHANGE') {
                setFriendStatus(obj);
            } else if (obj.type == 'MESSAGE') {
                console.log(obj);
                setNotifications([...notifications, obj]);
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

    if (initializing) return null; // loading screen here

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <UserContext.Provider value={{ darkTheme, user, notifications, friendStatus, updateUser }}>
                <ThemeUpdateContext.Provider value={{ toggleTheme }}>
                    <Navbar noOverlap={noOverlap} />
                    {!mobile && <NotificationBell />}
                    <Theme noOverlap={noOverlap}>{children}</Theme>
                </ThemeUpdateContext.Provider>
            </UserContext.Provider>
        </div>
    );
}
