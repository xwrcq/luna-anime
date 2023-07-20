export interface GetTopAiringResponse {
    currentPage: string;
    hasNextPage: boolean;
    results: Array<TopAiringInfo>
}

export interface TopAiringInfo {
    id: string;
    title: string;
    image: string;
    url: string;
    genres: Array<string>;
}

export interface GetRecentResponse {
    currentPage: string;
    hasNextPage: boolean;
    results: Array<RecentInfo>
}

export interface RecentInfo {
    id: string;
    episodeId: string;
    episodeNumber: number;
    title: string;
    image: string;
    url: string;
}

export interface GetInfoResponse {
    id: string;
    title: string;
    genres: Array<string>;
    totalEpisodes: number;
    image: string;
    releaseDate: string;
    description: string;
    type: string;
    status: string;
    otherName: string;
    episodes: Array<Episode>;
}

export interface Episode {
    id: string;
    number: number;
}

export interface GetStreamingLinkResponse {
    sources: Array<Source>;
    download: string;
}

export interface Source {
    url: string;
    isM3U8: boolean;
    quality: string;
}

export interface GetSearchResponse {
    currentPage: string;
    hasNextPage: boolean;
    results: Array<Search>
}

export interface Search {
    id: string;
    title: string;
    image: string;
    url: string;
    releaseDate: string;
    subOrDub: string;
}