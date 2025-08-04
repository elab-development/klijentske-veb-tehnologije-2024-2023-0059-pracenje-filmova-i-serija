import { useQuery } from "@tanstack/react-query";
import ButtonWithArrow from "../ButtonWithArrow";
import ContentType from "../ContentType";
import { getSimilarOrRecommended } from "../APICalls";
import type { MovieInfo } from "~/types";

type Props = {
    title: string,
    type: "movie" | "tv",
    id: string | number,
    isSimilar: boolean
}

function SimilarOrRecommended({props}: {props: Props}){
    const { status, error, data: moreContent } = useQuery({queryKey: [`${props.isSimilar ? "Similar" : "Recommended"}${props.type}${props.id}`], queryFn: () => getSimilarOrRecommended({id: props.id, type: props.type, isSimilar: props.isSimilar})})
    const more = moreContent?.map((item: MovieInfo) => {
        return <>
            <a href={`/content/${props.type}.${item.id}`} className="contentItem">
                <img src={`${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${item.poster_path}`} alt="Banner" />

                <span>
                    <h3>{item.title}</h3>
                    <ContentType type={props.type} />
                </span>

                <span className="bottomShadow"></span>
            </a>
        </>
    })

    return <>
        {status === "success" && more.length > 0 &&
            <div className="similarMovies mt-[50px] z-1">
                <ButtonWithArrow title={props.title}/>

                <span className="relative">
                    <span className="content">
                        {more}
                    </span>

                    <button className="button">
                        <svg className="ml-[-4px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.9834 23.1334L2.71676 12.8668L12.9834 2.6001" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button className="button right">
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