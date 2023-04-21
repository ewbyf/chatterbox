import { IoNotifications } from "react-icons/io5";
import { Badge } from "@mui/material";
import styles from "@/styles/components/NotificationBell.module.css";
import Tooltip from "@mui/material/Tooltip";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";
import { Notification } from "@/interfaces";
import InboxIcon from '@mui/icons-material/Inbox';

const NotificationBell = ({notificationsList}: {notificationsList: Notification[]}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setNotifications(notificationsList);
  }, [notificationsList])

  const openNotifications = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <UserContext.Consumer>
      {({ darkTheme }) => (
        <>
          <div
            className={styles.bellContainer}
            onClick={openNotifications}
          >
            <Tooltip title="Notifications" arrow>
              <>
                {notifications.length > 0 && <Badge color="error" variant="dot" overlap="circular">
                  <IoNotifications size={25} className={styles.bellIcon} />
                </Badge>}
                {
                  notifications.length == 0 && <IoNotifications size={25} className={styles.bellIcon} />
                }
              </>
            </Tooltip>
          </div>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: darkTheme ? "rgb(29, 29, 29)" : "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
                bgcolor: darkTheme ? "rgb(29, 29, 29)" : "",
                color: darkTheme ? "lightgrey" : "",
                width: "400px",
                borderRadius: "20px",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div className={styles.titleContainer}>
              <p className={styles.titleText}>NOTIFICATIONS</p>
              <CloseIcon
                className={styles.close}
                onClick={handleClose}
                sx={{ color: darkTheme ? "lightgrey" : "grey" }}
              />
            </div>
            {notifications.length === 0 &&
              <div>      
                <Divider sx={{ bgcolor: darkTheme ? "#2E2E2E" : "", margin: 0 }}/>
                <div style={{height: "75px", display: "flex", alignItems: "center", gap: "15px", padding: "0px 30px"}}>
                  <InboxIcon style={{fontSize: "26px"}}/>
                  <p style={{fontSize: "18px"}}>You have no notifications</p>
                </div>
            </div>
            }
            {notifications.slice().reverse().map((notification) => (
              <div>
                {notification.message && 
                  <div key={notification.message.id}>      
                    <Divider sx={{ bgcolor: darkTheme ? "#2E2E2E" : "", margin: 0 }}/>
                    <MenuItem
                      onClick={() => Router.push({ pathname: "/app/settings" })}
                      sx={{
                        "&:hover": { backgroundColor: darkTheme ? "#181818" : "" },
                      }}
                      style={{ height: "75px" }}
                    >
                      <ListItemIcon></ListItemIcon>
                      {notification.message.content}
                    </MenuItem>
                  </div>
                }
              </div>
            ))}
          </Menu>
        </>
      )}
    </UserContext.Consumer>
  );
};

export default NotificationBell;
