import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";
import Header from "@/components/Header";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import InboxIcon from '@mui/icons-material/Inbox';

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
              {notifications.length === 0 &&   
                <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px", padding: "0px 30px"}}>
                  <InboxIcon style={{fontSize: "60px"}}/>
                  <p style={{fontSize: "20px"}}>You have no notifications</p>
                </div>
              }
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
