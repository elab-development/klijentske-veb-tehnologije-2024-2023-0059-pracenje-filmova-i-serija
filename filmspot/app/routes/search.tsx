import { useEffect, useState } from "react";
import LightRays from 'app/components/ReachBitsLightRays';
import { useParams } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

function SearchPage(){
    const {searchParams} = useParams();

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

        <Header />

        <main className="movieInfoHolder min-h-[100dvh] max-w-[1400px] mx-auto z-3 relative">
            <h1 className="text-white text-2xl font-bold">Search "{searchParams}"</h1>
            <div className="filters">
                <span className="flex items-center gap-2">
                    <button className="button pl-1.5 pr-4 py-1.5 rounded-full flex gap-2"><span className="px-2 rounded-full">239</span>Movies</button>
                    <button className="button pl-1.5 pr-4 py-1.5 rounded-full flex gap-2"><span className="px-2 rounded-full">60</span>TV Shows</button>
                    <span className="dash"></span>
                </span>
            </div>
            <div id="searchResults">
                
            </div>
        </main>

        <Footer />
    </>
}

export default SearchPage;