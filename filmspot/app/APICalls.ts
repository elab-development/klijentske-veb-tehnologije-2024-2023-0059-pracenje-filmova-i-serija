import type { MovieInfo, VideoInfo } from "~/types";

const urlBase = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export function getContent({type, content, page}: {type: "movie" | "tv", content: "trending" | "upcoming" | "popular", page: number}){
    // apiKey

    let fetchURL = urlBase;
    const filter = `&language=en-US&page=${page}&include_adult=false`;
    if(type === "movie"){
        switch(content){
            case "popular": case "upcoming": {
                fetchURL+=`/${type}/${content}?api_key=${apiKey}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/movie/week?api_key=${apiKey}${filter}`;
                break;
            }
        }
    }else{
        switch(content){
            case "popular": {
                fetchURL+=`/tv/popular?api_key=${apiKey}${filter}`;
                break;
            }
            case "upcoming": {
                fetchURL+=`/tv/on_the_air?api_key=${apiKey}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/tv/week?api_key=${apiKey}${filter}`;
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
    return fetch(`${urlBase}/${type}/${id}?api_key=${apiKey}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data as MovieInfo;
    })
}

export function getSingleCast({id, type}: SingleProps){
    return fetch(`${urlBase}/${type}/${id}/credits?api_key=${apiKey}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data;
    })
}

export function getSingleTrailer({id, type}: SingleProps){
    return fetch(`${urlBase}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`)
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
    return fetch(`${urlBase}/${type}/${id}/${isSimilar ? "similar" : "recommendations"}?api_key=${apiKey}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results;
    })
}

export function fetchActorDetails({id}: {id: string}) {
  return fetch(`${urlBase}/person/${id}?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .then(details => {
      return fetch(`${urlBase}/person/${id}/combined_credits?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(credits => {
          return { details, credits };
        });
    });
}