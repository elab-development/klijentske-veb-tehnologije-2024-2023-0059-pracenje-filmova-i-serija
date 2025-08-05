import Header from "~/components/Header";
import type { Route } from "./+types/about";
import Footer from "~/components/Footer";
import LightRays from "~/components/ReachBitsLightRays";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "About Filmspot!" },
  ];
}

export default function Home() {
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

        <main className="w-full max-w-[1400px] mx-auto z-40">
            <h2 className="text-2xl text-white font-bold mt-5">About FilmSpot</h2>
            <p className="mt-5">Welcome to FilmSpot! We are a passionate team of film enthusiasts dedicated to sharing the love of the seventh art. Our goal is to provide you with the latest information about movies, including descriptions, trailers and reviews. Enjoy exploring the world of film with us and find your next favorite title. FilmSpot - Where passion and film meet!</p>
            <p className="mt-2">Contact: <a className="text-[var(--textAccentColor)] hover:brightness-80" href="mailto:contact@filmspot.com">contact@filmspot.com</a></p>
            <h2 className="mt-15 text-2xl text-white font-bold">Terms of Use</h2>
            <p className="text-[var(--textSecondaryColor)]">Welcome to FilmSpot. By accessing or using this website, you agree to be bound by these Terms of Use. Please read them carefully.</p>
            <h2 className="font-bold mt-5">1. Use of FilmSpot</h2>
            <ul className="text-[var(--textSecondaryColor)]">
              <li>You must be at least 13 years old to use FilmSpot.</li>
              <li>Do not use the site for any illegal or unauthorized purposes.</li>
              <li>You agree not to scrape, crawl, or use bots to collect content or interfere with our systems.</li>
            </ul>

            <h2 className="font-bold mt-5">2. Content and Copyright</h2>
            <p className="text-[var(--textSecondaryColor)]">All content on FilmSpot, including logos, UI elements, and code, is the property of FilmSpot or its licensors. You may not copy or distribute any part of the service without permission.</p>

            <h2 className="font-bold mt-5">3. User Contributions</h2>
            <p className="text-[var(--textSecondaryColor)]">You may submit reviews, ratings, and watchlists. You retain ownership of your content but grant us a non-exclusive right to use, display, and distribute it within the platform.</p>

            <h2 className="font-bold mt-5">4. Disclaimers</h2>
            <p className="text-[var(--textSecondaryColor)]">FilmSpot provides movie and TV data using third-party APIs such as TMDB. We are not responsible for inaccuracies, outages, or data discrepancies.</p>

            <h2 className="font-bold mt-5">5. Modifications</h2>
            <p className="text-[var(--textSecondaryColor)]">We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting.</p>
        </main>

        <Footer />
  </>;
}