import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("movie/:id", "components/moviePage/movie.tsx")
] satisfies RouteConfig;
