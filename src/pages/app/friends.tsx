import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '@/styles/app/Friends.module.css';
import { UserContext } from '@/components/Layout';
import api from '@/services/axiosConfig';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Dropdown from '@/components/Dropdown';
import { MenuItem } from '@mui/material';
import FriendBox from '@/components/FriendBox';
import SearchBar from '@/components/SearchBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

import { IFriend, IRequest } from '../../interfaces';
import { statusChange } from '@/utils/StatusChange';
import NotificationBadge from '@/components/NotificationBadge';

export default function Friends() {
    const [searchField, setSearchField] = useState<string>('');
    const [friendsSelected, setFriendsSelected] = useState<number>(1);
    const [friends, setFriends] = useState<IFriend[]>([]);
    const [friendsShown, setFriendsShown] = useState<IFriend[]>([]);
    const [dropdown, setDropdown] = useState<'all' | 'online' | 'blocked'>('all');
    const [init, setInit] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { user, friendStatus, friendRequests, removeFriendRequest } = useContext(UserContext);
    const mobile = useMediaQuery('(max-width: 800px)');
    const router = useRouter();

    useEffect(() => {
        if (friendStatus) {
            statusChange(friends, user, setFriends, friendStatus);
        }
    }, [friendStatus]);

    useEffect(() => {
        getFriends();
    }, []);

    const getFriends = async () => {
        await api
            .get(`/friends?token=${user.token}`)
            .then((resp) => {
                setFriends(resp.data);
                setFriendsShown(resp.data);
                setFriendsSelected(router.query.requests ? 2 : 1);
                setInit(false);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const addFriend = (field: string) => {
        if (field.charAt(0) === '#') {
            field = field.replace('#', '');
            api.post('/request-friend', { token: user.token, id: Number(field) })
                .then((resp) => {
                    setSuccess(true);
                    setError(false);
                    setSearchField('');
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                    setError(true);
                    setSuccess(false);
                });
        } else {
            api.post('/request-friend', { token: user.token, username: field })
                .then((resp) => {
                    setSuccess(true);
                    setError(false);
                    setSearchField('');
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                    setError(true);
                    setSuccess(false);
                });
        }
    };

    const acceptRequest = (id: number) => {
        api.post('/accept-request', { token: user.token, id })
            .then((resp) => {
                removeFriendRequest(id);
                setFriends([...friends, resp.data]);
                filterFriends(dropdown);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const rejectRequest = (id: number) => {
        api.post('/reject-request', { token: user.token, id })
            .then((resp) => {
                removeFriendRequest(id);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };
    
    const block = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
        e.stopPropagation();
        const token = localStorage.getItem('userToken');
        api.post('/block', {token, id})
        .then((resp) => {
            setFriends(friends.filter((friend) => friend.id != id));
            filterFriends(dropdown);
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
    }

    const searchFriends = (val: string) => {
        console.log(val);
    };

    const filterFriends = (val: 'all' | 'online' | 'blocked') => {
        setDropdown(val);
        if (val == 'online') {
            setFriendsShown(friends.filter(friend => friend.status == 'ONLINE'));
        }
        else if (val == 'all') {
            setFriendsShown([...friends]);
        }
    }

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setFriendsSelected(newValue);
    };

    if (init) return null;

    return (
        <>
            <Head>
                <title>Chatterbox | Friends</title>
            </Head>
            <UserContext.Consumer>
                {({ darkTheme, user }) => (
                    <main className={styles.main}>
                        <Header center>
                            <div className={styles.options}>
                                <Tabs
                                    value={friendsSelected}
                                    onChange={tabChange}
                                    sx={{
                                        '& .MuiTabs-indicator': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            backgroundColor: '#ff5c5c'
                                        }
                                    }}
                                >
                                    <Tab
                                        value={1}
                                        label="FRIENDS"
                                        sx={{
                                            color: 'gray',
                                            fontFamily: 'MarkPro',
                                            fontSize: '18px',
                                            marginRight: '50px',
                                            '&.Mui-selected': {
                                                color: '#ff5c5c'
                                            },
                                            '&.Mui-focusVisible': {
                                                backgroundColor: 'rgba(100, 95, 228, 0.32)'
                                            }
                                        }}
                                    />
                                    <Tab
                                        value={2}
                                        label={<NotificationBadge count={friendRequests.length} small rectangle>REQUESTS</NotificationBadge>}
                                        sx={{
                                            color: 'gray',
                                            fontFamily: 'MarkPro',
                                            fontSize: '18px',
                                            '&.Mui-selected': {
                                                color: '#ff5c5c'
                                            },
                                            '&.Mui-focusVisible': {
                                                backgroundColor: 'rgba(100, 95, 228, 0.32)'
                                            }
                                        }}
                                    />
                                </Tabs>
                            </div>
                        </Header>
                        {!mobile && (
                            <div className={styles.options}>
                                <Tabs
                                    value={friendsSelected}
                                    onChange={tabChange}
                                    sx={{
                                        '& .MuiTabs-indicator': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            backgroundColor: '#ff5c5c'
                                        }
                                    }}
                                >
                                    <Tab
                                        value={1}
                                        label="FRIENDS"
                                        sx={{
                                            color: 'gray',
                                            fontFamily: 'MarkPro',
                                            fontSize: '18px',
                                            marginRight: '50px',
                                            '&.Mui-selected': {
                                                color: '#ff5c5c'
                                            },
                                            '&.Mui-focusVisible': {
                                                backgroundColor: 'rgba(100, 95, 228, 0.32)'
                                            }
                                        }}
                                    />
                                    <Tab
                                        value={2}
                                        label={<NotificationBadge count={friendRequests.length} rectangle>REQUESTS</NotificationBadge>}
                                        sx={{
                                            color: 'gray',
                                            fontFamily: 'MarkPro',
                                            fontSize: '18px',
                                            '&.Mui-selected': {
                                                color: '#ff5c5c'
                                            },
                                            '&.Mui-focusVisible': {
                                                backgroundColor: 'rgba(100, 95, 228, 0.32)'
                                            }
                                        }}
                                    />
                                </Tabs>
                            </div>
                        )}

                        <div className={styles.section} style={{ padding: mobile ? '0px' : '30px 0px' }}>
                            {friendsSelected === 1 && (
                                <div className={styles.friends}>
                                    <Dropdown title="SHOW FRIENDS" value={dropdown} onChange={(e) => filterFriends(e.target.value)}>
                                        [<MenuItem value="all">All</MenuItem>, <MenuItem value="online">Online</MenuItem>,{' '}
                                        <MenuItem value="blocked">Blocked</MenuItem>]
                                    </Dropdown>
                                    <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)} />
                                    <p className={styles.sectionTitle} style={{ marginTop: '20px' }}>
                                        {dropdown.toUpperCase()} - {friendsShown.length}
                                    </p>
                                    {friendsShown.map((friend) => (
                                        <FriendBox
                                            friend={friend}
                                            onClick={() => Router.push({ pathname: '/app/messages', query: { selected: friend.id.toString() } })}
                                            key={friend.id}
                                            blockable
                                            block={(e) => block(e, friend.id)}
                                        />
                                    ))}
                                </div>
                            )}

                            {friendsSelected === 2 && (
                                <div className={styles.requests}>
                                    <p className={styles.sectionTitle}>FIND YOUR FRIENDS</p>
                                    {success && <p style={{ color: '#5CC78E', fontWeight: 'bold', fontSize: '17px' }}>Friend request succesfully sent!</p>}
                                    {error && <p style={{ color: '#ff5c5c', fontWeight: 'bold', fontSize: '17px' }}>{errorMessage}</p>}
                                    <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)} />
                                    <Button
                                        text="ADD FRIEND"
                                        dark="#ff5c5c"
                                        light="#ff5c5c"
                                        icon={<PersonAddIcon fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                        onClick={() => addFriend(searchField)}
                                    />
                                    <p className={styles.sectionTitle} style={{ marginTop: '20px' }}>
                                        RECEIVED REQUESTS
                                    </p>
                                    {friendRequests.map((request) => (
                                        <FriendBox friend={request.from} request accept={acceptRequest} reject={rejectRequest} key={request.from.id} />
                                    ))}
                                    {friendRequests.length === 0 && <p>You have not received any friend requests</p>}

                                    {/* <div>
                  <p className={styles.sectionTitle}>SENT</p>
                  <p>You have not sent any friend requests</p>
                </div> */}
                                </div>
                            )}
                        </div>
                    </main>
                )}
            </UserContext.Consumer>
        </>
    );
}
