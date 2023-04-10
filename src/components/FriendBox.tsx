import styles from "@/styles/components/FriendBox.module.css";
import { UserContext } from "@/components/Layout";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from '@mui/icons-material/ClearRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';
import Status from "./Status";

interface IFriend {
    avatar: string;
    id: Number;
    username: string;
    channelId?: Number;
    status?: "ONLINE" | "OFFLINE" | "IDLE" | "DO_NOT_DISTURB";
}

interface Props {
    friend: IFriend;
    request?: boolean;
    notSelected?: boolean;
    accept?: (id: Number) => any;
    reject?: (id: Number) => any;
    onClick?: () => any;
}

const FriendBox = ({ friend, request, notSelected, accept, reject, onClick }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div className={`${styles.box} ${!request ? (darkTheme ? styles.hoverEffectDark : styles.hoverEffectLight) : null} ${notSelected ? null : styles.selected}`} onClick={onClick}>
                    {friend.status && <Status bg={darkTheme ? "#181818" : "white"} status={friend.status}>
                        <Avatar sx={{ width: 35, height: 35 }} src={friend.avatar} />
                    </Status>}
                    {!friend.status && <Avatar sx={{ width: 35, height: 35 }} src={friend.avatar} />}
                    
                    <p>{friend.username}</p>
                    <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>#{friend.id.toString()}</p>
                    {request && 
                    <div className={styles.icons}>
                        <Tooltip title="Reject" arrow>
                            <div onClick={reject ? () => reject(friend.id) : undefined} className={`${styles.iconCircle} ${darkTheme ? styles.xDark : styles.xLight}`}>
                                <CancelIcon fontSize="medium"/>
                            </div>
                        </Tooltip>
                        <Tooltip title="Accept" arrow>
                            <div onClick={accept ? () => accept(friend.id) : undefined} className={`${styles.iconCircle} ${darkTheme ? styles.checkDark : styles.checkLight}`}>
                                <CheckIcon fontSize="medium"/>
                            </div>
                        </Tooltip>
                        
                    </div>}
                </div>
            )}
        </UserContext.Consumer>
    ); 
}
 
export default FriendBox;