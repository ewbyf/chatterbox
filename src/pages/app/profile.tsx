import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";
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

export default function Profile() {

  return (
    <>
      <Head>
        <title>Chatterbox | Profile</title>
      </Head>
      <UserContext.Consumer>
        {({ darkTheme }) => (
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
            </div>
          </main>
        )}
      </UserContext.Consumer>
    </>
  );
}
