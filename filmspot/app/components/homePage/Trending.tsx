import MovieSection from "../MovieSection";
import MovieCard from "~/classes/MovieCardClass";
import { useContext } from "react";
import { MovieContext } from "./HomePage";

function Trending(){
    const movieList = useContext(MovieContext);

    const moviesList = Object.entries(movieList ?? {}).slice(5)?.map(([id, item], index) => {
        return (
            <div className="topMovie">
                <MovieCard {...{...item, id: id}} />
            </div>
        );
    })

    return (
        <MovieSection props={{
            id: "trending",
            class: "mt-15",
            image: (
                <svg width="25" height="25" viewBox="0 0 42 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18.6667L12 8.66667L18.6667 15.3333L32 2M32 2V10.3333M32 2H23.6667" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            ),
            title: "Currently Trending",
            content: moviesList
        }} />
    );
}

export default Trending;