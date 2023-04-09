import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';
import NotificationBell from "./NotificationBell";
import Router, { useRouter } from "next/router";
import api from "@/services/axiosConfig";
import useMediaQuery from '@mui/material/useMediaQuery';

interface IProps {
    children: JSX.Element,
    theme: boolean
}

interface IUser {
    id: number;
    username: string;
    token: string;
    avatar: string;
    email: string;
}

interface IUserContext {
    darkTheme: boolean;
    user: IUser;
    updateUser: () => void;
}  

export const UserContext = React.createContext<IUserContext>({
    darkTheme: false,
    user: {id: 0, username: "", token: "", avatar: "", email: ""},
    updateUser: () => {},
});

export const SocketContext = React.createContext<{socket: WebSocket | undefined}>({
    socket: undefined,
});


export const ThemeUpdateContext = React.createContext({
    toggleTheme: (val: string) => {},
});


export default function Layout({ children, theme }: IProps) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({id: 0, username: "", token: "", avatar: "", email: ""});
    const [initializing, setInitializing] = useState<boolean>(true);
    const [noOverlap, setNoOverlap] = useState<boolean>(false);
    const mobile = useMediaQuery('(max-width: 800px)');
    const router = useRouter();

    const socket = new WebSocket(`wss://${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

    useEffect(() => {
        const sendMsg = () => {
          const userToken = localStorage.getItem("userToken");
          if (userToken) {
              socket?.send(JSON.stringify({ type: 'CONNECT', token: userToken }));
          }
        }
    
        socket?.addEventListener('open', sendMsg);
    
        return () => {
          socket?.removeEventListener('open', sendMsg);
        }
    }, []);

    useEffect(() => {
        const getUser = async() => {
            const userToken = localStorage.getItem("userToken");
            if (userToken) {
                await api.get(`me?token=${userToken}`)
                .then((snap) => {
                    setUser(snap.data);
                    setInitializing(false);
                })
                .catch((err) => {
                    localStorage.removeItem("userToken");
                    router.push({
                        pathname: "/login",
                     });
                })
            }
            else {
                router.push({
                    pathname: "/login",
                 });
            }
        }

        getUser();
    }, [])

    useEffect(() => {
        if(router.pathname.startsWith(`/app/messages`) || router.pathname.startsWith(`/app/explore`)) {
            setNoOverlap(true);
        }
        else {
            setNoOverlap(false);
        }
    }, [router])

    const updateUser = () => {
        const userToken = localStorage.getItem("userToken");
        api.get(`me?token=${userToken}`)
        .then((snap) => {
            setUser(snap.data);
        })
    }

    const toggleTheme = (val: string) => {
        if (val == "light") {
            localStorage.setItem("theme", "light");
        }
        else {
            localStorage.setItem("theme", "dark");
        }
        setDarkTheme(!darkTheme);
    }

    if (initializing) return null; // loading screen here


    return (
        <div style={{display: "flex", height: "100vh"}}>
        <UserContext.Provider value={{darkTheme, user, updateUser}}>
            <ThemeUpdateContext.Provider value={{toggleTheme}}>
                <SocketContext.Provider value={{socket}}>
                    <Navbar noOverlap={noOverlap}/>
                    {!mobile && <NotificationBell />}
                    <Theme noOverlap={noOverlap}>
                        { children }
                    </Theme>
                </SocketContext.Provider>
            </ThemeUpdateContext.Provider>
        </UserContext.Provider>
    </div>
    );
}