import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { ThemeContext } from '@/components/Layout';

export default function Messages() {
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
        <title>Chatterbox | Messages</title>
      </Head>
      <ThemeContext.Consumer>
        {({ darkTheme }) => (
          <>
            <div className={`${styles.messageBubble} ${darkTheme ? styles.darkBackground : styles.lightBackground}`}>
              <p>dsadsadjasdasdsadajlsdkjl</p>
            </div>
            <div className={styles.userMessageBubble}>
              <p>dsadsadjasdasdsadajlsdkjl</p>
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    </>
  )
}