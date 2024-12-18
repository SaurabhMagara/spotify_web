export type Categories = {
    id: string;
    name: string;
}

type Image = {
    height: number;
    url: string;
    width: number;
}

export type Album = {
    total_tracks?: number,
    followers?: { total: number },
    external_urls: {
        spotify: string
    };
    id: string,
    images: Image[],
    name: string,
};

export type propData = {
    url?: string,
    name: string,
    followers?: number | undefined,
    tracks?: number | undefined,
    passData?: string | string[],
    spotify: string,
}