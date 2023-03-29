import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';
import NotificationBell from "./NotificationBell";
import Router from "next/router";
import api from "@/services/axiosConfig";
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
    children: JSX.Element,
    theme: boolean
}

export const UserContext = React.createContext({
    darkTheme: false,
    user: {id: "", username: "", token: "", avatar: "", email: ""},
});

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (val: string): void => {},
});

interface IUser {
    id: string;
    username: string;
    token: string;
    avatar: string;
    email: string;
}

export default function Layout({ children, theme }: Props) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({id: "", username: "", token: "", avatar: "", email: ""});
    const [initializing, setInitializing] = useState<boolean>(false);
    const mobile = useMediaQuery('(max-width: 800px)');

    useEffect(() => {
        const getUser = async() => {
            const userToken = localStorage.getItem("userToken");
            if (userToken) {
                await api.get(`me?token=${userToken}`)
                .then((snap) => {
                    setUser(snap.data);
                    setInitializing(false);
                })
            }
            else {
                Router.push({
                    pathname: "/login",
                 });
            }
        }

        getUser();
    }, [])

    const toggleTheme = (val: string): void => {
        if (val == "light") {
            localStorage.setItem("theme", "light");
        }
        else {
            localStorage.setItem("theme", "dark");
        }
        setDarkTheme(!darkTheme);
    }

    if (initializing) return null;

    return (
        <UserContext.Provider value={{darkTheme, user}}>
            <ThemeUpdateContext.Provider value={{toggleTheme}}>
                <Navbar/>
                {!mobile && <NotificationBell />}
                <Theme>
                    { children }
                </Theme>
            </ThemeUpdateContext.Provider>
        </UserContext.Provider>
    );
}