import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import type { Route } from "./+types/person";
import PersonHolder from "~/components/personPage/PersonHolder";
import LightRays from "~/components/ReachBitsLightRays";

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
        <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={.5}
            lightSpread={1}
            rayLength={5}
            followMouse={true}
            mouseInfluence={0.025}
            noiseAmount={0.1}
            distortion={0.1}
            className="custom-rays !fixed brightness-170"
        />
        <QueryClientProvider client={queryClient}>
            <Header />

            <main className="movieInfoHolder w-full max-w-[1400px] mt-5 mx-auto z-40">
                {id && <PersonHolder props={{id}} />}
            </main>

            <Footer />
        </QueryClientProvider>
    </>
}

export default Person;