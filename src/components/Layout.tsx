import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';
import NotificationBell from "./NotificationBell";
import ProfileIcon from "./ProfileIcon"
import Router from "next/router";
import axios from "axios";

interface Props {
    children: JSX.Element,
    theme: boolean
}

export const UserContext = React.createContext({
    darkTheme: true,
    user: {id: "", username: "", token: "", avatar: ""},
});

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (): void => {},
});

interface IUser {
    id: string;
    username: string;
    token: string;
    avatar: string;
}



export default function Layout({ children, theme }: Props) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);
    const [user, setUser] = useState<IUser>({id: "", username: "", token: "", avatar: ""});
    const [initializing, setInitializing] = useState<boolean>(false);

    useEffect(() => {
        const getUser = async() => {
            const userToken = localStorage.getItem("userToken");
            if (userToken) {
                await axios.get(`https://cs2300-backend-stage.us.aldryn.io/me?token=${userToken}`)
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

    const toggleTheme = (): void => {
        if (darkTheme) {
            localStorage.setItem("theme", "light");
        }
        else {
            localStorage.setItem("theme", "dark");
        }
        setDarkTheme(!darkTheme);
    }

    if (initializing) return null;

    return (
        <>
            <Navbar theme={darkTheme}/>
            <ProfileIcon theme={darkTheme}/>
            <NotificationBell theme={darkTheme} />
            <Theme theme={darkTheme}>
                <UserContext.Provider value={{darkTheme, user}}>
                    <ThemeUpdateContext.Provider value={{toggleTheme}}>
                        { children }
                    </ThemeUpdateContext.Provider>
                </UserContext.Provider>
            </Theme>
        </>
    );
}