import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Discover() {
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
        <title>Chatterbox | Discover</title>
      </Head>
      <main className={styles.main}>
        
      </main>
    </>
  )
}
