/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/services/axiosConfig';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@/components/Button';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const router = useRouter();

    const mobile = useMediaQuery('(max-width: 700px)');

    useEffect(() => {
        if (router.query.keyword === 'success') {
            setSuccess(true);
        }
        const token = localStorage.getItem('userToken');
        if (token) {
            Router.push({
                pathname: '/app'
            });
        }
    }, []);

    const loginHandler = (): void => {
        api.post('login', {
            email,
            password
        })
            .then((resp) => {
                localStorage.setItem('userToken', resp.data.token);
                Router.push({
                    pathname: '/app/explore'
                });
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                setError(true);
                setSuccess(false);
            });
    };

    return (
        <>
            <Head>
                <title>Chatterbox | Login</title>
            </Head>
            <main className={styles.main}>
                <motion.div
                    initial={{ opacity: 0, x: '100vh' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '-100vh' }}
                    transition={{ type: 'tween', duration: 0.5 }}
                    className={styles.container}
                >
                    <div className={styles.login}>
                        <Image src="/logo.png" alt="logo" width={mobile ? 85 : 100} height={mobile ? 85 : 100} style={{ marginBottom: '15px' }} />
                        {success && (
                            <Alert severity="success" sx={{ fontSize: mobile ? '13px' : '15px', alignItems: 'center' }}>
                                Account successfully created!
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
                                type="email"
                                required
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Link href="/resetpassword" className={`${styles.link} ${styles.forgot}`}>
                                Forgot password?
                            </Link>
                            <Button dark="#ff5c5c" light="#ff5c5c" text="LOG IN" submit onClick={loginHandler} />
                        </form>
                        <p className={styles.option}>
                            Don't have an account?{' '}
                            <Link href="/signup" className={styles.link}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>
        </>
    );
}
