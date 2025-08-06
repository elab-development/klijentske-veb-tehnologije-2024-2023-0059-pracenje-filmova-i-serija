import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("content/:URLParams", "routes/movie.tsx"),
    route("watchlist", "routes/watchlist.tsx"),
    route("search/:searchParams", "routes/search.tsx"),
    route("about", "routes/about.tsx"),
    route("person/:id", "routes/person.tsx"),
] satisfies RouteConfig;