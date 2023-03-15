/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Signup.module.css'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors'
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import api from '@/services/axiosConfig'

export default function Signup() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);

    const mobile = useMediaQuery('(max-width: 700px)');

    const signupHandler = (): void => {
        if (!checked) {
            setErrorMessage("You must agree to receiving emails to sign up");
            setError(true);
            setSuccess(false);
            return;
        }

        api.post("signup", {
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
            setChecked(false);
        })
        .catch((err): void => {
            setErrorMessage(err.response.data.message);
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
                    <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{marginBottom: "15px"}}/>
                    {success && <Alert severity="success" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
                        Account successfully created!
                    </Alert>}
                    {error && <Alert severity="error" sx={{fontSize: mobile ? "13px" : "15px", alignItems: "center"}}>
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
                        <FormControlLabel
                            style={{flexDirection: "row", marginTop: mobile ? "15px" : "20px", marginRight: "0px"}}
                            control={<Checkbox required checked={checked} onChange={() => setChecked(!checked)} sx={{'&.Mui-checked': {color: red[400]}}}/>}
                            label={<Typography style={{fontSize: mobile ? "13px" : "14px"}}>I agree to receive emails regarding my account details<span style={{color: "red"}}>*</span></Typography>}
                            labelPlacement="end"
                            />
                        <a className={styles.signupButton} onClick={signupHandler}>SIGN UP</a>
                    </form>
                    <p className={styles.option}>Already have an account? <Link href="/login" className={styles.link}>Log in</Link></p>
                </div>
            </motion.div>
        </main>
    </>
  )
}
