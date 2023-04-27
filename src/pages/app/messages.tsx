import Head from 'next/head';
import { useEffect, useState, useContext, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '@/styles/app/Messages.module.css';
import { UserContext } from '@/components/Layout';
import { SocketContext } from '../_app';
import api from '@/services/axiosConfig';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FriendBox from '@/components/FriendBox';
import Status from '@/components/Status';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IFriend, IMessage, IFilter } from '../../interfaces';
import { statusChangeMessages } from '@/utils/StatusChange';
import Loading from '@/components/Loading';
import MessageBubble from '@/components/MessageBubble';

export default function Messages() {
    const [searchField, setSearchField] = useState<string>('');
    const [friends, setFriends] = useState<IFriend[]>([]);
    const [init, setInit] = useState<boolean>(true);
    const [selectedFriend, setSelectedFriend] = useState<IFriend>();
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [messageInit, setMessageInit] = useState<boolean>(true);

    const { user, friendStatus, setDmsUnread, dmsUnread } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const mobile = useMediaQuery('(max-width: 800px)');
    const anchorRef = useRef<null | HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const newMessage = async (e: MessageEvent) => {
            const obj = JSON.parse(e.data);

            if (obj.type == 'MESSAGE' && obj.message.channelId === selectedFriend?.channelId) {
                setMessageList((messageList) => [...messageList, obj.message]);
                setDmsUnread((dmsUnread) => dmsUnread - 1);
            } else if (obj.type == 'MESSAGE') {
                let index = friends.findIndex((friend) => friend.channelId == obj.message.channelId);
                friends[index].unread++;
                if (index != 0) {
                    let temp = friends[index];
                    friends.splice(index, 1);
                    friends.unshift(temp);
                }
                setFriends([...friends]);
            }
        };
        socket?.addEventListener('message', newMessage);

        return () => {
            socket?.removeEventListener('message', newMessage);
        };
    }, [socket, selectedFriend]);

    useEffect(() => {
        if (friendStatus) statusChangeMessages(friends, user, setFriends, friendStatus, selectedFriend, setSelectedFriend, router.query.selected, mobile);
    }, [socket, friendStatus]);

    useEffect(() => {
        getFriends('RECENTLY_MESSAGED');
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const getFriends = (filter: IFilter) => {
        api.get(`/friends?token=${user.token}&filter=${filter}`)
            .then((resp) => {
                setFriends(resp.data);
                if (resp.data.length > 0) {
                    if (router.query.selected) {
                        selectFriend(resp.data.find((friend: IFriend) => friend.channelId.toString() === router.query.selected), resp.data);
                    } else if (!mobile) {
                        selectFriend(resp.data[0], resp.data);
                    }
                }
                setInit(false);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const sendMessage = () => {
        if (message) {
            api.post('/create-message', {
                channelId: selectedFriend?.channelId,
                content: message,
                token: user.token
            })
                .then(async (resp) => {
                    setMessage('');
                    setMessageList([...messageList, resp.data]);
                    let index = friends.findIndex(friend => friend.channelId === selectedFriend?.channelId);
                    if (index > -1) {
                        let temp = friends[index];
                        friends.splice(index, 1);
                        friends.unshift(temp);
                        setFriends([...friends]);
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        }
    };

    const getMessages = (channelId: Number) => {
        api.get('/messages', {
            params: {
                token: user.token,
                channelId
            }
        })
            .then((resp) => {
                setMessageList(resp.data);
                console.log(resp.data)
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const selectFriend = async (friend: IFriend, friends: IFriend[]) => {
        if (friend) {
            setSelectedFriend(friend);
            const index = friends.findIndex((friendObj) => friendObj.id === friend.id);
            if (index > -1) {
                setDmsUnread(dmsUnread - friends[index].unread);
                let temp = friends;
                temp[index].unread = 0;
                setFriends([...temp]);
            }
            getMessages(friend.channelId);
        }
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToBottom = async () => {
        anchorRef.current?.scrollIntoView({ behavior: 'auto' });
        if (messageInit) {
            setTimeout(() => {
                setMessageInit(false);
            }, 500);
        }
    };

    if (init) {
        return (
            <Loading/>
        )
    };

    return (
        <>
            <Head>
                <title>Chatterbox | Messages</title>
            </Head>
            <UserContext.Consumer>
                {({ darkTheme, user }) => (
                    <main className={styles.main}>
                        {!selectedFriend && (
                            <Header center handler={() => setSelectedFriend(undefined)}>
                                MESSAGES
                            </Header>
                        )}
                        {selectedFriend && (
                            <Header center back handler={() => setSelectedFriend(undefined)}>
                                <>
                                    <Status bg={darkTheme ? '#1c1c1c' : '#f1f1f1'} status={selectedFriend.status}>
                                        <Avatar sx={{ width: 30, height: 30 }} src={selectedFriend.avatar} />
                                    </Status>
                                    <p style={{ color: darkTheme ? 'white' : 'black' }}>{selectedFriend.username}</p>
                                    <p
                                        className={styles.id}
                                        style={{
                                            backgroundColor: darkTheme ? 'rgb(36, 36, 36)' : 'rgb(212, 212, 212)',
                                            color: darkTheme ? '#868686' : '#5d5d5d'
                                        }}
                                    >
                                        #{selectedFriend.id.toString()}
                                    </p>
                                </>
                            </Header>
                        )}
                        {((mobile && !selectedFriend) || !mobile) && (
                            <div className={styles.leftSection} style={{ width: mobile ? '100%' : '300px' }}>
                                {!mobile && (
                                    <p className={styles.leftSectionTitle} style={{ borderColor: darkTheme ? '#2e2e2e' : '#c4c4c4' }}>
                                        DIRECT MESSAGES
                                    </p>
                                )}
                                <div className={styles.addFriend} style={{ width: '100%' }}>
                                    <div style={{display: "flex", alignItems: "center", gap: "10px", width: "100%"}}>
                                        <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)} />
                                    </div>
                                    {friends.length > 0 && (
                                        <>
                                            {friends.map((friend) => (
                                                <>
                                                    <FriendBox
                                                        unread={friend.unread}
                                                        notSelected={selectedFriend?.id !== friend.id}
                                                        friend={friend}
                                                        key={friend.id.toString()}
                                                        onClick={() => selectFriend(friend, friends)}
                                                    />
                                                </>
                                            ))}
                                        </>
                                    )}
                                    {friends.length === 0 && <p style={{ textAlign: 'center' }}>You have no friends :(</p>}
                                </div>
                            </div>
                        )}
                        {(!mobile || (mobile && selectedFriend)) && (
                            <div className={styles.rightSection} style={{ backgroundColor: darkTheme ? '#1c1c1c' : '#f1f1f1' }}>
                                {selectedFriend && (
                                    <>
                                        {!mobile && (
                                            <div className={styles.rightSectionTitle} style={{ borderColor: darkTheme ? '#2e2e2e' : '#c4c4c4' }}>
                                                <Status bg={darkTheme ? '#1c1c1c' : '#f1f1f1'} status={selectedFriend.status}>
                                                    <Avatar sx={{ width: 30, height: 30 }} src={selectedFriend.avatar} />
                                                </Status>
                                                {selectedFriend.username}
                                                <p
                                                    className={styles.id}
                                                    style={{
                                                        backgroundColor: darkTheme ? 'rgb(36, 36, 36)' : 'rgb(212, 212, 212)',
                                                        color: darkTheme ? '#868686' : '#5d5d5d'
                                                    }}
                                                >
                                                    #{selectedFriend.id.toString()}
                                                </p>
                                            </div>
                                        )}
                                        <div className={styles.messages}>
                                            {messageList.map((msg) => (
                                               <>
                                               {msg.authorId != user.id && (
                                                   <MessageBubble self={false} msg={msg} messageInit={messageInit}/>
                                               )}
                                               {msg.authorId === user.id && (
                                                   <MessageBubble self msg={msg} messageInit={messageInit}/>
                                               )}
                                            </>
                                            ))}
                                            {messageInit &&
                                                <Loading />
                                            }
                                            <div ref={anchorRef} />
                                        </div>
                                        <div className={styles.messageBox} style={{ backgroundColor: darkTheme ? '#1c1c1c' : '#f1f1f1' }}>
                                            <TextareaAutosize
                                                className={styles.enterMessage}
                                                minRows={1}
                                                maxRows={10}
                                                placeholder="Enter message..."
                                                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDownHandler(e)}
                                                onChange={(e) => setMessage(e.target.value)}
                                                maxLength={2000}
                                                value={message}
                                                style={{ backgroundColor: darkTheme ? '#2e2e2e' : '#c7c7c7', color: darkTheme ? 'white' : 'black' }}
                                            />
                                            <SendIcon
                                                fontSize="medium"
                                                sx={{ color: '#ff5c5c', '&:hover': { filter: 'brightness(85%)' }, cursor: 'pointer' }}
                                                onClick={sendMessage}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </main>
                )}
            </UserContext.Consumer>
        </>
    );
}
