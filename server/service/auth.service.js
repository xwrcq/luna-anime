import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt'; 
import { v4 as uuidv4 } from 'uuid';
import emailService from './email.service.js';
import tokenService from './token.service.js';
import UserModelDto from '../dto/user.dto.js';
import ApiError from '../exceptions/api.error.js'
import dotenv from "dotenv";
dotenv.config();


class AuthService {
    async registration(nickname, email, password) {
        const isEmailAlreadyUsed = await UserModel.findOne({email});
        if(isEmailAlreadyUsed) {
            throw ApiError.BadRequest(`User with email ${email} already exist`);
        }
        

        const isNicknameAlreadyUsed = await UserModel.findOne({nickname});
        if(isNicknameAlreadyUsed) {
            throw ApiError.BadRequest(`User with nickname ${nickname} already exist`);
        }

        const hashPassword = await bcrypt.hash(password, 4);
        const emailActivationLink = uuidv4();

        const user = await UserModel.create({nickname, email, password: hashPassword, emailActivationLink, avatarPath: 'avatar.jpg'});
        await emailService.sendActivationMail(email, `${process.env.MY_SERVER_URL}activate/${emailActivationLink}`);

        const userDto = new UserModelDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.BadRequest(`User with this email not found`);
        }

        const isPasswordEquels = await bcrypt.compare(password, user.password); 
        if(!isPasswordEquels) {
            throw ApiError.BadRequest(`Wrong password`);
        }

        if(!user.isEmailActivated) {
            throw ApiError.ForbiddenError('email is not verified');
        }

        const userDto = new UserModelDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return  token;
    }

    async emailActivation(emailActivationLink) {
        const user = await UserModel.findOne({emailActivationLink});
        if(!user) {
            throw ApiError.BadRequest('Incorrect activation link')
        }

        user.isEmailActivated = true;
        await user.save();
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        if(!user) {
            throw ApiError.UnauthorizedError();
        }
        const userDto = new UserModelDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

export default new AuthService();