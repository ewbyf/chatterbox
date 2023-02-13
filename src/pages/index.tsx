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
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.svg}><path fill="#ffffff" fill-opacity="1" d="M0,224L40,229.3C80,235,160,245,240,224C320,203,400,149,480,128C560,107,640,117,720,149.3C800,181,880,235,960,234.7C1040,235,1120,181,1200,154.7C1280,128,1360,128,1400,128L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg> */}
        <div className={styles.container}>
          <img src="/logo.png" alt="logo" className={styles.logo}/>
          
          <p className={styles.title}>STAY CONNECTED. ANYWHERE. ANYTIME.</p>
          <div className={styles.descContainer}>
            <p className={styles.desc}>Whether you are on your phone, laptop, or other device, Chatterbox allows you to chat with friends or meet new people at any time.</p>
          </div>
          <a className={styles.button} onClick={switchPage}>Start Your Chatter</a>
        </div>
        <img src="/illustration.png" className={styles.largeImage}/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.svg}><path fill="#FFFFFF" fill-opacity="1" d="M0,128L30,112C60,96,120,64,180,80C240,96,300,160,360,176C420,192,480,160,540,144C600,128,660,128,720,144C780,160,840,192,900,197.3C960,203,1020,181,1080,170.7C1140,160,1200,160,1260,170.7C1320,181,1380,203,1410,213.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
      </main>
    </>
  )
}
