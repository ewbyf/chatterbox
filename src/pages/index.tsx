import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Router from 'next/router';

export default function Home() {

  const switchPage = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      Router.push({
        pathname: "/app",
      });
    }
    else {
      Router.push({
        pathname: "/login"
      });
    }
  }

  return (
    <>
      <Head>
        <title>Chatterbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          {/* <img src="/logo.png" alt="logo" className={styles.logo}/> */}

          <p className={styles.title}><span style={{color: '#ff5c5c'}}>STAY CONNECTED.</span> <br/><span style={{color: '#37A9FF'}}>ANYWHERE.</span> <span style={{color: '#25CA88'}}>ANYTIME.</span></p>
          <div className={styles.descContainer}>
            <p className={styles.desc}>Whether you are on your phone, laptop, or other device, Chatterbox allows you to chat with friends or meet new people at any time.</p>
          </div>
          <a className={styles.button} onClick={switchPage}>Start Your Chatter</a>
        </div>
        <div className={styles.right}>
        </div>
      </main>
    </>
  )
}
