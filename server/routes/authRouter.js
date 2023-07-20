import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import multer from "multer";

const authRouter = express.Router();
    
authRouter.post('/registration', authController.registration);
authRouter.get('/activate/:link', authController.emailActivation);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/user', authMiddleware, authController.getUser);

export default authRouter;