import Footer from "../Footer";
import Header from "../Header";
import Top5 from "./Top5";
import LightRays from 'app/components/ReachBitsLightRays';
import Trending from "./Trending";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Upcoming from "./Upcoming";
import { useCallback, useRef, useState } from "react";

const queryClient = new QueryClient();

export default function HomePage(){
    const [type, setType] = useState<"movie" | "tv">("movie");
    const typeSwitchRef = useRef<HTMLButtonElement>(null);
    const typeSwitchBgRef = useRef<HTMLSpanElement>(null);
    const movieButtonRef = useRef<HTMLParagraphElement>(null);
    const tvButtonRef = useRef<HTMLParagraphElement>(null);

    const typeHandle = useCallback(() => {
        if(type !== "movie"){
            setType("movie");
            typeSwitchRef.current?.classList.remove("open");
            typeSwitchBgRef.current?.setAttribute("data-width", `${movieButtonRef.current?.offsetWidth! + 34}`);
        }else{
            setType("tv");
            typeSwitchRef.current?.classList.add("open");
            typeSwitchBgRef.current?.setAttribute("data-width", `${tvButtonRef.current?.offsetWidth! + 31}`);
        }
    }, [type])

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

            <main id="moviesHolder" className="w-full max-w-[1400px] mx-auto">
                <button ref={typeSwitchRef} id="typeSwitch" className="flex relative gap-[25px] z-40" onClick={typeHandle}>
                    <span className="indicatorHolder">
                        <div>
                            <span ref={typeSwitchBgRef} data-width="79"></span>
                        </div>
                    </span>

                    <p ref={movieButtonRef} className="z-1 pt-[1px] text-[.8rem] font-light">MOVIES</p>
                    <p ref={tvButtonRef} className="z-1 pt-[1px] text-[.8rem] font-light">TV SHOWS</p>
                </button>

                <Top5 type={type} />

                <Upcoming type={type} />

                <Trending type={type} />
            </main>

            <Footer />
        </QueryClientProvider>
    </>;
}