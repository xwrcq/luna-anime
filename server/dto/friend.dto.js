class FriendModelDto {
    id;
    nickname;
    description;
    avatarPath;
    friends;    
    commentsOnProfile;
    favoriteAnime;

    constructor(model) {
        this.id = model._id;
        this.nickname = model.nickname;
        this.description = model.description;
        this.avatarPath = model.avatarPath;
        this.friends = model.friends;
        this.commentsOnProfile = model.commentsOnProfile;
        this.favoriteAnime = model.favoriteAnime;
    }
}

export default FriendModelDto;