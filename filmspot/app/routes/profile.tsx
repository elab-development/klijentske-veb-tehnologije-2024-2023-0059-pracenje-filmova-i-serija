import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FilmSpot" },
    { name: "description", content: "Profile page" },
  ];
}

export default function Profile(){
    return (
        <h1>Profile</h1>
    );
}