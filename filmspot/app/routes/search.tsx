import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import LightRays from "app/components/ReachBitsLightRays";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { MovieInfo } from "~/types";

interface SearchInfo extends MovieInfo {
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
  selectedGenre: null as number | null,
  selectedYear: null as number | null,
  selectedRating: null as number | null,
  allResults: [] as SearchInfo[],
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "SET_GENRES":
      return { ...state, genreMap: action.payload };
    case "SET_COUNTS":
      return { ...state, counts: action.payload };
    case "SET_ALL_RESULTS":
      const filtered = applyFilters(action.payload, state);
      const totalPages = Math.ceil(filtered.length / 20);
      const results = filtered.slice((state.currentPage - 1) * 20, state.currentPage * 20);
      return { ...state, allResults: action.payload, results, totalPages, loading: false, error: null };
    case "SET_FILTER":
      const newState = { ...state, ...action.payload, currentPage: 1 };
      const newFiltered = applyFilters(state.allResults, newState);
      const newTotalPages = Math.ceil(newFiltered.length / 20);
      const newResults = newFiltered.slice(0, 20);
      return { ...newState, results: newResults, totalPages: newTotalPages };
    case "SET_PAGE":
      const pageFiltered = applyFilters(state.allResults, state);
      const pageResults = pageFiltered.slice((action.payload - 1) * 20, action.payload * 20);
      return { ...state, currentPage: action.payload, results: pageResults };
    case "SET_TYPE":
      return { ...state, selectedType: action.payload, currentPage: 1 };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
}

function applyFilters(results: SearchInfo[], state: any) {
  return results.filter((item: any) => {
    if (state.selectedGenre && !item.genre_ids?.includes(state.selectedGenre)) return false;
    if (state.selectedRating && (item.vote_average || 0) < state.selectedRating) return false;
    return true;
  });
}

