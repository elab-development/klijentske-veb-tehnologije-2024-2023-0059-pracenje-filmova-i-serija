import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import LightRays from "app/components/ReachBitsLightRays";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { MovieInfo } from "~/types";

interface SearchInfo extends MovieInfo {
  name?: string;
  profile_path?: string;
  known_for?: Array<{ title?: string; name?: string }>;
}

const initialState = {
  results: [] as SearchInfo[],
  loading: true,
  error: null as string | null,
  selectedType: "movie" as "movie" | "tv" | "person",
  currentPage: 1,
  totalPages: 1,
  genreMap: {} as Record<number, string>,
  counts: { movie: 0, tv: 0, person: 0 },
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "SET_GENRES":
      return { ...state, genreMap: action.payload };
    case "SET_COUNTS":
      return { ...state, counts: action.payload };
    case "SET_RESULTS":
      return {
        ...state,
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_TYPE":
      return { ...state, selectedType: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
}

function SearchPage() {
  const { searchParams } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = searchParams ? `Search "${searchParams}"` : "Search";
  }, [searchParams]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`),
        ]);
        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);
        const genres = [...(movieData.genres || []), ...(tvData.genres || [])];
        dispatch({ type: "SET_GENRES", payload: Object.fromEntries(genres.map(g => [g.id, g.name])) });
      } catch (err) {
        console.error("Genre fetch failed", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (!searchParams) return;

    const fetchCounts = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const common = `query=${encodeURIComponent(searchParams)}&api_key=${apiKey}&language=en-US&page=1`;
        const base = `https://api.themoviedb.org/3/search`;

        const [movie, tv, person] = await Promise.all([
          fetch(`${base}/movie?${common}`).then(res => res.json()),
          fetch(`${base}/tv?${common}`).then(res => res.json()),
          fetch(`${base}/person?${common}`).then(res => res.json()),
        ]);

        dispatch({ type: "SET_COUNTS", payload: {
          movie: movie.total_results || 0,
          tv: tv.total_results || 0,
          person: person.total_results || 0,
        }});
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };

    fetchCounts();
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams) return;
    dispatch({ type: "SET_LOADING" });

    const fetchResults = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/${state.selectedType}?query=${encodeURIComponent(
          searchParams
        )}&api_key=${apiKey}&language=en-US&page=${state.currentPage}`;

        const res = await fetch(url);
        const data = await res.json();

        dispatch({ type: "SET_RESULTS", payload: {
          results: data.results || [],
          totalPages: data.total_pages || 1
        }});
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch data." });
      }
    };

    fetchResults();
  }, [searchParams, state.selectedType, state.currentPage]);

  const { results, genreMap, counts, loading, error, currentPage, totalPages, selectedType } = state;

  return (
    <>
      <LightRays raysOrigin="top-center" raysColor="#00ffff" raysSpeed={0.5} lightSpread={1} rayLength={5} followMouse mouseInfluence={0.025} noiseAmount={0.1} distortion={0.1} className="custom-rays !fixed brightness-170" />
      <Header />
      <main className="movieInfoHolder min-h-[100dvh] max-w-[1400px] mx-auto z-3 relative">
        <h1 className="text-white text-2xl font-bold">Search "{searchParams}"</h1>

        <div className="filters mt-2">
          {(["movie", "tv", "person"] as const).map((type) => (
            <button
              key={type}
              className={`button ${selectedType === type ? "selected" : ""}`}
              onClick={() => dispatch({ type: "SET_TYPE", payload: type })}
            >
              <span>{counts[type]}</span>{type == "tv" ? "TV Show" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div id="searchResults" className="flex flex-col gap-6 mt-6">
          {loading && <p className="text-white p-3">Loading...</p>}
          {error && <p className="text-red-500 p-3">{error}</p>}
          {!loading && results.length === 0 && <p className="text-white p-3">No results found for "{searchParams}".</p>}

          {results.map((item: SearchInfo) => {
            const image = item.poster_path || item.profile_path;
            const title = item.title || item.name;
            const link = selectedType === "person" ? `#` : `/content/${selectedType}.${item.id}`;

            return (
              image && (
                <a key={item.id} href={link} className="searchResult movieSearchResult flex gap-4">
                  <img className="w-[120px] rounded-xl border border-[var(--borderColorPrimary)]" src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
                  <div>
                    <h2>{title}</h2>
                    {selectedType !== "person" ? (
                      <>
                        <div className="tags flex flex-wrap gap-2 mt-1">
                          {(item.genre_ids || []).map(id => (
                            <span key={id} className="genreTag">{genreMap[id] || "Unknown"}</span>
                          ))}
                        </div>
                        <p>{item.overview || "No description available."}</p>
                      </>
                    ) : (
                      <p>{item.known_for?.map(k => k.title || k.name).join(", ")}</p>
                    )}
                  </div>
                </a>
              )
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination mt-6 flex gap-2 flex-wrap">
            {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => dispatch({ type: "SET_PAGE", payload: page })}
                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-white text-black font-bold" : "text-white border-white"}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;