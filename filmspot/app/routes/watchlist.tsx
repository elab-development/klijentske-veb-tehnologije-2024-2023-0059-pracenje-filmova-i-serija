import LightRays from "~/components/ReachBitsLightRays";
import type { Route } from "./+types/watchlist";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ProfileWatchlist from "~/components/watchlistPage/ProfileWatchlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileInfo from "~/components/watchlistPage/ProfileInfo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Watchlist" },
    { name: "description", content: "Profile page" },
  ];
}

const queryClient = new QueryClient();

export default function Watchlist(){
  return <>
      <LightRays raysOrigin="left" raysColor="#00ffff" raysSpeed={0.25} lightSpread={1} rayLength={5} followMouse mouseInfluence={0.1} noiseAmount={0.1} distortion={0.4} className="custom-rays !fixed brightness-170" />
      
      <Header />

      <main className="w-full max-w-[1400px] mx-auto z-3 relative">
        <QueryClientProvider client={queryClient}>
          <ProfileInfo />
        </QueryClientProvider>

        <h2 className="text-3xl font-bold mb-2 mt-10">My Watchlist</h2>
        <ProfileWatchlist />
      </main>

      <Footer />
  </>;
}