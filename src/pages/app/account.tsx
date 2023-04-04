import Head from "next/head";
import { useEffect, useState } from "react";
import { ThemeUpdateContext, UserContext } from "@/components/Layout";
import styles from "@/styles/app/Account.module.css";
import LogoutDialog from "../../components/LogoutDialog";
import Logout from "@mui/icons-material/Logout";
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import Header from "@/components/Header";
import { Avatar } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Button from "@/components/Button";
import api from "@/services/axiosConfig";

import Dropdown from "@/components/Dropdown";
import MenuItem from '@mui/material/MenuItem';
import TextInput from "@/components/TextInput";

export default function Account() {
    const [openLogout, setOpenLogout] = useState<boolean>(false);

    const changeAvatar = () => {

        api.post("/")
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
                    <Avatar sx={{ width: 100, height: 100, mb: 2 }} src={user.avatar} />
                    <Button type="input" text="CHANGE AVATAR" dark="rgb(38, 38, 38)" light="lightgray" icon={<LockIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => changeAvatar()}/>
                    <TextInput label="USERNAME" value={user.username} placeholder="Enter username">
                        <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>#{user.id}</p>          
                    </TextInput>
                    <TextInput label="EMAIL" value={user.email} disabled={true}/>
                    <TextInput label="PASSWORD" value="filler" disabled={true} password/>
                    <div className={styles.buttonRow}>
                        <Button text="CHANGE EMAIL" dark="rgb(38, 38, 38)" light="lightgray" icon={<EmailIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenLogout(true)}/>
                        <Button text="CHANGE PASSWORD" dark="rgb(38, 38, 38)" light="lightgray" icon={<LockIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenLogout(true)}/>
                    </div>
                    <Button text="DELETE ACCOUNT" dark="#ff5c5c" light="#ff5c5c" icon={<DeleteIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenLogout(true)}/>
                </div>

                <div className={styles.section} style={{gap: "20px"}}>
                    <Dropdown title="NOTIFICATIONS" value={darkTheme ? "all" : "messages"} onChange={(e) => console.log(e.target.value)}>
                        [<MenuItem value="all">All Notifications</MenuItem>, <MenuItem value="messages">Only Messages</MenuItem>, <MenuItem value="friends">Only Friend Requests</MenuItem>, <MenuItem value="none">None</MenuItem>]
                    </Dropdown>
                    <Dropdown title="STATUS" value={darkTheme ? "online" : "dnd"} onChange={(e) => console.log(e.target.value)}>
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
                <Button text="LOGOUT" dark="rgb(38, 38, 38)" light="lightgray" icon={<Logout fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => setOpenLogout(true)}/>
            </div>
            <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
          </main>
        )}
        </UserContext.Consumer>
    </>
  );
}
