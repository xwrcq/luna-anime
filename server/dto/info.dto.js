class AnimeInfoModelDto {
    id;
    title;
    description;
    image;
    otherName;
    genres
    status;
    releaseDate;
    type;
    totalEpisodes;
    episodes;

    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.image = model.image;
        this.otherName = model.otherName;
        this.genres = model.genres;
        this.status = model.status;
        this.releaseDate = model.releaseDate;
        this.type = model.type;
        this.totalEpisodes = model.totalEpisodes;
        this.episodes = model.episodes;
    }
}

export default AnimeInfoModelDto;