import { useQuery } from "@tanstack/react-query";
import MovieInfoHolder from "~/components/moviePage/MovieInfoHolder";
import SameGenreMovies from "~/components/moviePage/SameGenreMovies";
import SimilarMovies from "~/components/moviePage/SimilarMovies";
import { getSingle } from "../APICalls";

function MovieHolder({URLParams}: {URLParams: any}){
    const [type, id] = URLParams?.split(".") ?? [0, "movie"];
    const { status, error, data: movieInfo } = useQuery({queryKey: [`${type}${id}`], queryFn: () => getSingle({id: id, type: type})})

    return <>
        {status === "success"
            ? <>
                <MovieInfoHolder props={movieInfo} />
                <SimilarMovies />
                <SameGenreMovies />
            </>
            : <h2>Ucitavanje</h2>
        }
    </>;
}

export default MovieHolder;