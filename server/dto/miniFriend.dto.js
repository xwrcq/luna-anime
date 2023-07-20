class MiniFriendModelDto {
    id;
    nickname;
    avatarPath;

    constructor(model) {
        this.id = model._id;
        this.nickname = model.nickname;
        this.avatarPath = model.avatarPath;
    }
}

export default MiniFriendModelDto;