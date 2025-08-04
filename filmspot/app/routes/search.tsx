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
            <div className="filters mt-2">
                <button className="button selected"><span>239</span>Movies</button>
                <button className="button"><span>60</span>TV Shows</button>
                <span className="dash"></span>
                <button className="button dropdown relative">Genre
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.16668 7.125L9.50001 13.4583L15.8333 7.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <select className="absolute bg-[#1E1E2F] top-0 left-0 w-full h-full opacity-0 cursor-pointer" name="genre" id="genreSelect">
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                    </select>
                </button>
                <button className="button dropdown">Year
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.16668 7.125L9.50001 13.4583L15.8333 7.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <select className="absolute bg-[#1E1E2F] top-0 left-0 w-full h-full opacity-0 cursor-pointer" name="year" id="yearSelect">
                        {Array.from({ length: 2025 - 1950 + 1 }, (_, idx) => {
                            const year = 2025 - idx;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                </button>
                <button className="button dropdown">Rating
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.16668 7.125L9.50001 13.4583L15.8333 7.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <select className="absolute bg-[#1E1E2F] top-0 left-0 w-full h-full opacity-0 cursor-pointer" name="genre" id="genreSelect">
                        <option value="7.5">7.5 - 10</option>
                        <option value="5">5 - 7.5</option>
                        <option value="2.5">2.5 - 5</option>
                        <option value="0">0 - 2.5</option>
                    </select>
                </button>
            </div>
            <div id="searchResults">
                
            </div>
        </main>

        <Footer />
    </>
}

export default SearchPage;