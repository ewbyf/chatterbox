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
            <div className={styles.account}>
              <p className={styles.title}>ACCOUNT</p>
              <label className={styles.box}>
                Username
                <input
                  value="filler"
                  className={styles.input}
                  style={darkTheme ? { color: "white" } : { color: "black" }}
                />
              </label>
              <label className={styles.box}>
                Email
                <input
                  value="filler"
                  className={styles.input}
                  style={darkTheme ? { color: "white" } : { color: "black" }}
                />
              </label>
              <div className={`${styles.button} ${styles.delete}`} onClick={() => setOpenLogout(true)}>
                <LockIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                <p>Change Password</p>
            </div>
            </div>
            <div className={styles.preferences}>
                <p className={styles.title}>PREFERENCES</p>
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
                    <p>Logout</p>
                </div>
                <div className={`${styles.button} ${styles.delete}`} onClick={() => setOpenLogout(true)}>
                    <DeleteIcon fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>
                    <p>Delete Account</p>
                </div>
            </div>
            <LogoutDialog open={openLogout} setOpen={setOpenLogout} />
          </main>
        )}
        </UserContext.Consumer>
    </>
  );
}
