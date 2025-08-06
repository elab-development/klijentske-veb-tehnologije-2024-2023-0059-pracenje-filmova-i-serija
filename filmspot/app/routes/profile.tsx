import LightRays from "~/components/ReachBitsLightRays";
import type { Route } from "./+types/profile";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ProfileWatchlist from "~/components/profilePage/profileWatchlist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "Profile page" },
  ];
}

export default function Profile(){
    return <>
        <LightRays raysOrigin="left" raysColor="#00ffff" raysSpeed={0.25} lightSpread={1} rayLength={5} followMouse mouseInfluence={0.1} noiseAmount={0.1} distortion={0.4} className="custom-rays !fixed brightness-170" />
        
        <Header />

        <main className="w-full min-h-[100dvh] max-w-[1400px] mx-auto z-3 relative">
          <h2 className="text-3xl font-bold mb-2">Profile</h2>
          
          <div className="profile-info w-fit flex bg-white/10 overflow-hidden rounded-3xl border border-[var(--borderColorPrimary)]">
            <img className="w-[180px] h-[180px]" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg" alt="Profile Photo" />
            
            <section className="profile-details p-6 border-l border-[var(--borderColorSecondary)] place-content-center">
              <h2 className="text-[1.8rem] font-medium mb-[-10px] max-w-[40dvw] overflow-hidden text-ellipsis whitespace-nowrap">Test Profile</h2>
              <p className="text-[var(--textSecondaryColor)] text-lg font-light">email@test.com</p>
              <span className="flex gap-3 mt-3">
                <button className="button bg-[#43DFD7] text-black pl-4 pr-5 py-1 rounded-full flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 5.27273L17.0455 8M1.5 20V17.2727L16.2596 3.28998C17.0232 2.56654 18.2192 2.56654 18.9829 3.28998V3.28998C19.8072 4.0709 19.8072 5.38365 18.9829 6.16457L4.37879 20H1.5Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit Profile
                  </button>
                <button className="button bg-[#DF354B] text-white pl-4 pr-5 py-1 rounded-full flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Logout
                </button>
              </span>
            </section>

            <section className="profile-stats p-6 border-l border-[var(--borderColorSecondary)] flex justify-center flex-col gap-1.5 shrink-0">
              <p className="text-[var(--textSecondaryColor)] font-light">Movies Watched: <span className="text-white font-medium float-end ml-7">120</span></p>
              <p className="text-[var(--textSecondaryColor)]">Member Since: <span className="text-white font-medium float-end ml-7">Aug 2025</span></p>
              <p className="text-[var(--textSecondaryColor)]">Movies Rated: <span className="text-white font-medium float-end ml-7">19</span></p>
            </section>
          </div>

          <h2 className="text-3xl font-bold mb-2 mt-10">My Watchlist</h2>
          <ProfileWatchlist />
        </main>

        <Footer />
    </>;
}