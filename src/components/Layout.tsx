import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';
import NotificationBell from "./NotificationBell";
import ProfileIcon from "./ProfileIcon"

interface Props {
    children: JSX.Element,
    theme: boolean
}



export const ThemeContext = React.createContext({
    darkTheme: true,
});

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (): void => {},
});



export default function Layout({ children, theme }: Props) {
    const [darkTheme, setDarkTheme] = useState<boolean>(theme);

    const toggleTheme = (): void => {
        if (darkTheme) {
            localStorage.setItem("theme", "light");
        }
        else {
            localStorage.setItem("theme", "dark");
        }
        setDarkTheme(!darkTheme);
    }


    return (
        <>
            <Navbar theme={darkTheme}/>
            <ProfileIcon theme={darkTheme}/>
            <NotificationBell theme={darkTheme} />
            <Theme theme={darkTheme}>
                <ThemeContext.Provider value={{darkTheme}}>
                    <ThemeUpdateContext.Provider value={{toggleTheme}}>
                        { children }
                    </ThemeUpdateContext.Provider>
                </ThemeContext.Provider>
            </Theme>
        </>
    );
}