import authService from "../service/auth.service.js";
import dotenv from "dotenv";
import { validateRegistration } from "../validation/user.validation.js";
import ApiError from "../exceptions/api.error.js";
dotenv.config();

class AuthController {
    async registration(req, res, next) {
        try {
            const { error, value } = validateRegistration(req.body);
            if(error) {
                let msg = '';
                error?.details?.forEach(detail => {
                    msg += `${detail?.message}; `;
                })
                const errArray = [];
                error?.details?.forEach(detail => {
                    errArray.push(detail?.context);
                })

                return next(ApiError.BadRequest(msg, errArray));
            }

            const { nickname, email, password } = req.body;

            const userData = await authService.registration(nickname, email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const userData = await authService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'None' });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await authService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async emailActivation(req, res, next) {
        try {
            const emailActivationLink = req.params.link;
            await authService.emailActivation(emailActivationLink);
            return res.redirect(process.env.MY_CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await authService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = req.user;

            return res.json(user);
        } catch(e) {
            next(e);
        }
    }
}

export default new AuthController();