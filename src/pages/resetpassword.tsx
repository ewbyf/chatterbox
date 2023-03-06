/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/ResetPassword.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const mobile = useMediaQuery('(max-width: 700px)');

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
                    <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{marginBottom: "15px"}}/>
                    {success && <Alert severity="success" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        Account successfully created!
                    </Alert>}
                    {error && <Alert severity="error" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        {errorMessage}
                    </Alert>}
                    <form>
                        <label>Email</label>
                        <input type="text" required placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>

                        <a className={styles.resetButton} onClick={resetHandler}>RESET PASSWORD</a>
                    </form>
                    <Link href="/login" className={styles.link}>{"<"} Back to login</Link>
                </div>
            </motion.div>
        </main>
    </>
  )
}
