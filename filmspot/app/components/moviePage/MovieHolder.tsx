import { useQuery } from "@tanstack/react-query";
import MovieInfoHolder from "~/components/moviePage/MovieInfoHolder";
import { getSingle } from "../../APICalls";
import type { MovieHolderInfo } from "~/types";
import SimilarOrRecommended from "./SimilarOrRecommended";
import MovieHolderLoadingTemplate from "./MovieHolderLoadingTemplate";

function MovieHolder({URLParams}: {URLParams: any}){
    const [type, id] = URLParams?.split(".") ?? [0, "movie"];
    const { data: movieInfo } = useQuery({queryKey: [`${type}${id}`], queryFn: () => getSingle({id: id, type: type})})

    return <>
        {movieInfo
            ? <>
                <MovieInfoHolder props={{...movieInfo as MovieHolderInfo, type: type}} />
                <SimilarOrRecommended props={{title: "Similar", type: type, id: id, isSimilar: false}} />
                <SimilarOrRecommended props={{title: "More from the same genre", type: type, id: id, isSimilar: true}} />
            </>
            : <MovieHolderLoadingTemplate />
        }
        
    </>;
}

export default MovieHolder;