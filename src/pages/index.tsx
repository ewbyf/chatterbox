import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Router from 'next/router';
import { motion } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import { imgixLoader } from '@/utils/ImgixLoader';

export default function Home() {
    const mobile = useMediaQuery('(max-width: 999px)');

    const switchPage = (): void => {
        const token: string | null = localStorage.getItem('userToken');
        if (token) {
            Router.push({
                pathname: '/app/explore'
            });
        } else {
            Router.push({
                pathname: '/login'
            });
        }
    };


    return (
        <>
            <Head>
                <title>Chatterbox</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Image loader={imgixLoader} src="/logo.png" alt="logo" width={mobile ? 40 : 50} height={mobile ? 40 : 50} />
                        <p>Chatterbox</p>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: '-100vh' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 75 }}
                        className={styles.title}
                        style={{ color: '#ff5c5c' }}
                    >
                        STAY CONNECTED.
                    </motion.p>
                    <div style={{ display: 'flex' }}>
                        <motion.p
                            initial={{ opacity: 0, x: '-100vh' }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'tween', delay: 0.75 }}
                            className={styles.title}
                            style={{ color: '#37A9FF' }}
                        >
                            ANYWHERE.&nbsp;
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: '100vh' }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'tween', delay: 1.25 }}
                            className={styles.title}
                            style={{ color: '#25CA88' }}
                        >
                            ANYTIME.
                        </motion.p>
                    </div>
                    <div className={styles.descContainer}>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, delay: 1.75 }} className={styles.desc}>
                            Whether you are on your phone, laptop, or other device, Chatterbox allows you to chat with friends or meet new people at any time.
                        </motion.p>
                    </div>
                    <motion.a
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        transition={{ duration: 0.75, delay: 2.25 }}
                        whileHover={{
                            scale: 1.1,
                            transition: { type: 'spring', stiffness: 400, damping: 10 }
                        }}
                        className={styles.button}
                        onClick={switchPage}
                    >
                        Start Your Chatter
                    </motion.a>
                </div>
                <motion.div
                    initial={{ opacity: 1, width: 0, minWidth: 0 }}
                    animate={{ opacity: 1, width: mobile ? '100%' : '50%' }}
                    transition={{ duration: 1 }}
                    className={styles.right}
                >
                    {mobile && <p className={styles.rightTitle}>Chat with friends easily</p>}
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        src="https://chatterbox.imgix.net/graphic.png"
                        alt="graphic"
                        width={mobile ? 550 : 750}
                        height={mobile ? 550 : 750}
                    />
                </motion.div>
            </main>
        </>
    );
}
