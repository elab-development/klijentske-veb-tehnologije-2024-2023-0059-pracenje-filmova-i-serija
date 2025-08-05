import { useQuery } from "@tanstack/react-query";
import ButtonWithArrow from "../ButtonWithArrow";
import ContentType from "../ContentType";
import { getSimilarOrRecommended } from "../../APICalls";
import type { MovieInfo } from "~/types";
import NoBanner from "app/assets/NoBanner.png";
import MovieSlider from "../MovieSlider";

type Props = {
    title: string,
    type: "movie" | "tv",
    id: string | number,
    isSimilar: boolean
}

function SimilarOrRecommended({props}: {props: Props}){
    const { status, error, data: moreContent } = useQuery({queryKey: [`${props.isSimilar ? "Similar" : "Recommended"}${props.type}${props.id}`], queryFn: () => getSimilarOrRecommended({id: props.id, type: props.type, isSimilar: props.isSimilar})})
    
    const more = moreContent?.map((item: MovieInfo) => {
        return (
            <a key={item.id} href={`/content/${props.type}.${item.id}`} className="contentItem">
                <span className="topShadow"></span>
                
                <img src={item.poster_path?.length > 0 ? `${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${item.poster_path}` : NoBanner} alt="Banner" />

                <span>
                    <h3>{item.title}</h3>
                    <ContentType type={props.type} />
                </span>

                <button className="bookmark absolute button z-1">
                    <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H12C13.1046 1 14 1.89543 14 3V17.6779C14 18.5555 12.9505 19.0074 12.3129 18.4045L7.5 13.8529L2.68711 18.4045C2.04954 19.0074 1 18.5555 1 17.6779V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <span className="bottomShadow"></span>
            </a>
        );
    })

    return <>
        {status === "success" && more.length > 0 &&
            <div className="similarMovies mt-[50px] z-1">
                <ButtonWithArrow title={props.title}/>

                <MovieSlider props={{content: more, scrollValue: 1000}} />
            </div>
        }
    </>;
}

export default SimilarOrRecommended;