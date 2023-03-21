/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion"
import api from '@/services/axiosConfig'
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const mobile = useMediaQuery('(max-width: 700px)');

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            Router.push({
                pathname: "/app",
            });
        }
    }, []);

    const loginHandler = (): void => {
        api.post("login", {
            email,
            password
        })
        .then((resp) => {
            console.log(resp);
            localStorage.setItem("userToken", resp.data.token);
            Router.push({
                pathname: "/app/explore",
            });
        })
        .catch((err) => {
            setErrorMessage(err.response.data.message);
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
                    <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{marginBottom: "15px"}}/>
                    {error && <Alert severity="error" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        {errorMessage}
                    </Alert>}
                    <form> 
                        <label>Email</label>
                        <input type="email" required placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}} />

                        <label>Password</label>
                        <input type="password" required placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
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
