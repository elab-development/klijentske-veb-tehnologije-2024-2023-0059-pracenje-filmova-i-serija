import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import MovieInfoHolder from "~/components/moviePage/MovieInfoHolder";
import SameGenreMovies from "~/components/moviePage/SameGenreMovies";
import SimilarMovies from "~/components/moviePage/SimilarMovies";
import type { MovieCardProps } from "~/types";

function MoviePage(){
    const {id} = useParams();
    const [movieInfo, setMovieInfo] = useState<MovieCardProps>();

    useEffect(() => {
        setMovieInfo(JSON.parse(localStorage.getItem("moviesList") ?? '')?.[id ?? 0]);
    }, [])

    return <>
        <Header />

        <main className="movieInfoHolder min-h-[100dvh] max-w-[1400px] mx-auto">
            {movieInfo
                ? <>
                    <MovieInfoHolder props={movieInfo} />
                    <SimilarMovies /> 
                    <SameGenreMovies /> 
                </>
                : <h2>Ucitavanje</h2>
            }
        </main>

        <Footer />
    </>
}

export default MoviePage;