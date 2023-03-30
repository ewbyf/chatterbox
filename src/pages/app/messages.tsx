import Head from 'next/head'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { UserContext } from '@/components/Layout';
import Header from '@/components/Header';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import api from '@/services/axiosConfig';

export default function Messages() {
  const [searchField, setSearchField] = useState<string>('');

  const addFriend = (token: string, id: Number) => {
    api.post("/request-friend", {token, id})
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  }

  return (
  <>
    <Head>
      <title>Chatterbox | Messages</title>
    </Head>
    <UserContext.Consumer>
      {({ darkTheme, user }) => (
        <main className={styles.main}>
        <Header center>FRIENDS</Header>
        <div className={styles.leftSection}>
          <p className={styles.sectionTitle}>ADD FRIENDS</p>
          <div className={styles.addFriend}>
            <TextInput label="ADD FRIEND" value={searchField} placeholder="Enter friend ID" onChange={(val) => setSearchField(val)}/>
            <Button text="SEARCH" dark="#ff5c5c" light="#ff5c5c" onClick={() => addFriend(user.token, Number(searchField))}/>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={`${styles.messageBubble} ${darkTheme ? styles.darkBackground : styles.lightBackground}`}>
            <p>dsadsadjasdasdsadajlsdkjl</p>
          </div>
          <div className={styles.userMessageBubble}>
            <p>dsadsadjasdasdsadajlsdkjl</p>
          </div>
        </div>
      </main>
      )}
    </UserContext.Consumer>
  </>
  )
}