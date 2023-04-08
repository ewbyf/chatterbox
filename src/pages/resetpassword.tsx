/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/ResetPassword.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@/components/Button'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const mobile = useMediaQuery('(max-width: 700px)');
    const nonce = window.location.search.replace("?nonce=", "")

    useEffect(() => {
        if (nonce) {
            // if api get
            console.log('das')
            setChange(true);
        }
    }, [])

    const resetHandler = () => {
        console.log("reset");
    }

    const newPasswordHandler = () => {
        if (password === password2) {
            if (password === "") {
                setError(true);
                setErrorMessage("Please enter a password");
            }
            else {

            }
        }
        else {
            setError(true);
            setErrorMessage("Passwords do not match");
        }
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
                {!change && <div className={styles.forgotPassword}>
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

                        <Button dark="#ff5c5c" light="#ff5c5c" text="RESET PASSWORD" onClick={resetHandler}/>
                    </form>
                    <Link href="/login" className={styles.link}>{"<"} Back to login</Link>
                </div>}
                {change && <div className={styles.forgotPassword}>
                    <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{marginBottom: "15px"}}/>
                    {success && <Alert severity="success" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        Account successfully created!
                    </Alert>}
                    {error && <Alert severity="error" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        {errorMessage}
                    </Alert>}
                    <form>
                        <label>New Password</label>
                        <input type="text" required placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}} style={{marginBottom: 0}}/>

                        <label>Confirm Password</label>
                        <input type="text" required placeholder='Reenter password' value={password2} onChange={(e) => {setPassword2(e.target.value)}}/>

                        <Button dark="#ff5c5c" light="#ff5c5c" text="CHANGE PASSWORD" onClick={newPasswordHandler}/>
                    </form>
                    <Link href="/login" className={styles.link}>{"<"} Back to login</Link>
                </div>}
            </motion.div>
        </main>
    </>
  )
}
