import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { ThemeUpdateContext } from '@/components/Layout';

export default function Settings() {
    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
          setUserToken(token);
        }
        else {
            Router.push({
                pathname: "/login",
            });
        }
    }, []);

    return (
    <>
      <Head>
        <title>Chatterbox | Settings</title>
      </Head>
      <ThemeUpdateContext.Consumer>
        {({ toggleTheme }) => (
            <button onClick={toggleTheme}>sdaadas</button>
        )}
      </ThemeUpdateContext.Consumer>
    </>
  )
}