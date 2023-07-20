import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import multer from "multer";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.avatarPath);
    },
});
const upload = multer({ storage, onFileUploadComplete: (file) => console.log('file: ', file)}); 

userRouter.get('/:id', authMiddleware, userController.getFriend);
userRouter.get('/:id/users', authMiddleware, userController.getUsers);  
userRouter.get('/:id/friends', authMiddleware, userController.getFriends);
userRouter.get('/:id/accepts', authMiddleware, userController.getAccepts);
userRouter.get('/:id/sends', authMiddleware, userController.getSends);
userRouter.patch('/:id/accept/:friendId', authMiddleware, userController.acceptFriend);
userRouter.patch('/:id/send/:friendId', authMiddleware, userController.sendFriend);
userRouter.patch('/:id/cancelsend/:friendId', authMiddleware, userController.cancelSendRequest);
userRouter.patch('/:id/delete/:friendId', authMiddleware, userController.deleteFriend);
userRouter.patch('/:id/addcomment/:commentatorId', authMiddleware, userController.addCommentOnProfile);
userRouter.get('/:id/getcomments', authMiddleware, userController.getComments);
userRouter.get('/:id/getfavorite', authMiddleware, userController.getFavorite);
userRouter.patch('/:id/favorite/:animeId', authMiddleware, userController.addRemoveFavorite);
userRouter.post('/:id/update', upload.single('avatar'), userController.updateInfo);

export default userRouter;