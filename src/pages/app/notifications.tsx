import styles from "@/styles/components/NotificationBell.module.css";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";
import Header from "@/components/Header";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const Notifications = () => {
  const mobile = useMediaQuery('(max-width: 800px)');

  const [notifications, setNotifications] = useState([
    { message: "sdjsadjasdjas" },
    { message: "testeteseaw" },
  ]);

  useEffect(() => {
    if (!mobile) {
      Router.push({
        pathname: "/app/explore",
      });
    }
  }, [])
  
  if (mobile) {
    return (
      <UserContext.Consumer>
        {({ darkTheme }) => (
          <>
              <Header center>NOTIFICATIONS</Header>
              {notifications.map((notification) => (
                <>      
                  <div key={notification.message}>
                      <MenuItem
                      onClick={() => Router.push({ pathname: "/app/notifications" })}
                      style={{ height: "75px" }}
                      >
                      <ListItemIcon></ListItemIcon>
                      {notification.message}
                      </MenuItem>
                  </div>
                  <Divider sx={{ bgcolor: darkTheme ? "#2E2E2E" : "" }} />
                  </>
              ))}
          </>
        )}
      </UserContext.Consumer>
    );
  }
};

export default Notifications;
