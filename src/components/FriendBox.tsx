import styles from "@/styles/components/FriendBox.module.css";
import { UserContext } from "@/components/Layout";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from '@mui/icons-material/ClearRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';

interface IFriend {
    avatar: string;
    id: Number;
    username: string;
    channelId?: Number;
}

interface Props {
    friend: IFriend;
    request?: boolean;
    accept?: (id: Number) => any;
    reject?: (id: Number) => any;
}

const FriendBox = ({ friend, request, accept, reject }: Props) => {
    return (
        <UserContext.Consumer>
            {({ darkTheme }) => (
                <div className={styles.box}>
                    <Avatar sx={{ width: 40, height: 40 }} src={friend.avatar} />
                    <p>{friend.username}</p>
                    <p className={styles.id} style={{backgroundColor: (darkTheme ? "rgb(36, 36, 36)" : "rgb(212, 212, 212)"), color: (darkTheme ? "#868686" : "#5d5d5d")}}>#{friend.id.toString()}</p>
                    {request && 
                    <div className={styles.icons}>
                        <Tooltip title="Reject" arrow>
                            <div onClick={reject ? () => reject(friend.id) : undefined} className={`${styles.iconCircle} ${styles.x}`}>
                                <CancelIcon fontSize="medium"/>
                            </div>
                        </Tooltip>
                        <Tooltip title="Accept" arrow>
                            <div onClick={accept ? () => accept(friend.id) : undefined} className={`${styles.iconCircle} ${styles.check}`}>
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