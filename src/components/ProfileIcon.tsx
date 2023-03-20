import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import Router from "next/router";
import { UserContext } from "@/components/Layout";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    Router.push({
      pathname: "/login",
    });
  };

  return (
    <UserContext.Consumer>
      {({ darkTheme }) => (
        <>
          <Tooltip title="Account" arrow>
            <IconButton
              style={{ position: "absolute", right: 20, top: 25 }}
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <UserContext.Consumer>
                {({ user }) => (
                  <Avatar sx={{ width: 32, height: 32 }} src={user.avatar} />
                )}
              </UserContext.Consumer>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
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
                borderRadius: "15px",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => Router.push({ pathname: "/app/profile" })}
              sx={{
                "&:hover": { backgroundColor: darkTheme ? "#181818" : "" },
              }}
            >
              <Avatar /> Profile
            </MenuItem>
            <Divider sx={{ bgcolor: darkTheme ? "lightgrey" : "" }} />
            <MenuItem
              onClick={() => Router.push({ pathname: "/app/settings" })}
              sx={{
                "&:hover": { backgroundColor: darkTheme ? "#181818" : "" },
              }}
            >
              <ListItemIcon>
                <Settings
                  fontSize="small"
                  sx={{ color: darkTheme ? "lightgrey" : "" }}
                />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={logout}
              sx={{
                "&:hover": { backgroundColor: darkTheme ? "#181818" : "" },
              }}
            >
              <ListItemIcon>
                <Logout
                  fontSize="small"
                  sx={{ color: darkTheme ? "lightgrey" : "" }}
                />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </UserContext.Consumer>
  );
}
