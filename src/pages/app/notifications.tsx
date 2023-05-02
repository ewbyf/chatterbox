import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useContext } from 'react';
import Router from 'next/router';
import styles from '@/styles/components/NotificationBell.module.css';
import { UserContext } from '@/components/Layout';
import Header from '@/components/Header';
import { Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { IoCompassOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { Notification } from '@/interfaces';

const Notifications = () => {
    const { notificationsList, removeNotification } = useContext(UserContext);
    const mobile = useMediaQuery('(max-width: 800px)');

    useEffect(() => {
        if (!mobile) {
            Router.push({
                pathname: '/app/explore'
            });
        }
    }, []);

    const messageNotificiationHandler = (id: number, notificationObj: Notification, type: string) => {
        Router.push({ pathname: type === 'direct' ? '/app/messages' : '/app/explore', query: { selected: id.toString() } });
    };

    const friendNotificationHandler = (notificationObj: Notification) => {
        removeNotification(notificationObj);
        Router.push({ pathname: '/app/friends' });
    };

    const friendReqNotificationHandler = (notificationObj: Notification) => {
        removeNotification(notificationObj);
        Router.push({ pathname: '/app/friends', query: { requests: true } });
    };
    const clearNotification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, notificationObj: Notification) => {
        e.stopPropagation();
        removeNotification(notificationObj);
    };

    if (mobile) {
        return (
            <UserContext.Consumer>
                {({ darkTheme }) => (
                    <>
                        <Header center>NOTIFICATIONS</Header>
                        {notificationsList.notifications.length === 0 && (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '0px 30px'
                                }}
                            >
                                <InboxIcon style={{ fontSize: '60px' }} />
                                <p style={{ fontSize: '20px' }}>You have no notifications</p>
                            </div>
                        )}
                        {notificationsList.notifications.map((notification, i) => (
                            <div key={i}>
                                {(notification.friend || notification.to) && (
                                    <div>
                                        <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                        <MenuItem
                                            onClick={() => friendNotificationHandler(notification)}
                                            sx={{
                                                '&:hover': { backgroundColor: darkTheme ? '#181818' : '' }
                                            }}
                                            className={styles.menuItem}
                                        >
                                            <Avatar src={notification.friend ? notification.friend!.avatar : notification.to!.avatar} />
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        {notification.friend ? notification.friend!.username : notification.to!.username}
                                                    </p>
                                                </div>
                                                <p style={{ fontSize: '14px' }}>Your friend request has been accepted</p>
                                            </div>
                                            <IconButton
                                                onClick={(e) => clearNotification(e, notification)}
                                                style={{ position: 'absolute', right: 15 }}
                                                sx={{
                                                    color: 'gray',
                                                    '&:hover': {
                                                        color: '#ff5c5c',
                                                        backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray'
                                                    }
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: 'inherit' }} />
                                            </IconButton>
                                        </MenuItem>
                                    </div>
                                )}
                                {notification.from && (
                                    <div>
                                        <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                        <MenuItem
                                            onClick={() => friendReqNotificationHandler(notification)}
                                            sx={{
                                                '&:hover': { backgroundColor: darkTheme ? '#181818' : '' }
                                            }}
                                            className={styles.menuItem}
                                        >
                                            <Avatar src={notification.from!.avatar} />
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p style={{ fontWeight: 'bold' }}>{notification.from!.username}</p>
                                                </div>
                                                <p style={{ fontSize: '14px' }}>You have received a friend request</p>
                                            </div>
                                            <IconButton
                                                onClick={(e) => clearNotification(e, notification)}
                                                style={{ position: 'absolute', right: 15 }}
                                                sx={{
                                                    color: 'gray',
                                                    '&:hover': {
                                                        color: '#ff5c5c',
                                                        backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray'
                                                    }
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: 'inherit' }} />
                                            </IconButton>
                                        </MenuItem>
                                    </div>
                                )}
                                {notification.channel && (
                                    <div>
                                        <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                        <MenuItem
                                            onClick={() => messageNotificiationHandler(notification.channel!.id, notification, notification.channel!.type)}
                                            sx={{
                                                '&:hover': { backgroundColor: darkTheme ? '#181818' : '' }
                                            }}
                                            className={styles.menuItem}
                                        >
                                            {notification.channel.type === 'direct' && <IoChatbubbleEllipsesOutline color="gray" size={32} />}
                                            {notification.channel.type === 'public' && <IoCompassOutline color="gray" size={32} />}
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        {notification.channel.type === 'direct'
                                                            ? notification.channel!.name.substring(0, notification.channel!.name.indexOf('-'))
                                                            : notification.channel!.name}
                                                    </p>
                                                </div>
                                                <p style={{ fontSize: '14px' }}>You have {notification.count} unread messages</p>
                                            </div>
                                            <IconButton
                                                onClick={(e) => clearNotification(e, notification)}
                                                style={{ position: 'absolute', right: 15 }}
                                                sx={{
                                                    color: 'gray',
                                                    '&:hover': {
                                                        color: '#ff5c5c',
                                                        backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray'
                                                    }
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: 'inherit' }} />
                                            </IconButton>
                                        </MenuItem>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </UserContext.Consumer>
        );
    }
};

export default Notifications;
