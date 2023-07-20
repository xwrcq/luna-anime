class UserModelDto {
    email;
    id;
    nickname;
    isActivated;
    description;
    avatarPath;
    friends;
    acceptRequest;
    sendRequest;
    commentsOnProfile;
    favoriteAnime;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.nickname = model.nickname;
        this.isActivated = model.isActivated;
        this.description = model.description;
        this.avatarPath = model.avatarPath;
        this.friends = model.friends;
        this.acceptRequest = model.acceptRequest;
        this.sendRequest = model.sendRequest;
        this.commentsOnProfile = model.commentsOnProfile;
        this.favoriteAnime = model.favoriteAnime;
    }
}

export default UserModelDto;