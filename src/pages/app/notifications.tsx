import styles from "@/styles/components/NotificationBell.module.css";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";
import Header from "@/components/Header";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const Notifications = () => {
  const {notifications} = useContext(UserContext);
  const mobile = useMediaQuery('(max-width: 800px)');

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
              
              </>
              ))}
          </>
        )}
      </UserContext.Consumer>
    );
  }
};

export default Notifications;
