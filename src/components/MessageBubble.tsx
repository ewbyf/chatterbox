import styles from '@/styles/components/MessageBubble.module.css';
import Moment from 'react-moment';
import { IMessage } from '@/interfaces';
import { useContext, useState } from 'react';
import { UserContext } from '@/components/Layout';
import { Avatar } from '@mui/material';

interface IProps {
    self: boolean;
    msg: IMessage;
    messageInit: boolean;
    showAvatar?: boolean;
}

const MessageBubble = ({ self, msg, messageInit, showAvatar }: IProps) => {
    const { darkTheme } = useContext(UserContext);
    const [showTime, setShowTime] = useState<boolean>(false);

    return (
        <>
		    {!self && showAvatar && (
                <div className={styles.container2}>
					<Avatar sx={{ width: 40, height: 40, marginTop: "5px" }} src={msg.author?.avatar} />
					<div style={{display: "flex", flexDirection: "column", width: "inherit", alignItems: "flex-start"}}>
						<div style={{display: "flex", alignItems: "flex-end", gap: "5px"}}>
							<p className={styles.username}>{msg.author.username}</p>
							<Moment
							fromNow
							className={styles.time}
							style={{
								padding: showTime ? '0px 0px 3px 3px' : 0,
								opacity: showTime ? 1 : 0
							}}
						>
							{msg.createdAt}
						</Moment>
						</div>
						
						<div
							className={styles.messageBubble}
							style={{ backgroundColor: darkTheme ? '#292929' : '#c0c0c0', opacity: messageInit ? 0 : 1, marginTop: 0 }}
							onMouseEnter={() => setShowTime(true)}
							onMouseLeave={() => setShowTime(false)}
						>
							<p>{msg.content}</p>
						</div>
					</div>
                </div>
            )}
            {!self && !showAvatar && (
                <div className={styles.container}>
                    <div
                        className={styles.messageBubble}
                        style={{ backgroundColor: darkTheme ? '#292929' : '#c0c0c0', opacity: messageInit ? 0 : 1 }}
                        onMouseEnter={() => setShowTime(true)}
                        onMouseLeave={() => setShowTime(false)}
                    >
                        <p>{msg.content}</p>
                    </div>
                    <Moment
                        fromNow
                        className={styles.time}
                        style={{
                            padding: showTime ? '0px 0px 3px 3px' : 0,
                            opacity: showTime ? 1 : 0
                        }}
                    >
                        {msg.createdAt}
                    </Moment>
                </div>
            )}
            {self && (
                <div className={styles.container} style={{ marginLeft: 'auto' }}>
                    <Moment
                        fromNow
                        className={styles.time}
                        style={{
                            marginLeft: 'auto',
                            padding: showTime ? '3px' : 0,
                            opacity: showTime ? 1 : 0
                        }}
                    >
                        {msg.createdAt}
                    </Moment>
                    <div
                        className={styles.userMessageBubble}
                        style={{ opacity: messageInit ? 0 : 1 }}
                        onMouseEnter={() => setShowTime(true)}
                        onMouseLeave={() => setShowTime(false)}
                    >
                        <p>{msg.content}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageBubble;
