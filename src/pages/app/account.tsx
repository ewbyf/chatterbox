import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { ThemeUpdateContext, UserContext } from "@/components/Layout";
import styles from "@/styles/app/Account.module.css";
import api from "@/services/axiosConfig";
import { Avatar } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import Logout from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import Header from "@/components/Header";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoutDialog from "../../components/LogoutDialog";
import EmailDialog from "@/components/EmailDialog";
import PasswordDialog from "@/components/PasswordDialog";
import { IStatus, INotificationSettings } from "@/interfaces";

export default function Account() {
    const [openLogout, setOpenLogout] = useState<boolean>(false);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [openEmail, setOpenEmail] = useState<boolean>(false);
    const { updateUser, user } = useContext(UserContext);
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const mobile = useMediaQuery('(max-width: 700px)');

    // const [notificationsVal, setNotificationsVal] = useState<INotificationSettings>('ALL');
    // const [statusVal, setStatusVal] = useState<IStatus>('ONLINE');

    useEffect(() => {
        setUsername(user.username);
    }, [user.username])

    const changeAvatar = (avatar: File) => {
        const formData = new FormData();
        formData.append("token", user.token);
        formData.append("file", avatar);
        api.patch("/set-avatar", formData)
        .then((resp) => {
            updateUser();
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
    }

    const removeAvatar = () => {
        api.post("/reset-avatar", {
            token: user.token
        })
        .then((resp) => {
            updateUser();
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
    }

    const changeNotifications = (val: string) => {
        let notifications = '';
        if (val === 'all') {
            notifications = 'ALL';
        }
        else if (val === 'messages') {
            
        }
        else if (val === 'friends') {
            
        }
        else if (val === 'none') {
            
        }
    }

    const changeStatus = (val: string) => {
        console.log(val)
    }

    const saveUsername = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        e.stopPropagation();
        const token = localStorage.getItem('userToken');
        api.patch(`/me`, { token, username })
        .then((resp) => {
            updateUser();
            setError(false);
        })
        .catch((err) => {
            console.log(err.response.data.message);
            setError(true);
        })
    }

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
                    <Avatar sx={{ width: 100, height: 100, mb: 2, border: darkTheme ? "rgb(38, 38, 38) solid 1px" : "gray solid 1px" }} src={user.avatar} />
                    <div className={styles.buttonRow}>
                        <Button type="input" text="CHANGE AVATAR" dark="rgb(38, 38, 38)" light="lightgray" icon={<PersonIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={(e: any) => {changeAvatar(e.target.files[0]); e.target.value = null}}/>
                        {!user.avatar.startsWith("https://ui-avatars.com") && <Button text="REMOVE AVATAR" dark="#ff5c5c" light="#ff5c5c" icon={<DeleteIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={removeAvatar}/>}
                    </div>
                    <TextInput label="USERNAME" value={username} onChange={setUsername} maxLength={12}>
                        <>
                            {username != user.username && username != '' && <p className={styles.save} onClick={(e) => saveUsername(e)}>SAVE</p>}
                            <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>#{user.id}</p> 
                            {error && <p className={styles.error}>
                                Already taken
                            </p>}
                        </>         
                    </TextInput>
                    <TextInput label="EMAIL" value={user.email} disabled={true}/>
                    <TextInput label="PASSWORD" value="filler" disabled={true} password/>
                    <Button text="CHANGE EMAIL" dark="rgb(38, 38, 38)" light="lightgray" icon={<EmailIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenEmail(true)}/>
                    <Button text="CHANGE PASSWORD" dark="rgb(38, 38, 38)" light="lightgray" icon={<LockIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenPassword(true)}/>
                </div>

                <div className={styles.section} style={{gap: "20px"}}>
                    <Dropdown title="NOTIFICATIONS" value={} onChange={(e) => changeNotifications(e.target.value)}>
                        [<MenuItem value="all">All Notifications</MenuItem>, <MenuItem value="messages">Only Messages</MenuItem>, <MenuItem value="friends">Only Friend Requests</MenuItem>, <MenuItem value="none">None</MenuItem>]
                    </Dropdown>
                    <Dropdown title="STATUS" value={} onChange={(e) => changeStatus(e.target.value)}>
                        [<MenuItem value="online">Online</MenuItem>, <MenuItem value="dnd">Do Not Disturb</MenuItem>,<MenuItem value="idle">Idle</MenuItem>,<MenuItem value="invisible">Invisible</MenuItem>]
                    </Dropdown>
                    <ThemeUpdateContext.Consumer>
                    {({ toggleTheme }) => (
                        <Dropdown title="THEME" value={darkTheme ? "dark" : "light"} onChange={(e) => toggleTheme(e.target.value)}>
                            [<MenuItem value="light">Light</MenuItem>, <MenuItem value="dark">Dark</MenuItem>]
                        </Dropdown>
                    )}
                    </ThemeUpdateContext.Consumer>
                </div>
                <Button text="LOGOUT" dark="#ff5c5c" light="#ff5c5c" icon={<Logout fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenLogout(true)}/>
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
