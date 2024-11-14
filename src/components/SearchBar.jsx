import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={`flex-1 px-4 py-2 rounded-lg ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
          } border focus:outline-none focus:border-blue-500`}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
