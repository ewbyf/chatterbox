import Image from 'next/image'
import { IoNotifications } from "react-icons/io5";
import { motion } from "framer-motion"
import { Badge } from '@mui/material';
import { red } from '@mui/material/colors';
import styles from "@/styles/components/NotificationBell.module.css";
import Tooltip from '@mui/material/Tooltip';

interface Props {
    theme: boolean
}

const openNotifications = (): void => {

}

const NotificationBell = ({ theme }: Props) => {
    return (
        <div className={`${styles.bellContainer} ${theme ? styles.dark : styles.light}`} onClick={openNotifications}>
            <Tooltip title="Notifications" arrow placement="left">
                <Badge color="error" variant="dot" overlap="circular">
                    <IoNotifications size={25} className={styles.bellIcon}/>
                </Badge>
            </Tooltip>
        </div>
    );
}
 
export default NotificationBell;