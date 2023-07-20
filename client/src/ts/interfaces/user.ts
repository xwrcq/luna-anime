export interface IUser {
    id: string;
    nickname: string;
    email: string;
    avatarPath: string;
    description: string;
    friends: string[] | [];
    acceptRequest: string[] | [];
    sendRequest: string[] | [];
    commentsOnProfile: IComment[] | [];
    favoriteAnime: string[] | [];
}

export interface IComment {
    commentText: string;
    commentatorId: string;
    commentatorNickname: string;
    commentatorAvatar: string;
}

export interface IFavorite {
    animeId: string;
    title: string;
    image: string;
}

// user api

export interface UserRegistration {
    nickname: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserDataResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IFriend {
    id: string;
    nickname: string;
    avatarPath: string;
    description: string;
    friends: string[] | [];
    commentsOnProfile: IComment[] | [];
    favoriteAnime: IFavorite[] | [];
}

export interface IMiniFriend {
    id: string;
    nickname: string;
    avatarPath: string;
}

export interface CommentRequest {
    id: string;
    commentatorId: string;
    commentText: string;
}

export interface CommentRequest {
    id: string;
    commentatorId: string;
    commentText: string;
}

export interface FriendRequest {
    id: string;
    friendId: string;
}

export interface FavoriteRequest {
    id: string;
    animeId: string;
}

export interface UserUpdate {
    id: string;
    nickname: string;
    description: string;
    avatarPath: string;
}