import type { MovieInfo, VideoInfo } from "~/types";

export function getContent({type, content}: {type: "movie" | "tv", content: "trending" | "upcoming" | "popular"}){
    // import.meta.env.VITE_TMDB_API_KEY

    let fetchURL = import.meta.env.VITE_TMDB_BASE_URL;
    if(type === "movie"){
        switch(content){
            case "popular": {
                fetchURL+=`/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
                break;
            }
            case "upcoming": {
                fetchURL+=`/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&include_adult=false`;
                break;
            }
        }
    }else{

    }
    
    return fetch(fetchURL)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results as MovieInfo[];
    })
}

export function getSingle({id, type}: {id: string, type: "movie" | "tv"}){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data as MovieInfo;
    })
}

export function getSingleCast({id, type}: {id: number, type: "movie" | "tv"}){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data;
    })
}

export function getSingleTrailer({id, type}: {id: number, type: "movie" | "tv"}){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        const trailer = data.results.find(
          (vid: VideoInfo) =>
            vid.site === 'YouTube' &&
            vid.type === 'Trailer' &&
            vid.official === true
        );
        
        return trailer;
    })
}