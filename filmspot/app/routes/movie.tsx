import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import MovieHolder from "~/components/moviePage/MovieHolder";
import type { Route } from "./+types/movie";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "FilmSpot" },
        { name: "description", content: "Movie page" },
    ];
}

const queryClient = new QueryClient();

function MoviePage(){
    const {URLParams} = useParams();

    return <>
        <QueryClientProvider client={queryClient}>
            <Header />

            <main className="movieInfoHolder w-full max-w-[1400px] mx-auto mt-10">
                {URLParams && <MovieHolder URLParams={URLParams} />}
            </main>

            <Footer />
        </QueryClientProvider>
    </>
}

export default MoviePage;