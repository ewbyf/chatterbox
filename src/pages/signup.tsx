/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = (): void => {
        axios.post("https://cs2300-backend-stage.us.aldryn.io/signup", {
            // email,
            username,
            password
        })
        .then((resp) => {
            console.log(resp.data);
            localStorage.setItem("userToken", resp.data.token);
            console.log(localStorage.getItem("userToken"));
            // add token to localStorage
            // send user to app
        })
        .catch((err) => {
            console.log("Error, username exists");
        })
    }

    return (
    <>
        <Head>
        <title>Chatterbox | Signup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <motion.div
                initial={{ opacity: 0, x: "100vh" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100vh" }}
                transition={{ type: "tween", duration: .5 }}
                className={styles.container}
            >   
                <div className={styles.signup}>
                    <Image src="/logo.png" alt="logo" width={100} height={100}/>
                    <form>
                        <label>Username</label>
                        <input type="text" required placeholder='Enter username' value={username} onChange={(e) => {setUsername(e.target.value)}} />

                        <label>Email</label>
                        <input type="text" required placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}} />

                        <label>Password</label>
                        <input type="text" required placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}} />

                        <a className={styles.signupButton} onClick={signupHandler}>SIGN UP</a>
                    </form>
                    <p className={styles.option}>Already have an account? <Link href="/login" className={styles.link}>Log in</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
