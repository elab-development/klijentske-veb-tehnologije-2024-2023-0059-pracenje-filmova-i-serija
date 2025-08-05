import Header from "~/components/Header";
import type { Route } from "./+types/about";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "Welcome to FilmSpot!" },
  ];
}

export default function Home() {
  return <>
        <Header />

        <main className="w-full max-w-[1400px] mx-auto min-h-[80dvh]">
            <p>Welcome to FilmSpot! We are a passionate team of film enthusiasts dedicated to sharing the love of the seventh art. Our goal is to provide you with the latest information about movies, including descriptions, trailers and reviews. Enjoy exploring the world of film with us and find your next favorite title. FilmSpot - Where passion and film meet!</p>
            <p className="mt-5">Contact: <a className="text-[var(--textAccentColor)]" href="mailto:contact@filmspot.com">contact@filmspot.com</a></p>
        </main>

        <Footer />
  </>;
}