import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import React, { useEffect, useState, useMemo } from 'react';

export const SocketContext = React.createContext<{ socket: WebSocket | null; openSocket: () => void; closeSocket: () => void }>({
    socket: null,
    openSocket: () => {},
    closeSocket: () => {}
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [theme, setTheme] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    let opened = false;

    const openSocket = () => {
        if (!opened) {
            setSocket(new WebSocket(`wss://${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`));
            opened = true;
        }
    };

    const closeSocket = () => {
        opened = false;
        socket?.close();
        setSocket(null);
    };

    useEffect(() => {
        setTheme(localStorage.getItem('theme') == 'light' ? false : true);
        setInitializing(false);
    }, []);

    useEffect(() => {
        const sendMsg = () => {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                socket?.send(JSON.stringify({ type: 'CONNECT', token: userToken }));
            }
        };

        socket?.addEventListener('open', sendMsg);

        return () => {
            socket?.removeEventListener('open', sendMsg);
        };
    }, [socket]);

    if (initializing) return null;

    if (router.pathname.startsWith(`/app`)) {
        return (
            <AnimatePresence mode="wait">
                <SocketContext.Provider value={{ socket, openSocket, closeSocket }}>
                    <Layout theme={theme}>
                        <Component {...pageProps} key={router.pathname} />
                    </Layout>
                </SocketContext.Provider>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <SocketContext.Provider value={{ socket, openSocket, closeSocket }}>
                <Component {...pageProps} key={router.pathname} />
            </SocketContext.Provider>
        </AnimatePresence>
    );
}
