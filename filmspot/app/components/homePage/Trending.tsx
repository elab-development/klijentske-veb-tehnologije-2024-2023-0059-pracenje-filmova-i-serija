import { useQuery } from "@tanstack/react-query";
import MovieCard from "~/classes/MovieCardClass";
import { getContent } from "../../APICalls";
import MovieSection from "../MovieSection";

function Trending(){
    const { status, error, data: moviesList } = useQuery({queryKey: ["popular"], queryFn: () => getContent({type: "movie", content: "popular"})})

    const movies = moviesList?.map(item => {
        return (
            <div key={item.id} className="topMovie">
                <MovieCard {...{...item, media_type: "movie"}} />
            </div>
        );
    })

    return (
        <MovieSection props={{
            id: "trending",
            class: "mt-15",
            image: (
                <svg width="25" height="25" viewBox="0 0 42 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18.6667L12 8.66667L18.6667 15.3333L32 2M32 2V10.3333M32 2H23.6667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Currently Trending",
            content: movies
        }} />
    )
}

export default Trending;