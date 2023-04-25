export interface IFriend {
    avatar: string;
    id: number;
    username: string;
    channelId: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
    unread: number;
}

interface IAuthor {
    avatar: string;
    id: number;
    username: string;
}

export interface IMessage {
    author: IAuthor;
    authorId: number;
    channelId: number;
    content: string;
    createdAt: string;
    id: number;
}

export interface IRequest {
    from: {
        avatar: string;
        id: number;
        username: string;
    };
}

export interface IUser {
    id: number;
    username: string;
    token: string;
    avatar: string;
    email: string;
}

interface IChannel {
    id: number;
    name: string;
    type: string;
}

interface IFriendNoUnread {
    avatar: string;
    id: number;
    username: string;
    channelId: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
}

export interface MessageNotification {
    type: "MESSAGE";
    message: IMessage;
}

export interface Notification {
    channel?: IChannel;
    friend?: IFriend;
    to?: IFriendNoUnread;
    from?: IAuthor;
    type: string;
    count?: number;
}

export interface INotifications {
    unread: number;
    notifications: Notification[];
}

export type IFilter = 'RECENTLY_MESSAGED' | 'USERNAME_ASC' | 'USERNAME_DESC';