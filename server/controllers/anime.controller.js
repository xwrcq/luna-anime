
import dotenv from "dotenv";
import animeService from "../service/anime.service.js";
dotenv.config();

class AnimeController {
    async topAiring(req, res, next) {
        try {
            const { page } = req.query;  
            
            const data = page ? await animeService.topAiring(page) : await animeService.topAiring();
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async recent(req, res, next) {
        try {
            const { page } = req.query; 

            const data = page ? await animeService.recent(page) : await animeService.recent();
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async info(req, res, next) {
        try {
            const { id } = req.params; 

            const data = await animeService.info(id);
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async streamingLink(req, res, next) {
        try {
            const { id: episodeId } = req.params; 

            const data = await animeService.streamingLink(episodeId);
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.params; 
            const { page } = req.query;             
            const data = page ? await animeService.search(query, page) : await animeService.search(query);
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }
}

export default new AnimeController();