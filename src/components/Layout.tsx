import Navbar from "./Navbar";
import Theme from "./Theme";
import React, { useEffect, useState, useContext } from 'react';

interface Props {
    children: JSX.Element
}

export const ThemeUpdateContext = React.createContext({
    toggleTheme: (): void => {},
});

export default function Layout({ children }: Props) {
    const [darkTheme, setDarkTheme] = useState(true);

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme");
        if (storedTheme == "dark") {
            setDarkTheme(true);
        }
    }, [])

    const toggleTheme = (): void => {
        if (darkTheme) {
            localStorage.setItem("theme", "dark");
        }
        else {
            localStorage.setItem("theme", "light");
        }
        setDarkTheme(!darkTheme);
    }

    return (
        <>
            <Navbar/>
            <Theme theme={darkTheme}>
                <ThemeUpdateContext.Provider value={{toggleTheme}}>
                    { children }
                </ThemeUpdateContext.Provider>
            </Theme>
        </>
    );
}