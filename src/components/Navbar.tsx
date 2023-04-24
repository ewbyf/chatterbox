import Image from 'next/image';
import styles from '@/styles/components/Navbar.module.css';
import { IoCompassOutline, IoPeopleOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '@/components/Layout';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import { IoNotifications } from 'react-icons/io5';
import Status from './Status';
import NotificationBadge from './NotificationBadge';
import { useContext } from 'react'

const Navbar = ({ noOverlap }: { noOverlap: boolean }) => {
    const router = useRouter();
    const mobile = useMediaQuery('(max-width: 800px)');
    const { friendRequests, dmsUnread, notificationsList } = useContext(UserContext);

    if (mobile) {
        return (
            <UserContext.Consumer>
                {({ darkTheme, user }) => (
                    <nav className={styles.navMobile} style={darkTheme ? { backgroundColor: '#141414' } : { backgroundColor: '#ececec' }}>
                        <Link href="/app/explore" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                            <div style={{ display: 'flex' }}>
                                <IoCompassOutline
                                    color={router.pathname.startsWith(`/app/explore`) ? '#ff5c5c' : 'gray'}
                                    size={32.5}
                                    className={styles.icon}
                                />
                            </div>
                        </Link>
                        <Link href="/app/friends" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                            <div style={{ display: 'flex' }}>
                                <NotificationBadge count={friendRequests.length}>
                                    <IoPeopleOutline color={router.pathname.startsWith(`/app/friends`) ? '#ff5c5c' : 'gray'} size={32.5} />
                                </NotificationBadge>
                            </div>
                        </Link>
                        <Link href="/app/messages" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                            <div style={{ display: 'flex' }}>
                                <NotificationBadge count={dmsUnread}>
                                    <IoChatbubbleEllipsesOutline color={router.pathname.startsWith(`/app/messages`) ? '#ff5c5c' : 'gray'} size={32.5} />
                                </NotificationBadge>
                            </div>
                        </Link>
                        <Link href="/app/notifications" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                            <NotificationBadge count={notificationsList.unread}>
                                <IoNotifications color={router.pathname.startsWith(`/app/notifications`) ? '#ff5c5c' : 'gray'} size={27.5} />
                            </NotificationBadge>
                        </Link>
                        <Link href="/app/account" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                            <Status status="ONLINE" bg={darkTheme ? '#141414' : '#ececec'}>
                                <Avatar sx={{ width: 32.5, height: 32.5 }} src={user.avatar} />
                            </Status>
                        </Link>
                    </nav>
                )}
            </UserContext.Consumer>
        );
    }

    return (
        <UserContext.Consumer>
            {({ darkTheme, user }) => (
                <motion.nav
                    className={styles.nav}
                    style={{
                        backgroundColor: darkTheme ? '#141414' : '#ececec',
                        position: noOverlap ? 'relative' : 'fixed'
                    }}
                    whileHover={{
                        width: '200px'
                    }}
                    initial={{ width: '80px' }}
                    transition={{ type: 'tween', duration: 0.2 }}
                >
                    <div className={styles.logo}>
                        <Image src="/logo.png" alt="logo" height={40} width={40} />
                        <p className={styles.expandText} style={{ fontSize: '18.5px' }}>
                            ChatterBox
                        </p>
                    </div>
                    <Link href="/app/explore " className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                        <div style={{ display: 'flex' }}>
                            <IoCompassOutline color={router.pathname.startsWith(`/app/explore`) ? '#ff5c5c' : 'gray'} size={40} className={styles.icon} />
                        </div>
                        <p
                            className={styles.expandText}
                            style={{
                                color: router.pathname.startsWith(`/app/explore`) ? '#ff5c5c' : 'gray'
                            }}
                        >
                            EXPLORE
                        </p>
                    </Link>
                    <Link href="/app/friends" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                        <div style={{ display: 'flex' }}>
                            <NotificationBadge count={friendRequests.length}>
                                <IoPeopleOutline color={router.pathname.startsWith(`/app/friends`) ? '#ff5c5c' : 'gray'} size={40} />
                            </NotificationBadge>
                        </div>
                        <p
                            className={styles.expandText}
                            style={{
                                color: router.pathname.startsWith(`/app/friends`) ? '#ff5c5c' : 'gray'
                            }}
                        >
                            FRIENDS
                        </p>
                    </Link>
                    <Link href="/app/messages" className={`${styles.section} ${darkTheme ? styles.dark : styles.light}`}>
                        <div style={{ display: 'flex' }}>
                            <NotificationBadge count={dmsUnread}>
                                <IoChatbubbleEllipsesOutline color={router.pathname.startsWith(`/app/messages`) ? '#ff5c5c' : 'gray'} size={40} />
                            </NotificationBadge>
                        </div>
                        <p
                            className={styles.expandText}
                            style={{
                                color: router.pathname.startsWith(`/app/messages`) ? '#ff5c5c' : 'gray'
                            }}
                        >
                            MESSAGES
                        </p>
                    </Link>
                    <Link href="/app/account" className={`${styles.section} ${darkTheme ? styles.dark : styles.light} ${styles.settings}`}>
                        <Status status="ONLINE" bg={darkTheme ? '#141414' : '#ececec'}>
                            <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
                        </Status>
                        <p
                            className={styles.expandText}
                            style={{
                                color: router.pathname.startsWith(`/app/account`) ? '#ff5c5c' : 'gray'
                            }}
                        >
                            ACCOUNT
                        </p>
                    </Link>
                </motion.nav>
            )}
        </UserContext.Consumer>
    );
};

export default Navbar;
