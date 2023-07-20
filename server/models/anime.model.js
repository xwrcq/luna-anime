import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema({
        animeId: {type: String, required: true},
        title: {type: String, required: true},
        image: {type: String, required: true}
}, {timestamps: true});

const AnimeModel = mongoose.model("Anime", AnimeSchema);
export default AnimeModel;