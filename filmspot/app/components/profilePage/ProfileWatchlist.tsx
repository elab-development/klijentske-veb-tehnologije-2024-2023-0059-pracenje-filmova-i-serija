import { useEffect, useState } from "react";
import type { MovieHolderInfo } from "~/types";
import MovieInfoPart from "../moviePage/MovieInfoPart";

function ProfileWatchlist(){
    return <>
        <div id="searchResults" className="flex flex-col gap-6 mt-6">
            <WatchlistItem props={{title: "Film", release_date: "2025-05-30", genres: [{name: "Genre1"}, {name: "nesto"}, {name: "nesto"}], overview: "Neki opis filma Neki opis filma Neki opis filma Neki opis filma Neki opis filma Neki opis filma Neki opis filma"}} />
            <WatchlistItem props={{title: "Film", release_date: "2025-05-30", genres: [{name: "Genre1"}, {name: "nesto"}, {name: "nesto"}], overview: "Neki opis filma"}} />
            <WatchlistItem props={{title: "Film", release_date: "2025-05-30", genres: [{name: "Genre1"}, {name: "nesto"}, {name: "nesto"}], overview: "Neki opis filma"}} />
        </div>
    </>;
}

function WatchlistItem({props}: {props: any}){
// function WatchlistItem({props}: {props: MovieInfoHolder}){
    const [genres, setGenres] = useState<string[]>([]);
    
    useEffect(() => {
        document.title = props.title ?? props.name;

        setGenres([]);

        for(let i = 0; (i < 3 && props.genres[i]); i++)
            setGenres(prev => [...prev, props.genres[i].name]);
    }, []);
        
    return <>
        <a href="#" className="searchResult movieSearchResult flex !gap-6 w-full">
            <img className="w-[100px] aspect-[3/4.3] rounded-xl border border-[var(--borderColorPrimary)]" src={`https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg`} alt="test" />
            
            <div className="w-full overflow-x-hidden">
                <div className="flex justify-between w-full">
                    <span className="flex gap-1 max-w-[50%]">
                        <h2 className="text-ellipsis overflow-hidden whitespace-nowrap">{props.title ?? props.name}</h2>
                        <p className="!text-xl !mt-0">({props.release_date.split('-')[0]})</p>
                    </span>
                    
                    <span className="wishlistButtons shrink-0">
                        <button className="flex items-center gap-2 rounded-full text-[.9rem] button">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.53834 1.48741C7.70914 1.07676 8.29086 1.07676 8.46166 1.48741L9.96858 5.11048C10.0406 5.2836 10.2034 5.40188 10.3903 5.41687L14.3017 5.73044C14.745 5.76598 14.9248 6.31924 14.587 6.60857L11.6069 9.16133C11.4645 9.28331 11.4024 9.4747 11.4459 9.65708L12.3563 13.474C12.4595 13.9066 11.9889 14.2485 11.6093 14.0167L8.26063 11.9713C8.10062 11.8736 7.89938 11.8736 7.73937 11.9713L4.39066 14.0167C4.01111 14.2485 3.54048 13.9066 3.64367 13.474L4.55414 9.65708C4.59764 9.4747 4.53546 9.28331 4.39306 9.16133L1.41298 6.60857C1.07521 6.31924 1.25497 5.76598 1.6983 5.73044L5.60971 5.41687C5.79661 5.40188 5.95941 5.2836 6.03142 5.11048L7.53834 1.48741Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Rate this movie
                        </button>

                        <button className="flex items-center gap-2 rounded-full text-[.9rem] button remove">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6L18 18M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Remove
                        </button>
                    </span>
                </div>

                {genres?.length > 0 && <MovieInfoPart items={genres} additionalClasses="tags" />}
                <p className="max-h-[70px] overflow-hidden break-all">{props.overview}</p>
            </div>
        </a>
    </>;
}

export default ProfileWatchlist;