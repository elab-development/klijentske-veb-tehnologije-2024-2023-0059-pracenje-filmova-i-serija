import HomePage from "~/components/homePage/HomePage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "Welcome to FilmSpot!" },
  ];
}

export default function Home() {
  return (
    <HomePage />
  );
}
