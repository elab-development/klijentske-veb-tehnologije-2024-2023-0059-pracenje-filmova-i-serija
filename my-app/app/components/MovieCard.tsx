import { useRef } from "react";
import type { MovieCardProps } from "~/types";

function MovieCard({props}: {props: MovieCardProps}){
    console.log("renderedf")

    const movieCardRef = useRef<HTMLAnchorElement>(null);
    const moveCardMoreInfoRef = useRef<HTMLSpanElement>(null);
    const movieCardBookmarkRef = useRef<HTMLButtonElement>(null);
    const moveCardDescriptionRef = useRef<HTMLParagraphElement>(null);

    let hideTimeout: ReturnType<typeof setTimeout>;
    let displayTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;

    const hoverHandler = () => {
        if(hideTimeout)
            clearTimeout(hideTimeout);

        movieCardBookmarkRef.current?.classList.remove("hidden");
        moveCardDescriptionRef.current?.classList.remove("hidden");

        if(displayTimeout)
            clearTimeout(displayTimeout);

        openTimeout = setTimeout(() => {
            moveCardMoreInfoRef.current?.classList.add("open");
        }, 10);
    }
    const hoverEndHandler = () => {
        hideTimeout = setTimeout(() => {
            moveCardMoreInfoRef.current?.classList.remove("open");

            if(openTimeout)
                clearTimeout(openTimeout);
            
            displayTimeout = setTimeout(() => {
                movieCardBookmarkRef.current?.classList.add("hidden");
                moveCardDescriptionRef.current?.classList.add("hidden");
            }, 200);
        }, 200);
    }

    return (
        <a href="/stranica" ref={movieCardRef} className="movieCard relative" onMouseEnter={hoverHandler} onMouseLeave={hoverEndHandler}>
            <img src={props.banner} alt="Background" />

            <span ref={moveCardMoreInfoRef} className="moreInfo absolute left-0 w-full h-full pointer-events-none">
                <span className="flex justify-between relative">
                    <span className="w-full">
                        <h3>{props.title}</h3>

                        <span className="flex h-fit items-center gap-1">
                            <span className="type" style={{backgroundColor: `${props.type === 0 ? "#5B3B02" : "#03405A"}`}}>
                                {props.type === 0 ? "MOVIE" : "TV SHOW"}
                            </span>

                            <span className="flex gap-0.5 items-center">
                                <svg width="13" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.20501 1.10996C6.3758 0.699318 6.95753 0.699318 7.12833 1.10996L8.40349 4.17582C8.47549 4.34893 8.63829 4.46722 8.82519 4.4822L12.135 4.74755C12.5784 4.78309 12.7581 5.33635 12.4204 5.62568L9.8986 7.78583C9.75621 7.90781 9.69402 8.09919 9.73753 8.28157L10.508 11.5114C10.6112 11.944 10.1405 12.286 9.76098 12.0541L6.92729 10.3233C6.76729 10.2256 6.56605 10.2256 6.40604 10.3233L3.57235 12.0541C3.1928 12.286 2.72218 11.944 2.82537 11.5114L3.59581 8.28157C3.63931 8.09919 3.57712 7.90781 3.43473 7.78583L0.912978 5.62568C0.57521 5.33635 0.754972 4.78309 1.1983 4.74755L4.50814 4.4822C4.69504 4.46722 4.85784 4.34893 4.92985 4.17582L6.20501 1.10996Z" stroke="#43DFD7" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>{props.rating}/10</p>
                            </span>
                        </span>
                    </span>

                    <button ref={movieCardBookmarkRef} className="bookmark absolute right-0 button">
                        <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H12C13.1046 1 14 1.89543 14 3V17.6779C14 18.5555 12.9505 19.0074 12.3129 18.4045L7.5 13.8529L2.68711 18.4045C2.04954 19.0074 1 18.5555 1 17.6779V3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </span>

                <p ref={moveCardDescriptionRef} className="description">{props.description ?? "No description"}</p>
            </span>
            <span className="bottomShadow"></span>
        </a>
    );
}

export default MovieCard;