import LightRays from "~/components/ReachBitsLightRays";
import type { Route } from "./+types/profile";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "Profile page" },
  ];
}

export default function Profile(){
    return (
      <>
        <LightRays raysOrigin="top-center" raysColor="#00ffff" raysSpeed={0.5} lightSpread={1} rayLength={5} followMouse mouseInfluence={0.025} noiseAmount={0.1} distortion={0.1} className="custom-rays !fixed brightness-170" />
        <Header />
        <main className="min-h-[100dvh] max-w-[1400px] mx-auto z-3 relative">
          <h2 className="text-3xl font-bold mb-2">Profile</h2>
          <div className="profile-info w-fit flex bg-white/10 overflow-hidden rounded-3xl border border-[var(--borderColorPrimary)]">
            <img className="w-[250px] h-[250px]" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg" alt="Profile Photo" />
            <section className="profile-details p-6 border-l border-[var(--borderColorSecondary)]">
              <h2 className="text-2xl font-bold mb-[-5px]">Test Profile</h2>
              <p className="text-[var(--textSecondaryColor)] text-lg">email@test.com</p>
              <span className="flex gap-3 mt-2">
                <button className="button bg-[#43DFD7] text-black px-5 py-1 rounded-full">Edit Profile</button>
                <button className="button bg-[#DF354B] text-white px-5 py-1 rounded-full">Logout</button>
              </span>
            </section>
            <section className="profile-stats p-6 border-l border-[var(--borderColorSecondary)] flex flex-col gap-2">
                <p className="text-[var(--textSecondaryColor)]">Movies Watched: <span className="text-white font-bold float-end ml-7">120</span></p>
                <p className="text-[var(--textSecondaryColor)]">Member Since: <span className="text-white font-bold float-end ml-7">Aug 2025</span></p>
                <p className="text-[var(--textSecondaryColor)]">Movies Rated: <span className="text-white font-bold float-end ml-7">19</span></p>
            </section>
          </div>

          <h2 className="text-3xl font-bold mb-2 mt-10">My Watchlist</h2>
          <div id="searchResults" className="flex flex-col gap-6 mt-6">
            <a href="#" className="searchResult movieSearchResult flex gap-4">
                  <img className="w-[120px] rounded-xl border border-[var(--borderColorPrimary)]" src={`https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg`} alt="test" />
                  <div>
                    <h2>Test title</h2>
                    <div className="tags flex flex-wrap gap-2 mt-1">
                      <span className="genreTag">Genre1</span>
                      <span className="genreTag">Genre2</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aut, magnam natus quis dignissimos architecto quidem distinctio dolor rerum laboriosam expedita veritatis explicabo corrupti reprehenderit placeat minima, voluptates ab nostrum.</p>
                  </div>
            </a>
            <a href="#" className="searchResult movieSearchResult flex gap-4">
                  <img className="w-[120px] rounded-xl border border-[var(--borderColorPrimary)]" src={`https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg`} alt="test" />
                  <div>
                    <h2>Test title</h2>
                    <div className="tags flex flex-wrap gap-2 mt-1">
                      <span className="genreTag">Genre1</span>
                      <span className="genreTag">Genre2</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aut, magnam natus quis dignissimos architecto quidem distinctio dolor rerum laboriosam expedita veritatis explicabo corrupti reprehenderit placeat minima, voluptates ab nostrum.</p>
                  </div>
            </a>
            <a href="#" className="searchResult movieSearchResult flex gap-4">
                  <img className="w-[120px] rounded-xl border border-[var(--borderColorPrimary)]" src={`https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91227.jpg&fm=jpg`} alt="test" />
                  <div>
                    <h2>Test title</h2>
                    <div className="tags flex flex-wrap gap-2 mt-1">
                      <span className="genreTag">Genre1</span>
                      <span className="genreTag">Genre2</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aut, magnam natus quis dignissimos architecto quidem distinctio dolor rerum laboriosam expedita veritatis explicabo corrupti reprehenderit placeat minima, voluptates ab nostrum.</p>
                  </div>
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
}