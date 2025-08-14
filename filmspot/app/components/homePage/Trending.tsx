import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";
import MovieCard from "~/classes/MovieCardClass";
import { getContent } from "../../APICalls";
import MovieSection from "../MovieSection";

function Trending({type}: {type: "movie" | "tv"}){
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: [`popular${type}`], 
        queryFn: ({ pageParam = 1 }) => getContent({type: type, content: "popular", page: pageParam}),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || !Array.isArray(lastPage)) {
                return undefined;
            }
            
            const currentPage = allPages.length;
            const hasMore = lastPage.length === 20;
            return hasMore ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 0, // Data is considered stale immediately
        gcTime: 0 // Garbage collect immediately when component unmounts
    });

    const allMovies = data?.pages?.flat() || [];

    const handleScroll = useCallback(() => {
        // Check if we're near the bottom of the page
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        
        // Trigger load when user is within 1000px of the bottom
        const threshold = 1000;
        
        if (scrollHeight - scrollTop <= clientHeight + threshold) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const movies = allMovies?.map(item => {
        return (
            <div key={item.id} className="topMovie">
                <MovieCard {...{...item, media_type: type}} />
            </div>
        );
    });

    return (
        <>
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
            
            {isFetchingNextPage && (
                <div className="text-center p-5 text-white">
                    Loading more movies...
                </div>
            )}
            
            {!hasNextPage && allMovies.length > 0 && (
                <div className="text-center p-5 text-white">
                    There's nothing more to load
                </div>
            )}
        </>
    );
}

export default Trending;