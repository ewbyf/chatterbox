import Image from "next/image";
import styles from "@/styles/components/Navbar.module.css";
import {
  IoCompassOutline,
  IoPeopleOutline,
  IoChatbubbleEllipsesOutline,
  IoCogOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserContext } from "@/components/Layout";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <UserContext.Consumer>
      {({ darkTheme }) => (
        <motion.nav
          className={styles.nav}
          style={
            darkTheme
              ? { backgroundColor: "#141414" }
              : { backgroundColor: "#ececec" }
          }
          whileHover={{
            width: "200px",
          }}
          initial={{ width: "80px" }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <div className={styles.logo}>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            <p className={styles.expandText} style={{ fontSize: "18.5px" }}>
              ChatterBox
            </p>
          </div>
          <Link
            href="/app"
            className={`${styles.section} ${
              darkTheme ? styles.dark : styles.light
            }`}
          >
            <div style={{ display: "flex" }}>
              <IoCompassOutline
                color={
                  router.pathname.startsWith(`/app/explore`)
                    ? "#ff5c5c"
                    : "gray"
                }
                size={40}
                className={styles.icon}
              />
            </div>
            <p
              className={styles.expandText}
              style={{
                color: router.pathname.startsWith(`/app/explore`)
                  ? "#ff5c5c"
                  : "gray",
              }}
            >
              EXPLORE
            </p>
          </Link>
          <Link
            href="/app/friends"
            className={`${styles.section} ${
              darkTheme ? styles.dark : styles.light
            }`}
          >
            <div style={{ display: "flex" }}>
              <IoPeopleOutline
                color={
                  router.pathname.startsWith(`/app/friends`)
                    ? "#ff5c5c"
                    : "gray"
                }
                size={40}
              />
            </div>
            <p
              className={styles.expandText}
              style={{
                color: router.pathname.startsWith(`/app/friends`)
                  ? "#ff5c5c"
                  : "gray",
              }}
            >
              FRIENDS
            </p>
          </Link>
          <Link
            href="/app/messages"
            className={`${styles.section} ${
              darkTheme ? styles.dark : styles.light
            }`}
          >
            <div style={{ display: "flex" }}>
              <IoChatbubbleEllipsesOutline
                color={
                  router.pathname.startsWith(`/app/messages`)
                    ? "#ff5c5c"
                    : "gray"
                }
                size={40}
              />
            </div>
            <p
              className={styles.expandText}
              style={{
                color: router.pathname.startsWith(`/app/messages`)
                  ? "#ff5c5c"
                  : "gray",
              }}
            >
              MESSAGES
            </p>
          </Link>
          <Link
            href="/app/settings"
            className={`${styles.section} ${
              darkTheme ? styles.dark : styles.light
            } ${styles.settings}`}
          >
            <IoCogOutline
              color={
                router.pathname.startsWith(`/app/settings`) ? "#ff5c5c" : "gray"
              }
              size={40}
            />
            <p
              className={styles.expandText}
              style={{
                color: router.pathname.startsWith(`/app/settings`)
                  ? "#ff5c5c"
                  : "gray",
              }}
            >
              SETTINGS
            </p>
          </Link>
        </motion.nav>
      )}
    </UserContext.Consumer>
  );
};

export default Navbar;
