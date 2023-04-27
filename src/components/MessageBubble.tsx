import styles from '@/styles/components/MessageBubble.module.css';
import Moment from 'react-moment';
import { IMessage } from '@/interfaces';
import { useContext, useState } from 'react';
import { UserContext } from '@/components/Layout';

interface IProps {
	self: boolean;
	msg: IMessage;
	messageInit: boolean;
}

const MessageBubble = ({ self, msg, messageInit }: IProps) => {
	const { darkTheme } = useContext(UserContext);
    const [showTime, setShowTime] = useState<boolean>(false);

	return (
		<>
			{!self && (
				<>
					<Moment
						fromNow
                        className={styles.time}
						style={{
							padding: '0px 0px 3px 3px',
                            display: showTime ? "flex" : "none"
						}}
					>
						{msg.createdAt}
					</Moment>
					<div
                        className={styles.messageBubble}
                        style={{ backgroundColor: darkTheme ? '#292929' : '#c0c0c0', opacity: messageInit ? 0 : 1 }}
                        onMouseEnter={() => setShowTime(true)}
                        onMouseLeave={() => setShowTime(false)}
                    >
						<p>{msg.content}</p>
					</div>
				</>
			)}
			{self && (
				<>
					<Moment
						fromNow
                        className={styles.time}
						style={{
							marginLeft: 'auto',
							padding: '3px',
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
				</>
			)}
		</>
	);
};

export default MessageBubble;
