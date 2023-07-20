import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.NODEMAIL_USER,
                pass: process.env.NODEMAIL_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.NODEMAIL_USER,
            to,
            subject: 'Account activation on ' + process.env.MY_CLIENT_URL,
            text: '',
            html:
                `
                    <div style="text-align: center;">
                        <h1 style="marginBottom: 5px;">Activate your account</h1>
                        <a href="${link}" style="padding: 10px; backgroundColor: white; color: black; border: 1px solid black; borderRadius: 30px;">Click here to activate your account</a>
                    </div>
                `
        });
    }
}

export default new EmailService();