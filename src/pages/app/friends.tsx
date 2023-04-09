import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import styles from "@/styles/app/Friends.module.css";
import { UserContext, SocketContext } from "@/components/Layout";
import api from "@/services/axiosConfig";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Dropdown from "@/components/Dropdown";
import { MenuItem } from "@mui/material";
import FriendBox from "@/components/FriendBox";
import SearchBar from "@/components/SearchBar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IRequest {
  from: {
    avatar: string;
    id: Number;
    username: string;
  }
  timestamp: string;
}

interface IFriend {
  avatar: string;
  id: Number;
  username: string;
  channelId: Number;
}

export default function Friends() {
  const [searchField, setSearchField] = useState<string>("");
  const [friendsSelected, setFriendsSelected] = useState<number>(1);
  const [friends, setFriends] = useState<Array<IFriend>>([]);
  const [requests, setRequests] = useState<Array<IRequest>>([]);
  const [dropdown, setDropdown] = useState<"all" | "online" | "blocked">("all");
  const [init, setInit] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {user} = useContext(UserContext);
  const {socket} = useContext(SocketContext);
  const mobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    const print = (e: MessageEvent) => {
      console.log(e);
    }
    socket?.addEventListener('message', print)

    return () => {
      socket?.removeEventListener('message', print);
    }
  }, []);


  const tabChange = (event: React.SyntheticEvent, newValue: number) => {
    setFriendsSelected(newValue);
  };

  useEffect(() => {
    getFriends();
    getRequests();
  }, [])

  const addFriend = (field: string) => {
    if (field.charAt(0) === "#") {
      field = field.replace("#", "");
      api
      .post("/request-friend", { token: user.token, id: Number(field) })
      .then((resp) => {
        setSuccess(true);
        setError(false);
        setSearchField('');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setError(true);
        setSuccess(false);
      });
    }
    else {
      api
      .post("/request-friend", { token: user.token, username: field })
      .then((resp) => {
        setSuccess(true);
        setError(false);
        setSearchField('');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setError(true);
        setSuccess(false);
      });
    }
  };

  const getFriends = () => {
    api.get(`/friends?token=${user.token}`)
    .then((resp) => {
      setFriends(resp.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const getRequests = () => {
    api.get(`/friend-requests?token=${user.token}`)
    .then((resp) => {
      setRequests(resp.data);
      setInit(false);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }
  
  const acceptRequest = (id: Number) => {
    api.post("/accept-request", {token: user.token, id})
    .then((resp) => {
      setRequests(requests!.filter(request => request.from.id != id));
      setFriends([...friends, resp.data])
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const rejectRequest = (id: Number) => {
    api.post("/accept-request", {token: user.token, id})
    .then((resp) => {
      setRequests(requests!.filter(request => request.from.id != id))
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const searchFriends = (val: string) => {
    console.log(val);
  }

  if (init) return null;

  return (
    <>
      <Head>
        <title>Chatterbox | Friends</title>
      </Head>
      <UserContext.Consumer>
        {({ darkTheme, user }) => (
          <main className={styles.main}>
            <Header center>
            <div className={styles.options}>
              <Tabs
                  value={friendsSelected}
                  onChange={tabChange}
                  sx={{  '& .MuiTabs-indicator': {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#ff5c5c',
                  },
                  }}
                >
                  <Tab value={1} label="FRIENDS" 
                  sx={{
                    color: "gray",
                    fontFamily: "MarkPro",
                    fontSize: "18px",
                    marginRight: "50px",
                    '&.Mui-selected': {
                      color: '#ff5c5c',
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                  }}/>
                  <Tab value={2} label="REQUESTS" sx={{
                    color: "gray",
                    fontFamily: "MarkPro",
                    fontSize: "18px",
                    '&.Mui-selected': {
                      color: '#ff5c5c',
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                  }} />
                </Tabs>
            </div>
            </Header>
            {!mobile && <div className={styles.options}>
              <Tabs
                  value={friendsSelected}
                  onChange={tabChange}
                  sx={{  '& .MuiTabs-indicator': {
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#ff5c5c',
                  },
                  }}
                >
                  <Tab value={1} label="FRIENDS" 
                  sx={{
                    color: "gray",
                    fontFamily: "MarkPro",
                    fontSize: "18px",
                    marginRight: "50px",
                    '&.Mui-selected': {
                      color: '#ff5c5c',
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                  }}/>
                  <Tab value={2} label="REQUESTS" sx={{
                    color: "gray",
                    fontFamily: "MarkPro",
                    fontSize: "18px",
                    '&.Mui-selected': {
                      color: '#ff5c5c',
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: 'rgba(100, 95, 228, 0.32)',
                    },
                  }} />
                </Tabs>
            </div>}

            <div className={styles.section} style={{padding: mobile ? "0px" : "30px 0px"}}>
              {friendsSelected === 1 && 
              <div className={styles.friends}>
                <Dropdown title="SHOW FRIENDS" value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
                  [<MenuItem value="all">All</MenuItem>, <MenuItem value="online">Online</MenuItem>, <MenuItem value="blocked">Blocked</MenuItem>]
                </Dropdown>
                <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
                  <p className={styles.sectionTitle} style={{marginTop: "20px"}}>{dropdown.toUpperCase()} - {friends.length}</p>
                  {friends.map((friend) => (
                    <FriendBox friend={friend} onClick={() => Router.push({pathname: "/app/messages", query: {selected: friend.id.toString()}})}/>
                  ))}
              </div>}
        
              {friendsSelected === 2 && <div className={styles.requests}>
                <p className={styles.sectionTitle}>FIND YOUR FRIENDS</p>
                {success && <p style={{color: "#5CC78E", fontWeight: "bold", fontSize: "17px"}}>
                  Friend request succesfully sent!
                </p>}
                {error && <p style={{color: "#ff5c5c", fontWeight: "bold", fontSize: "17px"}}>
                  {errorMessage}
                </p>}
                <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
                <Button text="ADD FRIEND" dark="#ff5c5c" light="#ff5c5c" icon={<PersonAddIcon  fontSize="small" sx={{ color: darkTheme ? "white" : "black" }}/>} onClick={() => addFriend(searchField)}/>
                <p className={styles.sectionTitle} style={{marginTop: "20px"}}>RECEIVED REQUESTS</p>
                {requests.map((request) => (
                  <FriendBox friend={request.from} request accept={acceptRequest} reject={rejectRequest}/>
                ))}
                {requests.length === 0 && <p>You have not received any friend requests</p>}

                {/* <div>
                  <p className={styles.sectionTitle}>SENT</p>
                  <p>You have not sent any friend requests</p>
                </div> */}
              </div>}
            </div>
          </main>
        )}
      </UserContext.Consumer>
    </>
  );
}
