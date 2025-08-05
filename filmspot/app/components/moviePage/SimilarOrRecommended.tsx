import { useQuery } from "@tanstack/react-query";
import ButtonWithArrow from "../ButtonWithArrow";
import ContentType from "../ContentType";
import { getSimilarOrRecommended } from "../APICalls";
import type { MovieInfo } from "~/types";
import { useRef, useEffect } from "react";

type Props = {
    title: string,
    type: "movie" | "tv",
    id: string | number,
    isSimilar: boolean
}

function SimilarOrRecommended({props}: {props: Props}){
    const { status, error, data: moreContent } = useQuery({queryKey: [`${props.isSimilar ? "Similar" : "Recommended"}${props.type}${props.id}`], queryFn: () => getSimilarOrRecommended({id: props.id, type: props.type, isSimilar: props.isSimilar})})
    
    const scrollRef = useRef<HTMLSpanElement>(null);
    const scrollBy = (offset: number) => {
        if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const atStart = el.scrollLeft <= 5;
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

            el.classList.toggle("no-left", atStart);
            el.classList.toggle("no-right", atEnd);
        };

        el.addEventListener("scroll", handleScroll);
        handleScroll(); // initial

        return () => el.removeEventListener("scroll", handleScroll);
    }, []);
    
    const more = moreContent?.map((item: MovieInfo) => {
        return <>
            <a href={`/content/${props.type}.${item.id}`} className="contentItem">
                <span className="topShadow"></span>
                
                <img src={`${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${item.poster_path}`} alt="Banner" />

                <span>
                    <h3>{item.title}</h3>
                    <ContentType type={props.type} />
                </span>

                <button className="bookmark absolute button z-1">
                    <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H12C13.1046 1 14 1.89543 14 3V17.6779C14 18.5555 12.9505 19.0074 12.3129 18.4045L7.5 13.8529L2.68711 18.4045C2.04954 19.0074 1 18.5555 1 17.6779V3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <span className="bottomShadow"></span>
            </a>
        </>
    })

    return <>
        {status === "success" && more.length > 0 &&
            <div className="similarMovies mt-[50px] z-1">
                <ButtonWithArrow title={props.title}/>

                <span className="relative">
                    <span className="content fade-mask" ref={scrollRef}>
                        {more}
                    </span>

                    <button className="button" onClick={() => scrollBy(-1000)}>
                        <svg className="ml-[-4px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.9834 23.1334L2.71676 12.8668L12.9834 2.6001" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button className="button right" onClick={() => scrollBy(1000)}>
                        <svg className="mr-[-2px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01672 23.1334L12.2834 12.8668L2.01672 2.6001" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </span>

                <span className="rightShadow"></span>
            </div>
        }
    </>;
}

export default SimilarOrRecommended;