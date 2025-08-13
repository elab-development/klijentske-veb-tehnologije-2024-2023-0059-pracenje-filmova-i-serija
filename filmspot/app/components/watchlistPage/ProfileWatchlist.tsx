import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import MovieInfoPart from "../moviePage/MovieInfoPart";
import type { watchlistItem } from "~/types";
import { saveToWatchlist } from "~/functions";
import { Link } from "react-router";

type ListItemProps = {
    details: watchlistItem & {id: number | string, rating: number | false}
}

function ProfileWatchlist(){
    const [content, setContent] = useState<ReactElement[]>([]);
    
    useLayoutEffect(() => {
        const elements = Object?.entries<ListItemProps & {rating: number | false, watchlist: boolean}>(JSON.parse(localStorage.userActions ?? '{}'))?.map(([id, item]) => {
            if(item.watchlist && item.details)
                return <WatchlistItem key={id} props={{...item.details, id: id, rating: item.rating ?? false}}/>
        });

        if(elements)
            setContent(elements as ReactElement[]);
    }, [])

    return <>
        <div id="searchResults" className="flex flex-col gap-6 mt-6">
            {content}
        </div>
    </>;
}

function WatchlistItem({props}: {props: watchlistItem & {id: number | string, rating: number | false}}){
    const [genres, setGenres] = useState<string[]>([]);

    const watchlistItemRef = useRef<HTMLDivElement>(null);
    
    useLayoutEffect(() => {
        setGenres([]);

        for(let i = 0; (i < 3 && props.genres[i]); i++)
            setGenres(prev => [...prev, props.genres[i]]);
    }, []);

    const handleRemove = () => {
        if(watchlistItemRef.current)
            watchlistItemRef.current.parentElement?.removeChild(watchlistItemRef.current);

        saveToWatchlist(Number(props.id));
    }
        
    return <>
        <div ref={watchlistItemRef} className="searchResult movieSearchResult flex !gap-6 w-full">
            <Link to={`/content/${props.type}.${props.id}`} className="absolute w-full h-full z-1" />
            <img className="w-[120px] aspect-[3/4.3] rounded-xl border border-[var(--borderColorPrimary)]" src={props.banner} alt="test" />
            
            <div className={`w-full overflow-x-hidden ${props.description.length > 0 ? "content-center" : ''}`}>
                <div className="flex justify-between w-full">
                    <span className="flex gap-1 max-w-[50%]">
                        <h2 className="text-ellipsis overflow-hidden whitespace-nowrap">{props.name}</h2>
                        <p className="!text-xl !mt-0">({props.year ?? props.name})</p>
                    </span>
                    
                    <span className="wishlistButtons shrink-0 z-2">
                        <span className={`flex items-center gap-2 rounded-full text-[.9rem] select-none ${props.rating && "rated"}`}>
                            {props.rating
                                ? <>
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.48741C7.70914 1.07676 8.29086 1.07676 8.46166 1.48741L9.96858 5.11048C10.0406 5.2836 10.2034 5.40188 10.3903 5.41687L14.3017 5.73044C14.745 5.76598 14.9248 6.31924 14.587 6.60857L11.6069 9.16133C11.4645 9.28331 11.4024 9.4747 11.4459 9.65708L12.3563 13.474C12.4595 13.9066 11.9889 14.2485 11.6093 14.0167L8.26063 11.9713C8.10062 11.8736 7.89938 11.8736 7.73937 11.9713L4.39066 14.0167C4.01111 14.2485 3.54048 13.9066 3.64367 13.474L4.55414 9.65708C4.59764 9.4747 4.53546 9.28331 4.39306 9.16133L1.41298 6.60857C1.07521 6.31924 1.25497 5.76598 1.6983 5.73044L5.60971 5.41687C5.79661 5.40188 5.95941 5.2836 6.03142 5.11048L7.53834 1.48741Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {props.rating}/10
                                </>
                                : "Not rated yet"
                            }
                            
                        </span>

                        <button className="flex items-center gap-2 rounded-full text-[.9rem] button remove" onClick={handleRemove}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Remove
                        </button>
                    </span>
                </div>

                {genres?.length > 0 && <MovieInfoPart items={genres} additionalClasses="tags" />}
                <p>{props.description}</p>
            </div>
        </div>
    </>;
}

export default ProfileWatchlist;