import Footer from "../Footer";
import Header from "../Header";
import Top5 from "./Top5";
import LightRays from 'app/components/ReachBitsLightRays';
import Trending from "./Trending";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Upcoming from "./Upcoming";
import { useState } from "react";

const queryClient = new QueryClient();

export default function HomePage(){
    const [type, setType] = useState<"movie" | "tv">("movie");

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

            <input className="mt-20 w-20 h-20" type="checkbox" onChange={() => setType(prev => prev === "movie" ? "tv" : "movie")}/>

            <main id="moviesHolder" className="w-full max-w-[1400px] mx-auto">
                <Top5 type={type} />

                <Upcoming type={type} />

                <Trending type={type} />
            </main>

            <Footer />
        </QueryClientProvider>
    </>;
}