import { Badge } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    children?: JSX.Element;
    status: "online" | "dnd" | "invisible" | "idle";
  }

const Status = ({ children, status }: Props) => {
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        switch(status) {
            case "online":
                setColor("#05B770");
                break;
            case "dnd":
                setColor("#ff5c5c");
                break;
            case "idle":
                setColor("#F7C600");
                break;
            default:
                setColor("gray");
                break;
        }
    }, [])


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
                    border: "black 2.5px solid"
                }
            }}
        >
            {children}
        </Badge>
    );
}
 
export default Status;