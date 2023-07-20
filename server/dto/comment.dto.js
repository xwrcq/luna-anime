class CommentModelDto {
    id;
    commentText;
    commentatorId;
    commentatorNickname;
    commentatorAvatar;    

    constructor(model) {
        this.id = model._id;
        this.commentText = model.commentText;
        this.commentatorId = model.commentatorId;
        this.commentatorNickname = model.commentatorNickname;
        this.commentatorAvatar = model.commentatorAvatar;
    }
}

export default CommentModelDto;