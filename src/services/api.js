// const API_KEY = "434bf62c55682967f16d3daf4781c232"; // Replace with your actual TMDB API key
// const BASE_URL = "https://api.themoviedb.org/3";

// export const searchMovies = async (query) => {
//   try {
//     const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
//       query
//     )}&include_adult=false&language=en-US`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     throw error;
//   }
// };

const API_KEY = "434bf62c55682967f16d3daf4781c232";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
