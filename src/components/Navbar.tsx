import Image from 'next/image'
import styles from '@/styles/components/Navbar.module.css'
import { IoCompassOutline, IoPeopleOutline, IoChatbubbleEllipsesOutline, IoCogOutline } from "react-icons/io5";
import { motion } from "framer-motion"
import Link from 'next/link'

const Navbar = () => {
    return (
        <motion.nav className={styles.nav} 
            whileHover={{
                width: "200px"
            }}
            initial={{ width: "90px"}}
            transition={{ type: "tween", duration: .2 }}
        >
            <div className={styles.logo}>
                <Image src="/logo.png" alt="logo" height={40} width={40}/>
                <p className={styles.expandText} style={{fontSize: "18.5px"}}>ChatterBox</p>
            </div>
            <Link href="/app" className={styles.section}>
                <div style={{display: "flex"}}>
                    <IoCompassOutline color='#ff5c5c' size={40} className={styles.icon}/>
                </div>
                <p className={styles.expandText}>EXPLORE</p>
            </Link>
            <Link href="/app/friends" className={styles.section}>
                <div style={{display: "flex"}}>
                    <IoPeopleOutline color='#ff5c5c' size={40}/>
                </div>
                <p className={styles.expandText}>FRIENDS</p>
            </Link>
            <Link href="/app/messages" className={styles.section}>
                <div style={{display: "flex"}}>
                    <IoChatbubbleEllipsesOutline color='#ff5c5c' size={40}/>
                </div>
                <p className={styles.expandText}>MESSAGES</p>
            </Link>
            <Link href="/app/settings" className={`${styles.section} ${styles.settings}`}>
                <IoCogOutline color='#ff5c5c' size={40}/>
                <p className={styles.expandText}>SETTINGS</p>
            </Link>
        </motion.nav>
    );
}
 
export default Navbar;