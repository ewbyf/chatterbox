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
import { useState } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([
    { message: "sdjsadjasdjas" },
    { message: "testeteseaw" },
  ]);
  const open = Boolean(anchorEl);

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
            className={`${styles.bellContainer} ${
              darkTheme ? styles.dark : styles.light
            }`}
            onClick={openNotifications}
          >
            <Tooltip title="Notifications" arrow>
              <Badge color="error" variant="dot" overlap="circular">
                <IoNotifications size={25} className={styles.bellIcon} />
              </Badge>
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
            {notifications.map((notification) => (
              <div key={notification.message}>      
                  <Divider sx={{ bgcolor: darkTheme ? "#2E2E2E" : "", margin: 0 }}/>
                  <MenuItem
                    onClick={() => Router.push({ pathname: "/app/settings" })}
                    sx={{
                      "&:hover": { backgroundColor: darkTheme ? "#181818" : "" },
                    }}
                    style={{ height: "75px" }}
                  >
                    <ListItemIcon></ListItemIcon>
                    {notification.message}
                  </MenuItem>
              </div>
            ))}
          </Menu>
        </>
      )}
    </UserContext.Consumer>
  );
};

export default NotificationBell;
