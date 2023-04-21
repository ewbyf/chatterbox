export interface IFriend {
    avatar: string;
    id: number;
    username: string;
    channelId: number;
    status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'DO_NOT_DISTURB';
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
    timestamp: string;
}

export interface IUser {
    id: number;
    username: string;
    token: string;
    avatar: string;
    email: string;
}

export interface Notification {
    message: IMessage;
    type: 'MESSAGE';
}

export interface INotifications {
    unread: number;
    notifications: Notification[];
}