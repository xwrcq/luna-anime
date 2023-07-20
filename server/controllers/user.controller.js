import userService from "../service/user.service.js";
import dotenv from "dotenv";
import ApiError from "../exceptions/api.error.js";
dotenv.config();

class UserController {
    async getFriend(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getFriend(id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getFriends(req, res, next) {
        try {
            const { id } = req.params;

            const friends = await userService.getFriends(id);
            return res.json(friends);
        } catch (e) {
            next(e);
        }
    }    

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }  

    async getAccepts(req, res, next) {
        try {
            const { id } = req.params;

            const friends = await userService.getAccepts(id);
            return res.json(friends);
        } catch (e) {
            next(e);
        }
    }

    async getSends(req, res, next) {
        try {
            const { id } = req.params;

            const friends = await userService.getSends(id);
            return res.json(friends);
        } catch (e) {
            next(e);
        }
    }

    async acceptFriend(req, res, next) {
        try {
            const { id, friendId } = req.params;

            const user = await userService.acceptFriend(id, friendId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async sendFriend(req, res, next) {
        try {
            const { id, friendId } = req.params;

            const user = await userService.sendFriend(id, friendId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async cancelSendRequest(req, res, next) {
        try {
            const { id, friendId } = req.params;

            const user = await userService.cancelSendRequest(id, friendId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async deleteFriend(req, res, next) {
        try {
            const { id, friendId } = req.params;

            const user = await userService.deleteFriend(id, friendId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async addCommentOnProfile(req, res, next) {
        try {
            const { id, commentatorId } = req.params;
            const { commentText } = req.body;

            const user = await userService.addCommentOnProfile(id, commentatorId, commentText);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async addRemoveFavorite(req, res, next) {
        try {
            const { id, animeId } = req.params;

            const user = await userService.addRemoveFavorite(id, animeId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getFavorite(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getFavorite(id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getComments(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getComments(id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async updateInfo(req, res, next) {
        try {
            const payload = req.body;
            const file = req.file


            const userData = await userService.updateInfo(payload);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();