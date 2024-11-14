import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MovieList({ movies }) {
  const { darkMode } = useTheme();

  if (!movies.length) {
    return (
      <div className="text-center text-gray-400 my-8">
        No movies found. Try searching for something!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[400px] object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x750?text=No+Image";
            }}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-sm mb-2`}
            >
              {new Date(movie.release_date).getFullYear()}
            </p>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
