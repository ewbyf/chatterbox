/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";
import axios from "axios";
import Alert from '@mui/material/Alert';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const signupHandler = (): void => {
        axios.post("https://cs2300-backend-stage.us.aldryn.io/signup", {
            email,
            username,
            password
        })
        .then((resp: object): void => {
            setSuccess(true);
            setError(false);
            setUsername('');
            setPassword('');
            setEmail('');
        })
        .catch((err): void => {
            // switch case for error codes to set error message
            setErrorMessage("An account with that username already exists.");
            setError(true);
            setSuccess(false);
        })
    }

    return (
    <>
        <Head>
            <title>Chatterbox | Signup</title>
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
                    <Image src="/logo.png" alt="logo" width={100} height={100} style={{marginBottom: "15px"}}/>
                    {success && <Alert severity="success">
                        Account successfully created!
                    </Alert>}
                    {error && <Alert severity="error">
                        {errorMessage}
                    </Alert>}
                    <form>
                        <label>
                            Username
                            <input type="text" required placeholder='Enter username' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                        </label>
                        
                        <label>
                            Email
                            <input type="email" required placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                        </label>

                        <label>
                            Password
                            <input type="password" required placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </label>

                        <a className={styles.signupButton} onClick={signupHandler}>SIGN UP</a>
                    </form>
                    <p className={styles.option}>Already have an account? <Link href="/login" className={styles.link}>Log in</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
