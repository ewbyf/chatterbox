import Head from 'next/head'
import { useEffect, useState, useContext, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import styles from "@/styles/app/Messages.module.css";
import { UserContext } from '@/components/Layout';
import api from '@/services/axiosConfig';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FriendBox from '@/components/FriendBox';
import { Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IFriend {
  avatar: string;
  id: number;
  username: string;
  channelId: number;
}

interface IMessage {
  authorId: number,
  channelId: number,
  content: string,
  createdAt: string,
  id: number,
}

export default function Messages() {
  const [searchField, setSearchField] = useState<string>("");
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [init, setInit] = useState<boolean>(true);
  const [selectedFriend, setSelectedFriend] = useState<IFriend>();
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [messageInit, setMessageInit] = useState<boolean>(true);

  const {user} = useContext(UserContext);
  const mobile = useMediaQuery('(max-width: 800px)');
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const router = useRouter();


  useEffect(() => {
    getFriends();
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messageList])

  const getFriends = () => {
    api.get(`/friends?token=${user.token}`)
    .then((resp) => {
      setFriends(resp.data);
      if (resp.data.length > 0) {
        if (router.query.selected) {
          selectFriend(resp.data.find((friend: IFriend) => friend.id.toString() === router.query.selected));
        }
        else {
          selectFriend(resp.data[0]);
        }
      }
      setInit(false);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const sendMessage = () => {
    if (message) {
      api.post("/create-message", {
        channelId: selectedFriend?.channelId,
        content: message,
        token: user.token,
      })
      .then(async(resp) => {
        setMessage('');
        setMessageList([...messageList, resp.data]);
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  }

  const getMessages = (channelId: Number) => {
    api.get("/messages", { params: {
      token: user.token,
      channelId,
    }})
    .then((resp) => {
      setMessageList(resp.data);
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
  }

  const selectFriend = async(friend: IFriend) => {
    setSelectedFriend(friend);
    getMessages(friend.channelId);
  }

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = async() => {
    anchorRef.current?.scrollIntoView({ behavior: "auto" });
    if (messageInit) {
      setTimeout(() => {
        setMessageInit(false);
      }, 500);
    }
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
        {!selectedFriend && <Header center handler={() => setSelectedFriend(undefined)}>MESSAGES</Header>}
        {selectedFriend && 
        <Header center back handler={() => setSelectedFriend(undefined)}>
          <>
            <Avatar sx={{ width: 30, height: 30 }} src={selectedFriend.avatar} />
            <p style={{color: darkTheme ? "white" : "black"}}>{selectedFriend.username}</p>
            <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>
              #{selectedFriend.id.toString()}
            </p>
          </>
        </Header>}
        {(mobile && !selectedFriend || !mobile) && <div className={styles.leftSection} style={{width: mobile ? "100%" : "300px"}}>
          {!mobile && <p className={styles.leftSectionTitle} style={{borderColor: darkTheme ? "#2e2e2e" : "#c4c4c4"}}>
            DIRECT MESSAGES
          </p>}
          <div className={styles.addFriend} style={{width: "100%"}}>
            <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
            {
              friends.length > 0 && <>
                {friends.map((friend) => (
                  <>
                  <FriendBox notSelected={selectedFriend?.id !== friend.id} friend={friend} key={friend.id.toString()} onClick={() => selectFriend(friend)}/>
                  </>
                ))}
              </>
            }
            {
              friends.length === 0 && <p style={{textAlign: "center"}}>You have no friends :(</p>
            }
          </div>
        </div>}
        {(!mobile || mobile && selectedFriend) && <div className={styles.rightSection} style={{backgroundColor: darkTheme ? "#1c1c1c" : "#f1f1f1"}}>
          {selectedFriend && 
            <>
              {!mobile && <div className={styles.rightSectionTitle} style={{borderColor: darkTheme ? "#2e2e2e" : "#c4c4c4"}}>
                <Avatar sx={{ width: 30, height: 30 }} src={selectedFriend.avatar} />
                {selectedFriend.username}
                <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>
                  #{selectedFriend.id.toString()}
                </p>
              </div>}
              <div className={styles.messages}>
                { messageList.map((msg) => (
                  <>
                    {msg.authorId != user.id && <div className={styles.messageBubble} style={{backgroundColor: darkTheme ? "#292929" : "#c0c0c0", opacity: messageInit ? 0 : 1}}>
                      <p>{msg.content}</p>
                    </div>}
                    {msg.authorId === user.id && <div className={styles.userMessageBubble} style={{opacity: messageInit ? 0 : 1}}>
                      <p>{msg.content}</p>
                    </div>}
                  </>
                ))
                }
                <div ref={anchorRef}/>
              </div>
              <div className={styles.messageBox} style={{backgroundColor: darkTheme ? "#1c1c1c" : "#f1f1f1"}}>
                <TextareaAutosize className={styles.enterMessage} minRows={1} maxRows={10} placeholder="Enter message..." onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDownHandler(e)} onChange={(e) => setMessage(e.target.value)} maxLength={2000} value={message} style={{backgroundColor: darkTheme ? "#2e2e2e" : "#c7c7c7", color: darkTheme ? "white" : "black"}}/>
                <SendIcon fontSize="medium" sx={{ color: "#ff5c5c", '&:hover': {filter: "brightness(85%)"}, cursor: "pointer" }} onClick={sendMessage}/>
              </div>
            </>
          }
        </div>}
      </main>
      )}
    </UserContext.Consumer>
  </>
  )
}