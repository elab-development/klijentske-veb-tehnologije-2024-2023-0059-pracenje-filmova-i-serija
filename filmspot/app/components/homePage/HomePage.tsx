import Footer from "../Footer";
import Header from "../Header";
import Top5 from "./Top5";
import LightRays from 'app/components/ReachBitsLightRays';
import Trending from "./Trending";

export default function HomePage(){
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

        <main id="moviesHolder" className="min-h-[100dvh] max-w-[1400px] mx-auto">
            <Top5 />

            <Trending />
        </main>

        <Footer />
    </>;
}