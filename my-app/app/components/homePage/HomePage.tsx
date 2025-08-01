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
            raysSpeed={1.2}
            lightSpread={0.3}
            rayLength={10}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.1}
            className="custom-rays !absolute"
        />

        <Header />

        <main id="moviesHolder" className="min-h-[100dvh] max-w-[1700px] mx-auto">
            <Top5 />

            <Trending />

            <Footer />
        </main>
    </>;
}