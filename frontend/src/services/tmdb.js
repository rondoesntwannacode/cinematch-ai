import axios from "axios"

const API_KEY = "9aa9fc11780b49d18a3cfe0b04d9ee19"

const BASE_URL = "https://api.themoviedb.org/3"

export const getTrendingMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    )

    console.log(response.data.results)

    return response.data.results || []

  } catch (error) {

    console.log("TMDB ERROR:", error)

    return []

  }

}

export const searchMovies = async (query) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    )

    return response.data.results || []

  } catch (error) {

    console.log("SEARCH ERROR:", error)

    return []

  }

}


export const getMovieDetails = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    )

    return response.data

  } catch (error) {

    console.log(error)

    return null

  }

}


export const getSimilarMovies = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
    )

    return response.data.results || []

  } catch (error) {

    console.log(error)

    return []

  }

}

export const getAIRecommendations = async (title) => {

  try {

    const response = await axios.get(
      `https://cinematch-ai-zckg.onrender.com/recommend/${encodeURIComponent(title)}`
    )

    return response.data

  } catch (error) {

    console.log("AI ERROR:", error)

    return []

  }

}


export const addToWatchlist = async (
  email,
  movieTitle
) => {

  try {

    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}/api/preferences/watchlist",
      {
        email,
        movieTitle
      }
    )

    return response.data

  } catch (error) {

    console.log(error)

  }

}

export const likeMovie = async (
  email,
  movieTitle
) => {

  try {

    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}/api/preferences/like",
      {
        email,
        movieTitle
      }
    )

    return response.data

  } catch (error) {

    console.log(error)

  }

}