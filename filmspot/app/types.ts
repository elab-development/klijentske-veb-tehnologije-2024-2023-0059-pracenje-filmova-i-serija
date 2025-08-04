export interface MovieCardProps{
    title: string,
    type: 0 | 1,
    banner: string,
    rating: number,
    description?: string,
}

export interface MovieInfo{
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: "movie" | "tv",
    original_title: string,
    overview: string,
    popularity: number
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number
    vote_count: number
}

export interface Top5MovieCardProps extends MovieInfo{
    index: number
}