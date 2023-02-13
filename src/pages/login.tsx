/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useEffect } from 'react'
import Router from 'next/router'

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
            <div className={styles.container}>
                <p className={styles.title}>Login</p>
                <form>
                    <label>Email</label>
                    <input type="text" required placeholder='Enter email'/>

                    <label>Password</label>
                    <input type="text" required placeholder='Enter password'/>
                    <a className={`${styles.link} ${styles.forgot}`}>Forgot password?</a>

                    <a className={styles.login}>LOG IN</a>
                </form>
                <p className={styles.option}>Don't have an account? <a  className={styles.link}>Sign up</a></p>
            </div>
        </main>
    </>
  )
}
