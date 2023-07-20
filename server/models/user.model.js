import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        nickname: {type: String, unique: true, required: true, minlength: 3, maxlength: 20},
        email: {type: String, unique: true, required: true, minlength: 4, maxlength: 50},
        password: {type: String, required: true},
        isEmailActivated: {type: Boolean, default: false},
        emailActivationLink: {type: String},
        description: {type: String, maxlength: 400, default: ''},
        avatarPath: {type: String, default: ''},
        friends: {type: Array, default: []},
        acceptRequest: {type: Array, default: []},
        sendRequest: {type: Array, default: []},
        commentsOnProfile: {type: Array, default: []},
        favoriteAnime: {type: Array, default: []}
}, {timestamps: true});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;