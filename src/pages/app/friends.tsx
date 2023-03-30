import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import styles from "@/styles/app/Friends.module.css";
import { UserContext } from "@/components/Layout";
import api from "@/services/axiosConfig";

import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Dropdown from "@/components/Dropdown";
import { MenuItem } from "@mui/material";
import FriendBox from "@/components/FriendBox";
import SearchIcon from '@mui/icons-material/SearchRounded';
import SearchBar from "@/components/SearchBar";

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
  const [friendsSelected, setFriendsSelected] = useState<boolean>(true);
  const [friends, setFriends] = useState<Array<IFriend>>([]);
  const [requests, setRequests] = useState<Array<IRequest>>([]);
  const [dropdown, setDropdown] = useState<"all" | "online" | "blocked">("all");
  const {user} = useContext(UserContext);

  useEffect(() => {
    getFriends();
    getRequests();
  }, [])

  const addFriend = (id: Number) => {
    api
      .post("/request-friend", { token: user.token, id })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
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
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }
  
  const acceptRequest = (id: Number) => {
    api.post("/accept-request", {token: user.token, id})
    .then((resp) => {
      console.log(resp);
      setRequests(requests.filter(request => request.from.id != id))
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const rejectRequest = (id: Number) => {
    api.post("/accept-request", {token: user.token, id})
    .then((resp) => {
      console.log(resp);
      setRequests(requests.filter(request => request.from.id != id))
    })
    .catch((err) => {
      console.log(err.response.data.message);
    })
  }

  const searchFriends = (val: string) => {
    console.log(val);
  }


  return (
    <>
      <Head>
        <title>Chatterbox | Friends</title>
      </Head>
      <UserContext.Consumer>
        {({ darkTheme, user }) => (
          <main className={styles.main}>
            <Header center>FRIENDS</Header>
            <div className={styles.options}>
              <p
                onClick={() => setFriendsSelected(true)}
                className={styles.optionsTitle}
                style={{
                  borderColor: friendsSelected ? "#ff5c5c" : "",
                  color: friendsSelected ? "#ff5c5c" : "",
                }}
              >
                FRIENDS
              </p>
              <p
                onClick={() => setFriendsSelected(false)}
                className={styles.optionsTitle}
                style={{
                  borderColor: !friendsSelected ? "#ff5c5c" : "",
                  color: !friendsSelected ? "#ff5c5c" : "",
                }}
              >
                REQUESTS
              </p>
            </div>

            <div className={styles.section}>
              {friendsSelected && <div className={styles.friends}>
                <Dropdown title="SHOW FRIENDS" value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
                  [<MenuItem value="all">All</MenuItem>, <MenuItem value="online">Online</MenuItem>, <MenuItem value="blocked">Blocked</MenuItem>]
                </Dropdown>
                <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>

                <p className={styles.sectionTitle} style={{marginTop: "20px"}}>{dropdown.toUpperCase()} - {friends.length}</p>
                {friends.map((friend) => (
                  <FriendBox friend={friend}/>
                ))}
                
              </div>}
        
              {!friendsSelected && <div className={styles.requests}>
                <p className={styles.sectionTitle}>FIND YOUR FRIENDS</p>
                <SearchBar value={searchField} placeholder="Enter username or #ID" onChange={(val) => setSearchField(val)}/>
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
