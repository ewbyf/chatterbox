import styles from '@/styles/components/FriendBox.module.css';
import { UserContext } from '@/components/Layout';
import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import CancelIcon from '@mui/icons-material/ClearRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import Status from './Status';
import NotificationBadge from './NotificationBadge';
import BlockIcon from '@mui/icons-material/Block';

interface IFriend {
    avatar: string;
    id: number;
    username: string;
    channelId?: number;
    status?: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
}

interface Props {
    friend: IFriend;
    request?: boolean;
    notSelected?: boolean;
    unread?: number;
    blockable?: boolean;
    accept?: (id: number) => any;
    reject?: (id: number) => any;
    block?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => any;
    onClick?: () => any;
}

const FriendBox = ({ friend, request, notSelected, unread, blockable, accept, reject, block, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div
                    className={`${styles.box} ${!request ? (darkTheme ? styles.hoverEffectDark : styles.hoverEffectLight) : null} ${
                        notSelected ? null : styles.selected
                    }`}
                    onClick={onClick}
                >
                    {friend.status && (
                        <Status bg={darkTheme ? '#181818' : 'white'} status={friend.status}>
                            <Avatar sx={{ width: 35, height: 35 }} src={friend.avatar} />
                        </Status>
                    )}
                    {!friend.status && <Avatar sx={{ width: 35, height: 35 }} src={friend.avatar} />}

                    <p>{friend.username}</p>
                    <p
                        className={styles.id}
                        style={{ backgroundColor: darkTheme ? 'rgb(36, 36, 36)' : 'rgb(212, 212, 212)', color: darkTheme ? '#868686' : '#5d5d5d' }}
                    >
                        #{friend.id.toString()}
                    </p>
                    {unread != undefined && (
                        <div style={{ position: 'absolute', right: '24px' }}>
                            <NotificationBadge count={unread}>
                                <p></p>
                            </NotificationBadge>
                        </div>
                    )}
                    {blockable && (
                        <div className={styles.icons}>
                            <Tooltip title="Block" arrow>
                                <div
                                    onClick={block ? (e) => block(e, friend.id) : undefined}
                                    className={`${styles.iconCircle} ${darkTheme ? styles.xDark : styles.xLight}`}
                                >
                                    <BlockIcon fontSize="medium" />
                                </div>
                            </Tooltip>
                        </div>
                    )}
                    {request && (
                        <div className={styles.icons}>
                            <Tooltip title="Reject" arrow>
                                <div
                                    onClick={reject ? () => reject(friend.id) : undefined}
                                    className={`${styles.iconCircle} ${darkTheme ? styles.xDark : styles.xLight}`}
                                >
                                    <CancelIcon fontSize="medium" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Accept" arrow>
                                <div
                                    onClick={accept ? () => accept(friend.id) : undefined}
                                    className={`${styles.iconCircle} ${darkTheme ? styles.checkDark : styles.checkLight}`}
                                >
                                    <CheckIcon fontSize="medium" />
                                </div>
                            </Tooltip>
                        </div>
                    )}
                </div>
            )}
        </UserContext.Consumer>
    );
};

export default FriendBox;
