import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { UserContext } from '@/components/Layout';

export default function Messages() {
    return (
    <>
      <Head>
        <title>Chatterbox | Messages</title>
      </Head>
      <UserContext.Consumer>
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
      </UserContext.Consumer>
    </>
  )
}