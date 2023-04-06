import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { UserContext } from '@/components/Layout';
import api from '@/services/axiosConfig';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FriendBox from '@/components/FriendBox';
import { Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';

interface IFriend {
  avatar: string;
  id: Number;
  username: string;
  channelId: Number;
}

export default function Messages() {
  const [searchField, setSearchField] = useState<string>("");
  const [friends, setFriends] = useState<Array<IFriend>>([]);
  const [init, setInit] = useState<boolean>(true);
  const [selectedFriendId, setSelectedFriendId] = useState<Number>(0);
  const [selectedFriend, setSelectedFriend] = useState<IFriend>();

  const {user} = useContext(UserContext);


  useEffect(() => {
    getFriends();
  }, [])

  const getFriends = () => {
    api.get(`/friends?token=${user.token}`)
    .then((resp) => {
      setFriends(resp.data);
      console.log(resp.data)
      setInit(false);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const selectFriend = (friend: IFriend) => {
    setSelectedFriendId(friend.id);
    setSelectedFriend(friend);
  }

  const sendMessage = () => {
    console.log('a')
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

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
          <p className={styles.leftSectionTitle}>
            DIRECT MESSAGES
          </p>
          <div className={styles.addFriend}>
            <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
            {
              friends.length > 0 && <>
                {friends.map((friend) => (
                  <>
                  <FriendBox notSelected={selectedFriendId !== friend.id} friend={friend} key={friend.id.toString()} onClick={() => selectFriend(friend)}/>
                  <FriendBox friend={friend} notSelected/>
                  </>
                ))}
              </>
            }
            {
              friends.length === 0 && <p style={{textAlign: "center"}}>You have no friends :(</p>
            }
          </div>
        </div>
        <div className={styles.rightSection}>
          {selectedFriend && 
            <>
              <div className={styles.rightSectionTitle}>
                <Avatar sx={{ width: 30, height: 30 }} src={selectedFriend.avatar} />
                {selectedFriend.username}
                <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>
                  #{selectedFriend.id.toString()}
                </p>
              </div>
              <div className={styles.messageBox}>
                <TextareaAutosize className={styles.enterMessage} minRows={1} maxRows={6} placeholder="Enter message..." onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDownHandler(e)}/>
                <SendIcon fontSize="medium" sx={{ color: "#ff5c5c", '&:hover': {filter: "brightness(85%)"} }} onClick={sendMessage}/>
              </div>
            </>
          }
          {/* <div className={`${styles.messageBubble} ${darkTheme ? styles.darkBackground : styles.lightBackground}`}>
            <p>dsadsadjasdasdsadajlsdkjl</p>
          </div>
          <div className={styles.userMessageBubble}>
            <p>dsadsadjasdasdsadajlsdkjl</p>
          </div> */}
        </div>
      </main>
      )}
    </UserContext.Consumer>
  </>
  )
}