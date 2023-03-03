import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';

interface Props {
    children: JSX.Element,
    theme: boolean
}

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (): void => {},
});

export default function Layout({ children, theme }: Props) {
    const [darkTheme, setDarkTheme] = useState(theme);

    // useEffect(() => {
    //     let storedTheme = localStorage.getItem("theme");
    //     if (storedTheme == "dark") {
    //         setDarkTheme(true);
    //     }
    // }, [])

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
            <Theme theme={darkTheme}>
                <ThemeUpdateContext.Provider value={{toggleTheme}}>
                    { children }
                </ThemeUpdateContext.Provider>
            </Theme>
        </>
    );
}