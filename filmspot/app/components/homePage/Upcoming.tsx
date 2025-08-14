import { useQuery } from "@tanstack/react-query";
import { getContent } from "../../APICalls";
import MovieCard from "~/classes/MovieCardClass";
import MovieSection from "../MovieSection";

function Upcoming({type}: {type: "movie" | "tv"}){
    const { data: upcomingList } = useQuery({queryKey: [`upcoming${type}`], queryFn: () => getContent({type: type, content: "upcoming", page: 1})})

    const upcoming = upcomingList?.slice(0, 10)?.map(item => {
        return (
            <div key={item.id} className="topMovie">
                <MovieCard {...{...item, media_type: type}}/>
            </div>
        );
    })

    return (
        <MovieSection props={{
            id: "upcoming",
            image: (
                <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 13.75C11.7728 13.75 16.25 18.2272 16.25 23.75M6.25 6.25C15.915 6.25 23.75 14.085 23.75 23.75M8.75 22.5C8.75 23.1904 8.19036 23.75 7.5 23.75C6.80964 23.75 6.25 23.1904 6.25 22.5C6.25 21.8096 6.80964 21.25 7.5 21.25C8.19036 21.25 8.75 21.8096 8.75 22.5Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Upcoming Releases",
            content: upcoming
        }} />
    )
}

export default Upcoming;