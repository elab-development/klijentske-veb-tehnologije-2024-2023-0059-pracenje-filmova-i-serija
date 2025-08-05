export interface MovieInfo{
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: "movie" | "tv" | "person",
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

export interface MovieHolderInfo extends MovieInfo{
    type: "movie" | "tv",
    genres: {id: number, name: string}[], 
    runtime: number
}

export interface Top5MovieCardProps extends MovieInfo{
    index: number
}

export type CastInfo = {
    adult: boolean,
    cast_id: number,
    character: string,
    credit_id: string,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    order: number,
    original_name: string,
    popularity: number,
    profile_path: string
}

export type VideoInfo = {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    official: boolean,
    published_at: string,
    site: string,
    size: number,
    type: string
}

export type ToggleFnProps = {
    element: HTMLElement | HTMLSpanElement, 
    time: number
}