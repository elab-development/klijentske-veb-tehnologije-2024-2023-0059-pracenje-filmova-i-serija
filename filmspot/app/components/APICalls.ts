import type { MovieInfo, VideoInfo } from "~/types";

export function getContent({type, content}: {type: "movie" | "tv", content: "trending" | "upcoming" | "popular"}){
    // import.meta.env.VITE_TMDB_API_KEY

    let fetchURL = import.meta.env.VITE_TMDB_BASE_URL;
    const filter = "&language=en-US&page=1&include_adult=false";
    if(type === "movie"){
        switch(content){
            case "popular": case "upcoming": {
                fetchURL+=`/${type}/${content}?api_key=${import.meta.env.VITE_TMDB_API_KEY}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}${filter}`;
                break;
            }
        }
    }else{
        switch(content){
            case "popular": {
                fetchURL+=`/tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}${filter}`;
                break;
            }
            case "upcoming": {
                fetchURL+=`/tv/on_the_air?api_key=${import.meta.env.VITE_TMDB_API_KEY}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}${filter}`;
                break;
            }
        }
    }
    
    return fetch(fetchURL)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results as MovieInfo[];
    })
}

type SingleProps = {
    id: string | number,
    type: "movie" | "tv"
}

export function getSingle({id, type}: SingleProps){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data as MovieInfo;
    })
}

export function getSingleCast({id, type}: SingleProps){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data;
    })
}

export function getSingleTrailer({id, type}: SingleProps){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let trailer = data.results.find(
          (vid: VideoInfo) =>
            vid.site === 'YouTube' &&
            vid.type === 'Trailer' &&
            vid.official === true
        );

        return trailer ?? data.results[0] ?? false;
    })
}

export function getSimilarOrRecommended({id, type, isSimilar}: SingleProps & {isSimilar: boolean}){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/${isSimilar ? "similar" : "recommendations"}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results;
    })
}