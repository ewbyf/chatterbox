import api from "@/services/axiosConfig";
import { IFriend, IUser } from "../interfaces";
import useMediaQuery from '@mui/material/useMediaQuery';

interface StatusObj {
    id: number;
    status: "ONLINE" | "OFFLINE" | "IDLE" | "DO_NOT_DISTURB";
}

export const statusChange = async(friends: IFriend[], user: IUser, setFriends: React.Dispatch<React.SetStateAction<IFriend[]>>, obj: StatusObj) => {
    if (friends.length === 0) {
        await api.get(`/friends?token=${user.token}`)
        .then((resp) => {
          let temp: IFriend[] = resp.data;
          const index = temp.findIndex(friend => friend.id === obj.id);
          if (index > -1) {
            temp[index].status = obj.status;
            setFriends([...temp]);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
      }
      else {
        const index = friends.findIndex(friend => friend.id === obj.id);
        if (index > -1) {
          let temp = friends;
          temp[index].status = obj.status;
          setFriends([...temp]);
        }
      }
}

export const statusChangeMessages = async(friends: IFriend[], user: IUser, setFriends: React.Dispatch<React.SetStateAction<IFriend[]>>, obj: StatusObj, selectedFriend: IFriend | undefined, setSelectedFriend: React.Dispatch<React.SetStateAction<IFriend | undefined>>, query: string[]|string|undefined, mobile: boolean) => {
    if (friends.length === 0) {
        await api.get(`/friends?token=${user.token}`)
        .then((resp) => {
          let temp: IFriend[] = resp.data;
          const index = temp.findIndex(friend => friend.id === obj.id);
          if (index > -1) {
            temp[index].status = obj.status;
            setFriends([...temp]);
          }
          if (query) {
            setSelectedFriend(resp.data.find((friend: IFriend) => friend.id.toString() === query));
          }
          else if (!mobile) {
            setSelectedFriend(resp.data[0]);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }
    else {
        const index = friends.findIndex(friend => friend.id === obj.id);
        if (index > -1) {
          let temp = friends;
          temp[index].status = obj.status;
          setFriends([...temp]);
        }
        if (selectedFriend!.id === obj.id) {
            let temp = selectedFriend!;
            temp.status = obj.status;
            setSelectedFriend(temp);
        }
    }
}