async function fetchAllPages(type: string, searchParams: string, selectedYear: number | null) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const results: SearchInfo[] = [];
  
  for (let page = 1; page <= 10; page++) {
    try {
      const url = new URL(`https://api.themoviedb.org/3/search/${type}`);
      url.searchParams.append("query", searchParams);
      url.searchParams.append("api_key", apiKey);
      url.searchParams.append("page", page.toString());
      
      if (selectedYear && type !== "person") {
        const yearParam = type === "movie" ? "primary_release_year" : "first_air_date_year";
        url.searchParams.append(yearParam, selectedYear.toString());
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (!data.results?.length) break;
      results.push(...data.results);
      
      if (page >= data.total_pages) break;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }
  
  return results;
}

function SearchPage() {
  const { searchParams } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = searchParams ? `Search "${searchParams}"` : "Search";
  }, [searchParams]);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`),
        ]);
        const [movieData, tvData] = await Promise.all([movieRes.json(), tvRes.json()]);
        const genres = [...(movieData.genres || []), ...(tvData.genres || [])];
        dispatch({ type: "SET_GENRES", payload: Object.fromEntries(genres.map(g => [g.id, g.name])) });
      } catch (err) {
        console.error("Genre fetch failed", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch results and counts
  useEffect(() => {
    if (!searchParams) return;
    dispatch({ type: "SET_LOADING" });

    const fetchData = async () => {
      try {
        const [movieResults, tvResults, personResults] = await Promise.all([
          fetchAllPages("movie", searchParams, state.selectedYear),
          fetchAllPages("tv", searchParams, state.selectedYear),
          fetchAllPages("person", searchParams, null),
        ]);

        const currentTypeResults = state.selectedType === "movie" ? movieResults : 
                                 state.selectedType === "tv" ? tvResults : personResults;

        dispatch({ type: "SET_ALL_RESULTS", payload: currentTypeResults });
        dispatch({ type: "SET_COUNTS", payload: {
          movie: applyFilters(movieResults, state).length,
          tv: applyFilters(tvResults, state).length,
          person: personResults.length,
        }});
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch data." });
      }
    };

    fetchData();
  }, [searchParams, state.selectedType, state.selectedYear]);

  // Update results when filters change
  useEffect(() => {
    if (state.allResults.length > 0) {
      const filtered = applyFilters(state.allResults, state);
      const totalPages = Math.ceil(filtered.length / 20);
      const results = filtered.slice(0, 20);
      dispatch({ type: "SET_FILTER", payload: { results, totalPages } });
    }
  }, [state.selectedGenre, state.selectedRating]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.currentPage]);

  const { results, genreMap, counts, loading, error, currentPage, totalPages, selectedType } = state;

  return (
    <>
      <LightRays raysOrigin="top-center" raysColor="#00ffff" raysSpeed={0.5} lightSpread={1} rayLength={5} followMouse mouseInfluence={0.025} noiseAmount={0.1} distortion={0.1} className="custom-rays !fixed brightness-170" />
      <Header />
      <main className="w-full max-w-[1400px] mx-auto z-3 relative">
        <h1 className="text-white text-2xl font-bold">Search "{searchParams}"</h1>

        <div className="filters mt-2">
          {(["movie", "tv", "person"] as const).map((type) => (
            <button
              key={type}
              className={`button ${selectedType === type ? "selected" : ""}`}
              onClick={() => dispatch({ type: "SET_TYPE", payload: type })}
            >
              <span>{counts[type]}</span>{type === "tv" ? "TV Show" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          
          {selectedType !== "person" && (
            <>
              <span className="dash"></span>
              <select
                className="button dropdown"
                value={state.selectedGenre || ""}
                onChange={(e) => dispatch({ type: "SET_FILTER", payload: { selectedGenre: e.target.value ? Number(e.target.value) : null } })}
              >
                <option value="">All Genres</option>
                {Object.entries(genreMap).map(([id, name]) => (
                  <option key={id} value={id}>{String(name)}</option>
                ))}
              </select>
              
              <select
                className="button dropdown"
                value={state.selectedYear || ""}
                onChange={(e) => dispatch({ type: "SET_FILTER", payload: { selectedYear: e.target.value ? Number(e.target.value) : null } })}
              >
                <option value="">All Years</option>
                {Array.from({ length: 40 }, (_, i) => 2025 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              
              <select
                className="button dropdown"
                value={state.selectedRating || ""}
                onChange={(e) => dispatch({ type: "SET_FILTER", payload: { selectedRating: e.target.value ? Number(e.target.value) : null } })}
              >
                <option value="">All Ratings</option>
                {Array.from({ length: 10 }, (_, i) => 10 - i).map(rating => (
                  <option key={rating} value={rating}>{rating}+</option>
                ))}
              </select>
            </>
          )}
        </div>

        <div id="searchResults" className="flex flex-col gap-6 mt-6">
          {loading && <p className="text-white p-3">Loading...</p>}
          {error && <p className="text-red-500 p-3">{error}</p>}
          {!loading && results.length === 0 && <p className="text-white p-3">No results found for "{searchParams}".</p>}

          {results.map((item: SearchInfo) => {
            const image = item.poster_path || item.profile_path;
            const title = item.title || item.name;
            const link = `/content/${selectedType}.${item.id}`;

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
          <div className="pagination mt-6 flex gap-2 flex-wrap items-center">
            {currentPage > 1 && (
              <button
                onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage - 1 })}
                className="px-3 py-1 border rounded-md text-white border-white hover:bg-white/20"
              >
                ←
              </button>
            )}
            
            {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
              const page = totalPages <= 10 ? i + 1 : Math.max(1, Math.min(currentPage - 5, totalPages - 9)) + i;
              return (
                <button
                  key={page}
                  onClick={() => dispatch({ type: "SET_PAGE", payload: page })}
                  className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-white text-black font-bold" : "text-white border-white hover:bg-white/20"}`}
                >
                  {page}
                </button>
              );
            })}
            
            {currentPage < totalPages && (
              <button
                onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage + 1 })}
                className="px-3 py-1 border rounded-md text-white border-white hover:bg-white/20"
              >
                →
              </button>
            )}
          </div>
        )}
        
        {!loading && results.length > 0 && (
          <div className="text-white text-sm mt-4 opacity-70">
            Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, applyFilters(state.allResults, state).length)} of {applyFilters(state.allResults, state).length} results
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;