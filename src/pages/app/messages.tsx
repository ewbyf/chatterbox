import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { UserContext } from '@/components/Layout';
import api from '@/services/axiosConfig';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FriendBox from '@/components/FriendBox';

interface IFriend {
  avatar: string;
  id: Number;
  username: string;
  channelId: Number;
}

export default function Messages() {
  const [searchField, setSearchField] = useState<string>("");
  const [friends, setFriends] = useState<Array<IFriend>>();
  const {user} = useContext(UserContext);
  const [init, setInit] = useState(true);

  useEffect(() => {
    getFriends();
  }, [])

  const getFriends = async() => {
    api.get(`/friends?token=${user.token}`)
    .then((resp) => {
      setFriends(resp.data);
      setInit(false);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  if (init) return null;

  return (
  <>
    <Head>
      <title>Chatterbox | Messages</title>
    </Head>
    <UserContext.Consumer>
      {({ darkTheme, user }) => (
        <main className={styles.main}>
        <Header center>MESSAGES</Header>
        <div className={styles.leftSection}>
          <p className={styles.sectionTitle}>DIRECT MESSAGES</p>
          <div className={styles.addFriend}>
            <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
            {
              friends && <>
                {friends.map((friend) => (
                  <>
                  <FriendBox friend={friend}/>
                  <FriendBox friend={friend} notSelected/>
                  </>
                ))}
              </>
            }
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