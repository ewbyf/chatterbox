import { IoNotifications } from 'react-icons/io5';
import NotificationBadge from './NotificationBadge';
import styles from '@/styles/components/NotificationBell.module.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '@/components/Layout';
import { INotifications } from '@/interfaces';
import InboxIcon from '@mui/icons-material/Inbox';
import api from '@/services/axiosConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const NotificationBell = ({ notificationsList }: { notificationsList: INotifications }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsObj, setNotificationsObj] = useState<INotifications>({unread: 0, notifications: []});
    const open = Boolean(anchorEl);
    const { clearNotifications, removeNotification } = useContext(UserContext);

    useEffect(() => {
      setNotificationsObj(notificationsList);
    }, [notificationsList]);

    const openNotifications = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
        clearNotifications();
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const messageNotificiationHandler = (id: number, key: number) => {
      setNotificationsObj({unread: notificationsObj.unread - 1, notifications: notificationsObj.notifications.filter((notification) => notification.message.id != key)});
      Router.push({ pathname: '/app/messages', query: { selected: id.toString() } });
    };

    const clearNotification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, key : number) => {
      e.stopPropagation();
      removeNotification(key);
    }

    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <>
                    <div className={styles.bellContainer} onClick={openNotifications}>
                        <NotificationBadge count={notificationsObj.unread} small>
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
                                        backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray',
                                    }
                                }}
                            >
                              <CloseIcon sx={{ color: 'inherit' }} />
                            </IconButton>
                        </div>
                        {notificationsObj.notifications.length === 0 && (
                            <div>
                                <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                <div className={styles.noNotifications}>
                                    <InboxIcon style={{ fontSize: '26px' }} />
                                    <p style={{ fontSize: '18px' }}>You have no notifications</p>
                                </div>
                            </div>
                        )}
                        {notificationsObj.notifications
                            .slice()
                            .reverse()
                            .map((notification) => (
                                <div>
                                    {notification.message && (
                                        <div key={notification.message.id}>
                                            <Divider sx={{ bgcolor: darkTheme ? '#2E2E2E' : '', margin: 0 }} />
                                            <MenuItem
                                                onClick={() => messageNotificiationHandler(notification.message.authorId, notification.message.id)}
                                                sx={{
                                                    '&:hover': { backgroundColor: darkTheme ? '#181818' : '' }
                                                }}
                                                className={styles.menuItem}
                                            >
                                                <Avatar src={notification.message.author.avatar} />
                                                <div>
                                                  <div style={{display: "flex"}}>
                                                    <p style={{ fontWeight: 'bold' }}>{notification.message.author.username}</p>
                                                    <p style={{ fontWeight: 'bold' }}>{notification.message.createdAt}</p>
                                                  </div>
                                                    <p style={{ fontSize: '14px' }}>You have received a message</p>
                                                </div>
                                                <IconButton
                                                    onClick={(e) => clearNotification(e, notification.message.id)}
                                                    style={{ position: 'absolute', right: 15 }}
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': {
                                                            color: '#ff5c5c',
                                                            backgroundColor: darkTheme ? '#2E2E2E' : 'lightgray',
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ color: 'inherit' }}/>
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
