import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { ThemeUpdateContext } from '@/components/Layout';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import styles from "@/styles/app/Settings.module.css";

const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[300],
    '&:hover': {
      backgroundColor: alpha(red[500], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[200],
  },
}));

export default function Settings() {
    const [userToken, setUserToken] = useState('');
    const [darkTheme, setDarkTheme] = useState(false);
    const [initializing, setInitializing] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const theme = localStorage.getItem("theme");
        if (token) {
          setUserToken(token);
          if (theme == "dark") {
            setDarkTheme(true);
          }
          setInitializing(false);
        }
        else {
            Router.push({
                pathname: "/login",
            });
        }
    }, []);

    if (initializing) return null;

    return (
    <>
      <Head>
        <title>Chatterbox | Settings</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.account}>
          <p className={styles.title}>ACCOUNT</p>
          <label className={styles.box}>
            Username
            <input value="filler" className={styles.input} style={darkTheme ? {color: "white"} : {color: "black"}}/>
          </label>
          <label className={styles.box}>
            Email
            <input value="filler" className={styles.input} style={darkTheme ? {color: "white"} : {color: "black"}}/>
          </label>

        </div>

        <div className={styles.preferences}>
          <p>PREFERENCES</p>
          <FormGroup>
            <ThemeUpdateContext.Consumer>
              {({ toggleTheme }) => (
                <FormControlLabel checked={darkTheme} onChange={() => {toggleTheme(); setDarkTheme(!darkTheme)}} control={<RedSwitch/>} label="Dark Mode" labelPlacement="start"/>
              )}
            </ThemeUpdateContext.Consumer>
          </FormGroup>
        </div>
        <div className={styles.options}> 

        </div>
      </main>
    </>
  )
}