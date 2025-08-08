import Top5MovieCard from "~/classes/Top5MovieCardClass";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "../../APICalls";
import MovieSection from "../MovieSection";

function Top5({type}: {type: "movie" | "tv"}){
    const { data: top5MoviesList } = useQuery({queryKey: [`top5${type}`], queryFn: () => getContent({type: type, content: "trending"})})

    const top5 = top5MoviesList?.slice(0, 5)?.map((item, index) => {
        return (
            <div key={item.id} className="topMovie">
                <Top5MovieCard {...{...item, index: index}}/>
            </div>
        );
    })

    return (
        <MovieSection props={{
            id: "top5",
            image: (
                <svg width="25" height="25" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.852 13.8644C24.9695 15.0813 23.838 15.8124 22.6042 15.8124C19.7852 15.8124 17.5 11.996 17.5 7.28816C17.5 6.53111 17.5591 5.79711 17.67 5.09832L17.5 4.9176L9.83297 13.0658C5.59861 17.5659 5.59861 24.862 9.83297 29.3621C14.0673 33.8622 20.9326 33.8622 25.1669 29.3621C29.1591 25.1194 29.3874 18.3914 25.852 13.8644Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.5833 25.1116L17.5 22.0119L20.4167 25.1116C22.0275 26.8235 22.0275 29.5991 20.4167 31.311C18.8058 33.0229 16.1942 33.0229 14.5833 31.311C12.9725 29.5991 12.9725 26.8235 14.5833 25.1116Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: "Trending This Week",
            content: top5
        }} />
    )
}

export default Top5;