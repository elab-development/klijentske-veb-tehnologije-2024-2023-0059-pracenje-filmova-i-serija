import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import MovieHolder from "~/components/moviePage/MovieHolder";
import type { MovieInfo } from "~/types";

const queryClient = new QueryClient();

function MoviePage(){
    const {URLParams} = useParams();

    return <>
        <QueryClientProvider client={queryClient}>
            <Header />

            <main className="movieInfoHolder min-h-[100dvh] max-w-[1400px] mx-auto">
                {URLParams && <MovieHolder URLParams={URLParams} />}
            </main>

            <Footer />
        </QueryClientProvider>
    </>
}

export default MoviePage;