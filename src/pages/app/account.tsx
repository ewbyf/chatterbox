import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { ThemeUpdateContext, UserContext } from '@/components/Layout';
import styles from '@/styles/app/Account.module.css';
import api from '@/services/axiosConfig';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import TextInput from '@/components/TextInput';
import LogoutDialog from '../../components/LogoutDialog';
import EmailDialog from '@/components/EmailDialog';
import PasswordDialog from '@/components/PasswordDialog';


export default function Account() {
    const [openLogout, setOpenLogout] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [openEmail, setOpenEmail] = useState<boolean>(false);
    const { updateUser, user } = useContext(UserContext);
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setUsername(user.username);
    }, [user.username]);

    const changeAvatar = (avatar: File) => {
        const formData = new FormData();
        formData.append('token', user.token);
        formData.append('file', avatar);
        api.patch('/set-avatar', formData)
            .then((resp) => {
                updateUser({ ...user, avatar: resp.data });
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const removeAvatar = () => {
        api.post('/reset-avatar', {
            token: user.token
        })
            .then((resp) => {
                updateUser({ ...user, avatar: resp.data.avatar });
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const changeNotifications = (val: string) => {
        api.patch('/me', { token: user.token, notifications: val }).then((resp) => {
            updateUser(resp.data);
        });
    };

    const changeStatus = (val: string) => {
        api.patch('/me', { token: user.token, status: val }).then((resp) => {
            updateUser(resp.data);
        });
    };

    const saveUsername = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        e.stopPropagation();
        api.patch(`/me`, { token: user.token, username })
            .then((resp) => {
                updateUser({ ...user, username: resp.data.username });
                setError(false);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setError(true);
            });
    };

    return (
        <>
            <Head>
                <title>Chatterbox | Account</title>
            </Head>
            <UserContext.Consumer>
                {({ darkTheme, user }) => (
                    <main className={styles.main}>
                        <Header center>SETTINGS</Header>
                        <div className={styles.account}>
                            <div className={styles.section}>
                                <Avatar
                                    sx={{ width: 100, height: 100, mb: 2, border: darkTheme ? 'rgb(38, 38, 38) solid 1px' : 'gray solid 1px' }}
                                    src={user.avatar}
                                />
                                <div className={styles.buttonRow}>
                                    <Button
                                        type="input"
                                        text="CHANGE AVATAR"
                                        dark="rgb(38, 38, 38)"
                                        light="lightgray"
                                        icon={<PersonIcon fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                        onClick={(e: any) => {
                                            changeAvatar(e.target.files[0]);
                                            e.target.value = null;
                                        }}
                                    />
                                    {!user.avatar.startsWith('https://ui-avatars.com') && (
                                        <Button
                                            text="REMOVE AVATAR"
                                            dark="#ff5c5c"
                                            light="#ff5c5c"
                                            icon={<DeleteIcon fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                            onClick={removeAvatar}
                                        />
                                    )}
                                </div>
                                <TextInput label="USERNAME" value={username} onChange={setUsername} maxLength={12}>
                                    <>
                                        {username != user.username && username != '' && (
                                            <p className={styles.save} onClick={(e) => saveUsername(e)}>
                                                SAVE
                                            </p>
                                        )}
                                        <p
                                            className={styles.id}
                                            style={{
                                                backgroundColor: darkTheme ? 'rgb(36, 36, 36)' : 'rgb(212, 212, 212)',
                                                color: darkTheme ? '#868686' : '#5d5d5d'
                                            }}
                                        >
                                            #{user.id}
                                        </p>
                                        {error && <p className={styles.error}>Already taken</p>}
                                    </>
                                </TextInput>
                                <TextInput label="EMAIL" value={user.email} disabled={true} />
                                <TextInput label="PASSWORD" value="filler" disabled={true} password />
                                <Button
                                    text="CHANGE EMAIL"
                                    dark="rgb(38, 38, 38)"
                                    light="lightgray"
                                    icon={<EmailIcon fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                    onClick={() => setOpenEmail(true)}
                                />
                                <Button
                                    text="CHANGE PASSWORD"
                                    dark="rgb(38, 38, 38)"
                                    light="lightgray"
                                    icon={<LockIcon fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                    onClick={() => setOpenPassword(true)}
                                />
                            </div>

                            <div className={styles.section} style={{ gap: '20px' }}>
                                <Dropdown title="NOTIFICATIONS" value={user.settings.notifications} onChange={(e) => changeNotifications(e.target.value)}>
                                    [<MenuItem value="ALL">All Notifications</MenuItem>, <MenuItem value="MESSAGES">Only Messages</MenuItem>,{' '}
                                    <MenuItem value="FRIEND_REQ">Only Friend Requests</MenuItem>, <MenuItem value="NONE">None</MenuItem>]
                                </Dropdown>
                                <Dropdown title="STATUS" value={user.status} onChange={(e) => changeStatus(e.target.value)}>
                                    [<MenuItem value="ONLINE">Online</MenuItem>, <MenuItem value="DO_NOT_DISTURB">Do Not Disturb</MenuItem>,
                                    <MenuItem value="IDLE">Idle</MenuItem>,
                                    <MenuItem value={user.status == 'OFFLINE' ? 'OFFLINE' : 'INVISIBLE'}>Invisible</MenuItem>]
                                </Dropdown>
                                <ThemeUpdateContext.Consumer>
                                    {({ toggleTheme }) => (
                                        <Dropdown title="THEME" value={darkTheme ? 'dark' : 'light'} onChange={(e) => toggleTheme(e.target.value)}>
                                            [<MenuItem value="light">Light</MenuItem>, <MenuItem value="dark">Dark</MenuItem>]
                                        </Dropdown>
                                    )}
                                </ThemeUpdateContext.Consumer>
                            </div>
                            <Button
                                text="LOGOUT"
                                dark="#ff5c5c"
                                light="#ff5c5c"
                                icon={<Logout fontSize="small" sx={{ color: darkTheme ? 'white' : 'black' }} />}
                                onClick={() => setOpenLogout(true)}
                            />
                        </div>
                        <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
                        <PasswordDialog open={openPassword} setOpen={setOpenPassword} />
                        <EmailDialog open={openEmail} setOpen={setOpenEmail} />
                    </main>
                )}
            </UserContext.Consumer>
        </>
    );
}
