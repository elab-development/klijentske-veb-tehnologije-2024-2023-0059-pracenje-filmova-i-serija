import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import type { Route } from "./+types/person";
import PersonHolder from "~/components/personPage/PersonHolder";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "FilmSpot" },
        { name: "description", content: "Actor information" },
    ];
}

const queryClient = new QueryClient();

function Person(){
    const {id} = useParams();

    return <>
        <QueryClientProvider client={queryClient}>
            <Header />

            <main className="movieInfoHolder w-full max-w-[1400px] mx-auto mt-10">
                {id && <PersonHolder props={{id}} />}
            </main>

            <Footer />
        </QueryClientProvider>
    </>
}

export default Person;