/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/ResetPassword.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const resetHandler = (): void => {
        console.log("reset");
    }

    return (
    <>
        <Head>
            <title>Chatterbox | Reset Password</title>
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
                    <Image src="/logo.png" alt="logo" width={100} height={100} style={{marginBottom: "15px"}}/>
                    <form>
                        <label>Email</label>
                        <input type="text" required placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>

                        <a className={styles.resetButton} onClick={resetHandler}>RESET PASSWORD</a>
                    </form>
                    <p className={styles.option}><Link href="/login" className={styles.link}>{"<"} Back to login</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
