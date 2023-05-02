import { IoNotifications } from 'react-icons/io5';
import NotificationBadge from './NotificationBadge';
import styles from '@/styles/components/NotificationBell.module.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '@/components/Layout';
import { Notification } from '@/interfaces';
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { IoCompassOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const NotificationBell = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { notificationsList, removeNotification } = useContext(UserContext);

    const openNotifications = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

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

    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <>
                    <div className={styles.bellContainer} onClick={openNotifications}>
                        <NotificationBadge count={notificationsList.unread} small>
                            <IoNotifications size={25} className={styles.bellIcon} />
                        </NotificationBadge>
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: darkTheme ? 'rgb(29, 29, 29)' : 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                },
                                bgcolor: darkTheme ? 'rgb(29, 29, 29)' : '',
                                color: darkTheme ? 'lightgrey' : '',
                                width: '400px',
                                borderRadius: '20px'
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <div className={styles.titleContainer}>
                            <p className={styles.titleText}>NOTIFICATIONS</p>
                            <IconButton
                                onClick={handleClose}
                                style={{ position: 'absolute', right: 15 }}
                                sx={{
                                    color: darkTheme ? 'lightgrey' : 'grey',
                                    '&:hover': {
                                        color: '#ff5c5c',
                                        backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray'
                                    }
                                }}
                            >
                                <CloseIcon sx={{ color: 'inherit' }} />
                            </IconButton>
                        </div>
                        {notificationsList.notifications.length === 0 && (
                            <div>
                                <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                <div className={styles.noNotifications}>
                                    <InboxIcon style={{ fontSize: '26px' }} />
                                    <p style={{ fontSize: '18px' }}>You have no notifications</p>
                                </div>
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
                    </Menu>
                </>
            )}
        </UserContext.Consumer>
    );
};

export default NotificationBell;
