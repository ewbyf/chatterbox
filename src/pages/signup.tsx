/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";

export default function Login() {
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            Router.push({
                pathname: "/app",
            });
        }
    }, []);

    return (
    <>
        <Head>
        <title>Chatterbox</title>
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
                <div className={styles.login}>
                    <p className={styles.title}>Sign Up</p>
                    <form>
                        <label>Email</label>
                        <input type="text" required placeholder='Enter email'/>

                        <label>Password</label>
                        <input type="text" required placeholder='Enter password'/>
                        <a className={`${styles.link} ${styles.forgot}`}>Forgot password?</a>

                        <a className={styles.loginButton}>LOG IN</a>
                    </form>
                    <p className={styles.option}>Already have an account? <Link href="/login" className={styles.link}>Log in</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
