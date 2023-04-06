import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';
import NotificationBell from "./NotificationBell";
import Router from "next/router";
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

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (val: string) => {},
});


export default function Layout({ children, theme }: IProps) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({id: 0, username: "", token: "", avatar: "", email: ""});
    const [initializing, setInitializing] = useState<boolean>(true);
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
                .catch((err) => {
                    localStorage.removeItem("userToken");
                    Router.push({
                        pathname: "/login",
                     });
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

    if (initializing) return null;

    return (
        <UserContext.Provider value={{darkTheme, user, updateUser}}>
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