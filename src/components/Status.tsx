import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { IStatus } from "@/interfaces";

interface Props {
    children?: JSX.Element;
    status: IStatus;
    bg: string;
  }

const Status = ({ children, status, bg }: Props) => {
    const [color, setColor] = useState<string>('gray');

    useEffect(() => {
        switch(status) {
            case "ONLINE":
                setColor("#05B770");
                break;
            case "DO_NOT_DISTURB":
                setColor("#ff5c5c");
                break;
            case "IDLE":
                setColor("#F7C600");
                break;
            default:
                setColor("gray");
                break;
        }
    }, [status])


    return (
        <Badge
            overlap="circular"
            badgeContent=" "  
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            sx={{
                '.MuiBadge-badge': {
                    height: "15px",
                    width: "15px",
                    minWidth: 0,
                    padding: 0,
                    backgroundColor: color,
                    border: `${bg} 2.5px solid`
                }
            }}
        >
            {children}
        </Badge>
    );
}
 
export default Status;