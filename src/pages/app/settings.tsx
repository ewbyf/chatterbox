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
import styles from "@/styles/app/Settings.module.css";

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

export default function Settings() {
  return (
    <>
      <Head>
        <title>Chatterbox | Settings</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.account}>
          <p className={styles.title}>ACCOUNT</p>
        </div>

        <div className={styles.preferences}>
          <p className={styles.title}>PREFERENCES</p>
          <FormGroup>
            <ThemeUpdateContext.Consumer>
              {({ toggleTheme }) => (
                <UserContext.Consumer>
                  {({ darkTheme }) => (
                    <FormControlLabel
                      checked={darkTheme}
                      onChange={() => toggleTheme()}
                      control={<RedSwitch />}
                      label="Dark Mode"
                      labelPlacement="start"
                    />
                  )}
                </UserContext.Consumer>
              )}
            </ThemeUpdateContext.Consumer>
          </FormGroup>
        </div>
        <div className={styles.options}></div>
      </main>
    </>
  );
}
