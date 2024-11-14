import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useTheme } from "../context/ThemeContext";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } flex items-center justify-center`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg mb-4">{movie.overview}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Release Date</h3>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{movie.vote_average.toFixed(1)} / 10</p>
              </div>
              <div>
                <h3 className="font-semibold">Runtime</h3>
                <p>{movie.runtime} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold">Budget</h3>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className={`px-3 py-1 rounded-full ${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-4">
                {movie.credits.cast.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-20 h-20 rounded-full object-cover mb-2"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x200?text=No+Image";
                      }}
                    />
                    <p className="text-sm">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
