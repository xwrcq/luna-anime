import UserModel from '../models/user.model.js';
import UserModelDto from '../dto/user.dto.js';
import FriendModelDto from '../dto/friend.dto.js';
import MiniFriendModelDto from '../dto/miniFriend.dto.js';
import ApiError from '../exceptions/api.error.js';
import dotenv from "dotenv";
import AnimeModel from '../models/anime.model.js';
import axios from 'axios';
import MiniAnimeInfoModelDto from '../dto/miniInfo.dto.js';
import CommentModel from '../models/comment.model.js';
import CommentModelDto from '../dto/comment.dto.js';
import tokenService from './token.service.js';
dotenv.config();


class UserService {
    async getFriend(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const userDto = new UserModelDto(user);
        return userDto;
    }

    async getFriends(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const friends = await Promise.all(
            user.friends.map(friendId => UserModel.findById(friendId))
        );

        const formattedFriends = friends.map((friend) => new MiniFriendModelDto(friend));
        return formattedFriends;
    }

    async getUsers() {
        const users = await UserModel.find({});
        const formattedUsers = users.map((user) => new MiniFriendModelDto(user));
        return formattedUsers;
    }

    async getAccepts(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const friends = await Promise.all(
            user.acceptRequest.map(friendId => UserModel.findById(friendId))
        );

        const formattedFriends = friends.map((friend) => new MiniFriendModelDto(friend));
        return formattedFriends;
    }

    async getSends(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const friends = await Promise.all(
            user.sendRequest.map(friendId => UserModel.findById(friendId))
        );

        const formattedFriends = friends.map((friend) => new MiniFriendModelDto(friend));
        return formattedFriends;
    }

    async acceptFriend(id, friendId) {
        if (!id || !friendId) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest(`User not found`);
        }

        if (!user.acceptRequest.includes(friendId) || !friend.sendRequest.includes(id)) {
            throw ApiError.BadRequest(`No friend request`);
        }

        user.friends.push(friendId);
        friend.friends.push(id);
        user.acceptRequest = user.acceptRequest.filter(fId => fId !== friendId);
        friend.sendRequest = friend.sendRequest.filter(fId => fId !== id);

        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.sendRequest.map((friendId) => UserModel.findById(friendId))
        );

        const userDto = new UserModelDto(user);

        const formattedFriends = friends.map((friend) => new MiniFriendModelDto(friend));
        return userDto;
    }

    async sendFriend(id, friendId) {
        if (!id || !friendId) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest(`User not found`);
        }
        if(user.sendRequest.includes(friendId) || friend.acceptRequest.includes(id)) {
            throw ApiError.BadRequest(`Request has already sent`);
        }

        user.sendRequest.push(friendId);
        friend.acceptRequest.push(id);

        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.sendRequest.map((friendId) => UserModel.findById(friendId))
        );

        const userDto = new UserModelDto(user);

        const formattedFriends = friends.map((friend) => new MiniFriendModelDto(friend));
        return userDto;
    }

    async cancelSendRequest(id, friendId) {
        if (!id || !friendId) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest(`User not found`);
        }

        if (!user.sendRequest.includes(friendId) || !friend.acceptRequest.includes(id)) {
            throw ApiError.BadRequest(`No friend to remove`);
        }

        user.sendRequest = user.sendRequest.filter(fId => fId !== friendId);
        friend.acceptRequest = friend.acceptRequest.filter(fId => fId !== id);

        await user.save();
        await friend.save();

        const userDto = new UserModelDto(user);

        return userDto;
    }

    async deleteFriend(id, friendId) {
        if (!id || !friendId) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest(`User not found`);
        }

        if (!user.friends.includes(friendId) || !friend.friends.includes(id)) {
            throw ApiError.BadRequest(`No friend to remove`);
        }

        user.friends = user.friends.filter(fId => fId !== friendId);
        friend.friends = friend.friends.filter(fId => fId !== id);

        await user.save();
        await friend.save();

        const userDto = new UserModelDto(user);

        return userDto;
    }

    async addCommentOnProfile(id, commentatorId, commentText) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        const commentator = await UserModel.findById(commentatorId);
        if (!user || !commentator) {
            throw ApiError.BadRequest(`User not found`);
        }

        const newComment = await CommentModel.create({commentText, commentatorId, commentatorNickname: commentator.nickname, commentatorAvatar: commentator.avatarPath}); 

        user.commentsOnProfile.push(newComment._id);

        await user.save();

        const userDto = new UserModelDto(user);

        return userDto;
    }

    async addRemoveFavorite(id, animeId) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const anime = await AnimeModel.findOne({animeId});

        if(anime) {
            if(user.favoriteAnime.some(an => an === anime.animeId)) {
                user.favoriteAnime = user.favoriteAnime.filter(an => an !== anime.animeId);
            } else {
                user.favoriteAnime.push(anime.animeId);
            }            
        } else {
            const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}info/${animeId}`);
            const animeDto = new MiniAnimeInfoModelDto(data);
            const newAnime = await AnimeModel.create({animeId: animeDto.animeId, title: animeDto.title, image: animeDto.image}); 

            user.favoriteAnime.push(newAnime.animeId);
        }

        await user.save();

        const userDto = new UserModelDto(user);

        return userDto;
    }

    async getFavorite(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const favorites = await Promise.all(
            user.favoriteAnime.map(animeId => AnimeModel.findOne({animeId}))
        );

        return favorites;
    }

    async getComments(id) {
        if (!id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const comments = await Promise.all(
            user.commentsOnProfile.map(comId => CommentModel.findById(comId))
        )

        const commentsDto = comments.map(comment => new CommentModelDto(comment));

        return comments;
    }

    async updateInfo(payload) {
        if (!payload.id) {
            throw ApiError.BadRequest(`User not found`);
        }

        const user = await UserModel.findById(payload.id);
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }

        const isNicknameAlreadyUsed = await UserModel.findOne({nickname: payload.nickname});
        if(isNicknameAlreadyUsed && (user.nickname !== payload.nickname)) {
            throw ApiError.BadRequest(`User with nickname ${payload.nickname} already exist`);
        }

        if((user.avatarPath !== payload.avatarPath) || (user.nickname !== payload.nickname)) {
            user.avatarPath = payload.avatarPath;

            const comments = await Promise.all(
                user.commentsOnProfile.map(comId => CommentModel.findById(comId))
            );

            comments.map(async (comment) => {
                comment.commentatorAvatar = payload.avatarPath;
                comment.commentatorNickname = payload.nickname;
                await comment.save();
            });
        }

        user.nickname = payload.nickname;   
        user.description = payload.description;        

        await user.save();

        const userDto = new UserModelDto(user);
        const token = tokenService.generateAccessToken({...userDto});

        return {token, user: userDto};
    }
    
}

export default new UserService();