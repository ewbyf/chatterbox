import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function MainApp() {
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
          setUserToken(JSON.parse(token));
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
        <title>Chatterbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar/>
        {/* <div className={styles.container}>
          <Image src="/logo.png" alt="logo" height={250} width={250}/>
          <p className={styles.title}>STAY CONNECTED. ANYWHERE. ANYTIME.</p>
          <div className={styles.descContainer}>
            <p className={styles.desc}>Whether you are on your phone, laptop, or other device, Chatterbox allows you to chat with friends or meet new people at any time.</p>
          </div>
          <a className={styles.button} onClick={switchPage}>Start Your Chatter</a>
        </div> */}
      </main>
    </>
  )
}
