/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/ResetPassword.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@/components/Button';
import api from '@/services/axiosConfig';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const mobile = useMediaQuery('(max-width: 700px)');
    const nonce = window.location.search.replace('?nonce=', '');

    useEffect(() => {
        if (nonce) {
            api.get('/valid-nonce', {
                params: {
                    nonce
                }
            })
                .then((resp) => {
                    setChange(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const resetHandler = () => {
        api.post('/reset-password', {
            email
        })
            .then((resp) => {
                setSuccess(true);
                setEmail('');
            })
            .catch((err) => {
                setError(true);
                setErrorMessage('Please enter a valid email');
            });
    };

    const newPasswordHandler = () => {
        if (password === password2) {
            if (password === '') {
                setError(true);
                setErrorMessage('Please enter a password');
            } else {
                api.post('/set-password', {
                    nonce,
                    password
                })
                    .then((resp) => {
                        setSuccess(true);
                        setError(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            setError(true);
            setErrorMessage('Passwords do not match');
        }
    };

    return (
        <>
            <Head>
                <title>Chatterbox | Reset Password</title>
            </Head>
            <main className={styles.main}>
                <motion.div
                    initial={{ opacity: 0, x: '100vh' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '-100vh' }}
                    transition={{ type: 'tween', duration: 0.5 }}
                    className={styles.container}
                >
                    {!change && (
                        <div className={styles.forgotPassword}>
                            <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{ marginBottom: '15px' }} />
                            {success && (
                                <Alert severity="success" sx={{ fontSize: mobile ? '13px' : '15px', alignItems: 'center' }}>
                                    Password reset email has been sent!
                                </Alert>
                            )}
                            {error && (
                                <Alert severity="error" sx={{ fontSize: mobile ? '13px' : '15px', alignItems: 'center' }}>
                                    {errorMessage}
                                </Alert>
                            )}
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label>Email</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />

                                <Button dark="#ff5c5c" light="#ff5c5c" text="RESET PASSWORD" submit onClick={resetHandler} />
                            </form>
                            <Link href="/login" className={styles.link}>
                                {'<'} Back to login
                            </Link>
                        </div>
                    )}
                    {change && (
                        <div className={styles.forgotPassword}>
                            <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{ marginBottom: '15px' }} />
                            {success && (
                                <Alert severity="success" sx={{ fontSize: mobile ? '13px' : '15px', alignItems: 'center', maxWidth: '350px' }}>
                                    Password successfully reset! You may now close this window and log in.
                                </Alert>
                            )}
                            {error && (
                                <Alert severity="error" sx={{ fontSize: mobile ? '13px' : '15px', alignItems: 'center' }}>
                                    {errorMessage}
                                </Alert>
                            )}
                            {!success && (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        style={{ marginBottom: 0 }}
                                    />

                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Reenter password"
                                        value={password2}
                                        onChange={(e) => {
                                            setPassword2(e.target.value);
                                        }}
                                    />

                                    <Button dark="#ff5c5c" light="#ff5c5c" text="CHANGE PASSWORD" submit onClick={newPasswordHandler} />
                                </form>
                            )}
                        </div>
                    )}
                </motion.div>
            </main>
        </>
    );
}
