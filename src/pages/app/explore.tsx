import Head from 'next/head';
import { useEffect, useState, useContext, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '@/styles/app/Messages.module.css';
import { UserContext } from '@/components/Layout';
import { SocketContext } from '../_app';
import api from '@/services/axiosConfig';
import Header from '@/components/Header';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IMessage, IFilter, IChannel } from '../../interfaces';
import Loading from '@/components/Loading';
import ChannelBox from '@/components/ChannelBox';
import MessageBubble from '@/components/MessageBubble';

export default function Explore() {
    const [searchField, setSearchField] = useState<string>('');
    const [channels, setChannels] = useState<IChannel[]>([]);
    const [init, setInit] = useState<boolean>(true);
    const [selectedChannel, setSelectedChannel] = useState<IChannel>();
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [messageInit, setMessageInit] = useState<boolean>(true);

    const { user, friendStatus, setDmsUnread, dmsUnread } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const mobile = useMediaQuery('(max-width: 800px)');
    const anchorRef = useRef<null | HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
      getChannels();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const getChannels = () => {
        api.get(`/channels?token=${user.token}`)
            .then((resp) => {
                setChannels(resp.data);
                console.log(resp.data);
                if (resp.data.length > 0) {
                  if (!mobile) {
                        selectChannel(resp.data[0]);
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
                channelId: selectedChannel?.id,
                content: message,
                token: user.token
            })
                .then(async (resp) => {
                    setMessage('');
                    setMessageList([...messageList, resp.data]);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        }
    };

    const getMessages = (channelId: number) => {
        api.get('/messages', {
            params: {
                token: user.token,
                channelId
            }
        })
            .then((resp) => {
                setMessageList(resp.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const selectChannel = async (channel: IChannel) => {
        if (channel) {
            setSelectedChannel(channel);
            getMessages(channel.id);
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

    if (init) return null;

    return (
        <>
            <Head>
                <title>Chatterbox | Explore</title>
            </Head>
            <UserContext.Consumer>
                {({ darkTheme, user }) => (
                    <main className={styles.main}>
                        {!selectedChannel && (
                            <Header center handler={() => setSelectedChannel(undefined)}>
                                EXPLORE
                            </Header>
                        )}
                        {selectedChannel && (
                            <Header center back handler={() => setSelectedChannel(undefined)}>
                                <>
                                    <p style={{ color: darkTheme ? 'white' : 'black' }}># {selectedChannel.name}</p>
                                </>
                            </Header>
                        )}
                        {((mobile && !selectedChannel) || !mobile) && (
                            <div className={styles.leftSection} style={{ width: mobile ? '100%' : '300px' }}>
                                {!mobile && (
                                    <p className={styles.leftSectionTitle} style={{ borderColor: darkTheme ? '#2e2e2e' : '#c4c4c4' }}>
                                        PUBLIC CHANNELS
                                    </p>
                                )}
                                <div className={styles.addFriend} style={{ width: '100%' }}>
                                    {channels.length > 0 && (
                                        <>
                                            {channels.map((channel) => (
                                                <>
                                                    <ChannelBox
                                                        channel={channel}
                                                        notSelected={selectedChannel?.id !== channel.id}
                                                        key={channel.id.toString()}
                                                        onClick={() => selectChannel(channel)}
                                                    />
                                                </>
                                            ))}
                                        </>
                                    )}
                                    {channels.length === 0 && <p style={{ textAlign: 'center' }}>You have no friends :(</p>}
                                </div>
                            </div>
                        )}
                        {(!mobile || (mobile && selectedChannel)) && (
                            <div className={styles.rightSection} style={{ backgroundColor: darkTheme ? '#1c1c1c' : '#f1f1f1' }}>
                                {selectedChannel && (
                                    <>
                                        {!mobile && (
                                            <div className={styles.rightSectionTitle} style={{ borderColor: darkTheme ? '#2e2e2e' : '#c4c4c4' }}>
                                                # {selectedChannel.name}
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
                                            <div ref={anchorRef} />
                                            {messageInit && <Loading />}
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
