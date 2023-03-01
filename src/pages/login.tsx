/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion"
import axios from 'axios'
import Alert from '@mui/material/Alert';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     const token = localStorage.getItem("userToken");
    //     if (token) {
    //         Router.push({
    //             pathname: "/app",
    //         });
    //     }
    // }, []);

    const loginHandler = (): void => {
        axios.post("https://cs2300-backend-stage.us.aldryn.io/login", {
            email,
            password
        })
        .then((resp) => {
            localStorage.setItem("userToken", resp.data.token);
            Router.push({
                pathname: "/app",
            });
        })
        .catch((err) => {
            // switch case for error codes to set error message
            setErrorMessage("Invalid email or password. Please try again.");
            setError(true);
        })
    }

    return (
    <>
        <Head>
            <title>Chatterbox | Login</title>
        </Head>
        <main className={styles.main}>
            <motion.div
                initial={{ opacity: 0, x: "100vh" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100vh" }}
                transition={{ type: "tween", duration: .5 }}
                className={styles.container}
            >   
                <div className={styles.login}>
                    <Image src="/logo.png" alt="logo" width={100} height={100} style={{marginBottom: "15px"}}/>
                    {error && <Alert severity="error">
                        {errorMessage}
                    </Alert>}
                    <form> 
                        <label>Email</label>
                        <input type="text" required placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}} />

                        <label>Password</label>
                        <input type="text" required placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <Link href="/resetpassword" className={`${styles.link} ${styles.forgot}`}>Forgot password?</Link>

                        <a className={styles.loginButton} onClick={loginHandler}>LOG IN</a>
                    </form>
                    <p className={styles.option}>Don't have an account? <Link href="/signup" className={styles.link}>Sign up</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
