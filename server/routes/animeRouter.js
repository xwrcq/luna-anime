import express from "express";
import animeController from "../controllers/anime.controller.js";

const animeRouter = express.Router();
    
animeRouter.get('/top-airing', animeController.topAiring);
animeRouter.get('/recent', animeController.recent);
animeRouter.get('/info/:id', animeController.info);
animeRouter.get('/watch/:id', animeController.streamingLink);
animeRouter.get('/search/:query', animeController.search);

export default animeRouter;