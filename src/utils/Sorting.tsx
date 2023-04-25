import { IFriend } from "@/interfaces";

export const sortFriends = (arr: IFriend[]) => {
    arr.sort((a, b) => {
        return b.unread - a.unread;
    })
    return arr;
}