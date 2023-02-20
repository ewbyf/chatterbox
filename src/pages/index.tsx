import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Router from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const switchPage = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      Router.push({
        pathname: "/app",
      });
    } else {
      Router.push({
        pathname: "/login",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Chatterbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="logo" width={50} height={50}/>
            <p>Chatterbox</p>
          </div>
          <motion.p
            initial={{ opacity: 0, x: "-100vh" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 75 }}
            className={styles.title}
            style={{ color: "#ff5c5c" }}
          >
            STAY CONNECTED.
          </motion.p>
          <div style={{ display: "flex" }}>
            <motion.p
              initial={{ opacity: 0, x: "-100vh" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", delay: 0.75 }}
              className={styles.title}
              style={{ color: "#37A9FF" }}
            >
              ANYWHERE.&nbsp;
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: "100vh" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", delay: 1.25 }}
              className={styles.title}
              style={{ color: "#25CA88" }}
            >
              ANYTIME.
            </motion.p>
          </div>
          <div className={styles.descContainer}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 1.75 }}
              className={styles.desc}
            >
              Whether you are on your phone, laptop, or other device, Chatterbox
              allows you to chat with friends or meet new people at any time.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: .75, delay: 2.25 }}
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className={styles.button}
            onClick={switchPage}
          >
            Start Your Chatter
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 1, width: 0, minWidth: 0 }}
          animate={{ opacity: 1, width: "50%" }}
          transition={{ duration: 1 }}
          className={styles.right}
        ></motion.div>
      </main>
    </>
  );
}
