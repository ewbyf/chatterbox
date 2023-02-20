/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/ResetPassword.module.css'
import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";

export default function ForgotPassword() {
    return (
    <>
        <Head>
        <title>Chatterbox | Reset Password</title>
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
                <div className={styles.forgotPassword}>
                    <Image src="/logo.png" alt="logo" width={100} height={100}/>
                    {/* <p className={styles.title}>Reset Password</p> */}
                    <form>
                        <label>Email</label>
                        <input type="text" required placeholder='Enter email'/>

                        <a className={styles.resetButton}>RESET PASSWORD</a>
                    </form>
                    <p className={styles.option}><Link href="/login" className={styles.link}>{"<"} Back to login</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
