import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import errorMiddleware from "./middleware/error.middleware.js";
import animeRouter from "./routes/animeRouter.js";
import userRouter from "./routes/userRouter.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.MY_CLIENT_URL
}));
app.use('/', authRouter);
app.use('/anime', animeRouter);
app.use('/users', userRouter);
app.use(errorMiddleware);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`server start on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();