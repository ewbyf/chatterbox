import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router"
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState(false);
  const [initializing, setInitializing] = useState(true)
  
  useEffect(() => {
    setTheme(localStorage.getItem("theme") == "light" ? false : true);
    setInitializing(false);
  }, [])

  if (initializing) {
    return null;
  }

  if(router.pathname.startsWith(`/app`)) {
    return (
      <AnimatePresence mode="wait">
        <Layout theme={theme}>
          <Component {...pageProps} key={router.pathname} />
        </Layout>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
  
}
