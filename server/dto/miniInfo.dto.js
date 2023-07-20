class MiniAnimeInfoModelDto {
    animeId;
    title;
    image;

    constructor(model) {
        this.animeId = model.id;
        this.title = model.title;
        this.image = model.image;
    }
}

export default MiniAnimeInfoModelDto;