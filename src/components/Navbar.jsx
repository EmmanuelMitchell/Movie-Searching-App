import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            MovieDB
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
            }`}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
