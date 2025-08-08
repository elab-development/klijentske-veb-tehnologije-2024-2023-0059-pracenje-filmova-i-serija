import type { CastInfo, MovieHolderInfo } from "~/types";
import ContentType from "../ContentType";
import MovieInfoPart from "./MovieInfoPart";
import ButtonWithArrow from "../ButtonWithArrow";
import CircularRating from "./MovieRating";
import { useQuery } from "@tanstack/react-query";
import { getSingleCast, getSingleTrailer } from "../../APICalls";
import CastItem from "../CastItem";
import { useLayoutEffect, useRef, useState } from "react";
import NoBanner from "app/assets/NoBanner.png";
import MoreCast from "./MoreCast";
import { saveToWatchlist, toggleElementWD } from "~/functions";
import RatingPopup from "./RatingPopup";

function MovieInfoHolder({props}: {props: MovieHolderInfo}){
    const { status: castStatus, data: castInfo } = useQuery({queryKey: [`cast${props.type}${props.id}`], queryFn: () => getSingleCast({id: props.id, type: props.type})});
    const cast = castInfo?.cast?.slice(0, 6)?.map((item: CastInfo) => {
        return <CastItem key={item.id} props={item}></CastItem>;
    });

    const { data: trailer } = useQuery({queryKey: [`videos${props.type}${props.id}`], queryFn: () => getSingleTrailer({id: props.id, type: props.type})});

    const [preGenres, setPreGenres] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    let isInUserActions = useRef<[boolean, number | false]>([false, false]);

    useLayoutEffect(() => {
        isInUserActions.current = [JSON.parse(localStorage.userActions ?? "null")?.[props.id]?.["wishlist"], JSON.parse(localStorage.userActions ?? "null")?.[props.id]?.["rating"]];

        document.title = props.title ?? props.name;

        setPreGenres([]);
        setGenres([]);

        if(props.release_date)
            setPreGenres(prev => [...prev, props.release_date.split('-')[0]]);
        if(props.runtime){
            const hours = Math.floor(props.runtime / 60);
            const minutes = props.runtime % 60;
            setPreGenres(prev => [...prev, (hours > 0 ? hours + 'h' : '') + ' ' + (minutes > 0 ? minutes + 'm' : '')]);
        }

        for(let i = 0; (i < 3 && props.genres[i]); i++)
            setGenres(prev => [...prev, props.genres[i].name]);
    }, []);

    const allCastRef = useRef<HTMLSpanElement>(null);
    const ratingPopupRef = useRef<HTMLDivElement>(null);
    const banner = useRef(props.poster_path?.length > 0 ? `${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${props.poster_path}` : NoBanner);

    return <>
        <div className="flex items-start gap-10">
            <div className="pageBackground">
                <img src={`${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${props.poster_path}`} alt="" />
                <span></span>
            </div>
            <span className="bannerHolder relative w-fit block z-1">
                <img src={banner.current} alt="Banner" />

                <span className="rating absolute top-[-20px] right-[-20px]">
                    <CircularRating value={Number(props.vote_average)} />
                </span>
            </span>

            <span className="importantHolder z-1">
                <h2 className="mb-2">{props.title ?? props.name}</h2>

                {castStatus === "success" && 
                    <span className="infoPartsHolder flex items-center">
                        {props && <ContentType type={props.type} additionalClasses="infoChild"/>}
                        {preGenres?.length > 0 && <MovieInfoPart items={preGenres} />}
                        {genres?.length > 0 && <MovieInfoPart items={genres} additionalClasses="genre" />}
                    </span>
                }

                <span className="buttonHolder">
                    <button name={`movie${props.id}`} className={`addToWatchlist button ${isInUserActions.current[0] ? "open" : ''}`} onClick={() => saveToWatchlist(props.id, undefined, {banner: banner.current, name: props.title ?? props.name, year: props.release_date ? props.release_date?.split('-')[0] : props.first_air_date?.split('-')[0], genres: genres, description: props.overview, type: props.type})}>
                        <svg width="13" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H8C9.10457 1 10 1.89543 10 3V10.8165C10 11.6724 8.99479 12.1328 8.34677 11.5737L5.5 9.11765L2.65323 11.5737C2.00521 12.1328 1 11.6724 1 10.8165V3Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Add to watchlist</p>
                    </button>

                    <button name={`rating${props.id}`} className={`rateMovie button ${isInUserActions.current[1] ? "open" : ''}`} onClick={() => toggleElementWD({element: ratingPopupRef.current!, time: 200})}>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.53834 1.48741C7.70914 1.07676 8.29086 1.07676 8.46166 1.48741L9.96858 5.11048C10.0406 5.2836 10.2034 5.40188 10.3903 5.41687L14.3017 5.73044C14.745 5.76598 14.9248 6.31924 14.587 6.60857L11.6069 9.16133C11.4645 9.28331 11.4024 9.4747 11.4459 9.65708L12.3563 13.474C12.4595 13.9066 11.9889 14.2485 11.6093 14.0167L8.26063 11.9713C8.10062 11.8736 7.89938 11.8736 7.73937 11.9713L4.39066 14.0167C4.01111 14.2485 3.54048 13.9066 3.64367 13.474L4.55414 9.65708C4.59764 9.4747 4.53546 9.28331 4.39306 9.16133L1.41298 6.60857C1.07521 6.31924 1.25497 5.76598 1.6983 5.73044L5.60971 5.41687C5.79661 5.40188 5.95941 5.2836 6.03142 5.11048L7.53834 1.48741Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>{isInUserActions.current[1] ? `${isInUserActions.current[1]}/10` : "Rate this movie"}</p>
                    </button>
                </span>

                <p className="description">{props.overview?.length > 0 ? props.overview : "No description available" }</p>

                {castInfo?.cast?.length > 0 
                    ? <span>
                        <ButtonWithArrow title="Top Cast" additionalClasses="castButton" onClick={() => toggleElementWD({element: allCastRef.current!, time: 200})}/>

                        <span className="cast">
                            {castStatus === "success" && cast}
                        </span>
                    </span>
                    : <p className="mt-5 text-xl">No cast available</p>
                }
            </span>
        </div>

        <span className="trailer mt-15 w-full p-[20px] z-1 bg-[var(--backgroundTransparentSecondary)] backdrop-blur-[18px] border-1 border-[var(--borderColorPrimary)] rounded-[20px]">
            <h2 className="text-[1.4rem] text-center">{trailer ? "Watch the trailer" : "No trailer available"}</h2>

            {trailer && <iframe src={`https://www.youtube.com/embed/${trailer ? trailer.key : ''}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-[calc(100%-40px)] aspect-[16/9] rounded-[12px] border-1 border-[var(--borderColorPrimary)] mt-3 mb-4 mx-auto" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        </span>

        <MoreCast ref={allCastRef} castInfo={castInfo} />

        <RatingPopup ref={ratingPopupRef} props={{name: "movie", id: props.id, currentRating: isInUserActions.current[1]}} />
    </>;
}

export default MovieInfoHolder;