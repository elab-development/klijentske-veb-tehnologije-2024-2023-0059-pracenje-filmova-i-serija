import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LightRays from "app/components/ReachBitsLightRays";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { MovieInfo } from "~/types";

function SearchPage() {
  const { searchParams } = useParams();
  const [searchResults, setSearchResults] = useState<MovieInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});
  const [counts, setCounts] = useState({ movie: 0, tv: 0, person: 0 });

  // Update tab title on search
  useEffect(() => {
    document.title = searchParams ? `Search "${searchParams}"` : "Search";
  }, [searchParams]);

  // Reset to first page on param/type change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, selectedType]);

  // Fetch genres once
  useEffect(() => {
    async function fetchGenres() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`),
        ]);

        const [movieData, tvData] = await Promise.all([movieRes.json(), tvRes.json()]);
        const genres = [...(movieData.genres || []), ...(tvData.genres || [])];
        setGenreMap(Object.fromEntries(genres.map((g) => [g.id, g.name])));
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    }

    fetchGenres();
  }, []);

  // Fetch search result counts
  useEffect(() => {
    async function fetchCounts() {
      if (!searchParams) return;

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const base = `https://api.themoviedb.org/3/search`;
        const common = `query=${encodeURIComponent(searchParams)}&api_key=${apiKey}&language=en-US&page=1`;

        const [movieRes, tvRes, peopleRes] = await Promise.all([
          fetch(`${base}/movie?${common}`),
          fetch(`${base}/tv?${common}`),
          fetch(`${base}/person?${common}`),
        ]);

        const [movieData, tvData, peopleData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
          peopleRes.json(),
        ]);

        setCounts({
          movie: movieData.total_results || 0,
          tv: tvData.total_results || 0,
          person: peopleData.total_results || 0,
        });
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    }

    fetchCounts();
  }, [searchParams]);

  // Fetch results for selected type and page
  useEffect(() => {
    async function fetchResults() {
      if (!searchParams) return;

      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${encodeURIComponent(
          searchParams
        )}&api_key=${apiKey}&language=en-US&page=${currentPage}`;

        const res = await fetch(url);
        const data = await res.json();
        setSearchResults(data.results || []);
        setTotalPages(data.total_pages || 1);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [searchParams, selectedType, currentPage]);

  return (
    <>
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={0.5}
        lightSpread={1}
        rayLength={5}
        followMouse
        mouseInfluence={0.025}
        noiseAmount={0.1}
        distortion={0.1}
        className="custom-rays !fixed brightness-170"
      />

      <Header />

      <main className="movieInfoHolder min-h-[100dvh] max-w-[1400px] mx-auto z-3 relative">
        <h1 className="text-white text-2xl font-bold">Search "{searchParams}"</h1>

        {/* Filters */}
        <div className="filters mt-2">
          <button
            className={`button ${selectedType === "movie" ? "selected" : ""}`}
            onClick={() => setSelectedType("movie")}
          >
            <span>{counts.movie}</span>Movies
          </button>
          <button
            className={`button ${selectedType === "tv" ? "selected" : ""}`}
            onClick={() => setSelectedType("tv")}
          >
            <span>{counts.tv}</span>TV Shows
          </button>
          <button className="button" disabled>
            <span>{counts.person}</span>People
          </button>
        </div>

        {/* Results */}
        <div id="searchResults" className="flex flex-col gap-6 mt-6">
          {loading && <p className="text-white p-3">Loading...</p>}
          {error && <p className="text-red-500 p-3">{error}</p>}
          {!loading && searchResults.length === 0 && (
            <p className="text-white p-3">No results found for "{searchParams}".</p>
          )}

          {searchResults.map((item) => {
            if (!item.poster_path) return null;
            const title = item.title;
            const linkType = selectedType;

            return (
              <a
                key={item.id}
                href={`/content/${linkType}.${item.id}`}
                className="searchResult movieSearchResult flex gap-4"
              >
                <img
                  className="w-[120px] rounded-xl border border-[var(--borderColorPrimary)]"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={title}
                />
                <div>
                  <h2>{title}</h2>
                  <div className="tags flex flex-wrap gap-2 mt-1">
                    {(item.genre_ids || []).map((id) => (
                      <span key={id} className="genreTag">
                        {genreMap[id] || "Unknown"}
                      </span>
                    ))}
                  </div>
                  <p>{item.overview || "No description available."}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination mt-6 flex gap-2 flex-wrap">
            {Array.from({ length: Math.min(10, totalPages) }, (_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-white text-black font-bold" : "text-white border-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default SearchPage;