import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatterbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Image src="/logo.png" alt="logo" height={250} width={250}/>
          <p className={styles.title}>STAY CONNECTED. ANYWHERE. ANYTIME.</p>
          <div className={styles.descContainer}>
            <p className={styles.desc}>Whether you are on your phone, laptop, or other device, Chatterbox allows you to chat with friends or meet new people at any time.</p>
          </div>
          <a className={styles.button} href="https://google.com">Start Your Chatter</a>
        </div>
      </main>
    </>
  )
}
