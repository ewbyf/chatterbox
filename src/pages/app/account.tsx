import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Router from "next/router";
import { ThemeUpdateContext, UserContext } from "@/components/Layout";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import styles from "@/styles/app/Account.module.css";
import LogoutDialog from "../../components/LogoutDialog";
import Logout from "@mui/icons-material/Logout";
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import Header from "@/components/Header";
import { Avatar } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: red[300],
    "&:hover": {
      backgroundColor: alpha(red[500], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: red[200],
  },
}));

export default function Account() {
const [openLogout, setOpenLogout] = useState<boolean>(false);

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
                <Avatar sx={{ width: 100, height: 100, mb: 2 }} src={user.avatar} />
                <label className={`${styles.box} ${darkTheme ? styles.darkEditable : styles.lightEditable}`}>
                    USERNAME
                    <input
                        value={user.username}
                        className={styles.input}
                        style={darkTheme ? { color: "white" } : { color: "black" }}
                    />
                    <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>#{user.id}</p>
                    
                </label>
                <label className={styles.box}>
                    EMAIL
                    <input
                        disabled
                        value="filler"
                        className={styles.input}
                        style={darkTheme ? { color: "white", maxWidth: "275px" } : { color: "black", maxWidth: "275px" }}
                    />
                </label>
                <label className={styles.box}>
                    PASSWORD
                    <input
                        disabled
                        type="password"
                        value="filler"
                        className={styles.input}
                        style={darkTheme ? { color: "white" } : { color: "black" }}
                    />
                </label>         
                <div className={`${styles.button} ${styles.delete}`} onClick={() => setOpenLogout(true)}>
                    <EmailIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                    <p>CHANGE EMAIL</p>
                </div>
                <div className={`${styles.button} ${styles.delete}`} onClick={() => setOpenLogout(true)}>
                    <LockIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                    <p>CHANGE PASSWORD</p>
                </div>
            </div>
            <div className={styles.preferences}>
                <FormGroup>
                    <ThemeUpdateContext.Consumer>
                    {({ toggleTheme }) => (
                        <FormControlLabel
                            checked={darkTheme}
                            onChange={() => toggleTheme()}
                            control={<RedSwitch />}
                            label="Dark Mode"
                            labelPlacement="start"
                        />
                    )}
                    </ThemeUpdateContext.Consumer>
                </FormGroup>
            </div>
            <div className={styles.options}>
                <div className={`${styles.button} ${darkTheme ? styles.darkLogout : styles.lightLogout}`} onClick={() => setOpenLogout(true)} >
                    <Logout fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                    <p>LOGOUT</p>
                </div>
                <div className={`${styles.button} ${styles.delete}`} onClick={() => setOpenLogout(true)}>
                    <DeleteIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                    <p>DELETE ACCOUNT</p>
                </div>
            </div>
            <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
          </main>
        )}
        </UserContext.Consumer>
    </>
  );
}
