import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { searchMovies, getTrendingMovies } from "../services/api";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { darkMode } = useTheme();

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const results = await getTrendingMovies();
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch trending movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {error && <div className="text-red-500 text-center my-4">{error}</div>}

        {loading ? (
          <div className="text-center my-8">
            <div
              className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                darkMode ? "border-white" : "border-gray-900"
              } mx-auto`}
            ></div>
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
}

export default Home;
