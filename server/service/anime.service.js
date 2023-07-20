import axios from 'axios';
import dotenv from "dotenv";
import AnimeInfoModelDto from '../dto/info.dto.js';
dotenv.config();

class AnimeService {
    async topAiring(page = 1) {
        const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}top-airing`, { params: { page } });
        return data;
    }

    async recent(page = 1) {
        const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}recent-episodes`, { params: { page } });
        return data;
    }

    async info(id) {
        const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}info/${id}`);
        const animeInfoDto = new AnimeInfoModelDto(data);
        return animeInfoDto;
    }

    async streamingLink(episodeId) {
        const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}watch/${episodeId}`);
        return data;
    }

    async search(query, page = 1) {
        const { data } = await axios.get(`${process.env.BASE_PROVIDER_ANIME_URL}${query}`, { params: { page }});
        return data;
    }
}

export default new AnimeService();