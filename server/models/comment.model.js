import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
        commentText: {type: String, required: true},
        commentatorId: {type: String, required: true},
        commentatorNickname: {type: String, required: true},
        commentatorAvatar: {type: String, required: true}
}, {timestamps: true});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;