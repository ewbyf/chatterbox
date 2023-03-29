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
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from "@mui/material/Avatar";
import { IoNotifications } from "react-icons/io5";
import { Badge } from "@mui/material";
import Status from "./Status";

const Navbar = () => {
  const router = useRouter();
  const mobile = useMediaQuery('(max-width: 800px)');

  if (mobile) {
    return (
      <UserContext.Consumer>
        {({ darkTheme, user }) => (
          <nav
            className={styles.navMobile}
            style={
              darkTheme
                ? { backgroundColor: "#141414" }
                : { backgroundColor: "#ececec" }
            }
          >
            <Link
              href="/app/explore"
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
                  size={35}
                  className={styles.icon}
                />
              </div>
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
                  size={35}
                />
              </div>
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
                  size={35}
                />
              </div>
            </Link>
            <Link
              href="/app/notifications"
              className={`${styles.section} ${
                darkTheme ? styles.dark : styles.light
              }`}
            >             
              <Badge color="error" variant="dot" overlap="circular">
                <IoNotifications 
                color={
                  router.pathname.startsWith(`/app/notifications`)
                    ? "#ff5c5c"
                    : "gray"
                } size={35}/>
              </Badge>
            </Link>
            <Link
              href="/app/account"
              className={`${styles.section} ${
                darkTheme ? styles.dark : styles.light
              }`}
            >
              <Avatar sx={{ width: 35, height: 35 }} src={user.avatar} />
            </Link>
          </nav>
        )}
      </UserContext.Consumer>
    )
  }

  return (
    <UserContext.Consumer>
      {({ darkTheme, user }) => (
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
            href="/app/explore "
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
            href="/app/account"
            className={`${styles.section} ${
              darkTheme ? styles.dark : styles.light
            } ${styles.settings}`}
          >
            <Status status="online">
              <Avatar sx={{ width: 40, height: 40 }} src={user.avatar} />
            </Status>
            <p
              className={styles.expandText}
              style={{
                color: router.pathname.startsWith(`/app/account`)
                  ? "#ff5c5c"
                  : "gray",
                
              }}
            >
              ACCOUNT
            </p>
          </Link>
        </motion.nav>
      )}
    </UserContext.Consumer>
  );
};

export default Navbar;
