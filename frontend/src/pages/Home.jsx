import { useEffect, useState } from "react"

import MovieCard from "../components/MovieCard"
import SearchBar from "../components/SearchBar"
import AuthModal from "../components/AuthModal"

import {
  getTrendingMovies,
  searchMovies
} from "../services/tmdb"

function Home() {

  const [movies, setMovies] = useState([])

  const [searchTerm, setSearchTerm]
    = useState("")

  const [showModal, setShowModal]
    = useState(false)

  // SAFE USER INFO
  let userInfo = null

  try {

    userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    )

  } catch (error) {

    console.log(error)

    localStorage.removeItem("userInfo")

  }

  useEffect(() => {

    const fetchMovies = async () => {

      const data =
        await getTrendingMovies()

      setMovies(
        Array.isArray(data)
          ? data
          : []
      )

    }

    fetchMovies()

  }, [])

  const handleSearch = async () => {

    if (!searchTerm) return

    const data =
      await searchMovies(searchTerm)

    setMovies(
      Array.isArray(data)
        ? data
        : []
    )

  }

  return (

    <div className="p-10 bg-black min-h-screen text-white">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">
          AI Movie Recommendation System
        </h1>

        {
          userInfo ? (

            <div className="flex items-center gap-4">

              <p className="text-lg font-semibold">
                👋 {userInfo.name}
              </p>

              <button
                onClick={() => {

                  localStorage.removeItem(
                    "userInfo"
                  )

                  window.location.reload()

                }}
                className="bg-zinc-800 px-5 py-2 rounded-lg hover:bg-zinc-700"
              >
                Logout
              </button>

            </div>

          ) : (

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Login / Register
            </button>

          )
        }

      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">

        {
          movies.map((movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />

          ))
        }

      </div>

      {
        showModal && (

          <AuthModal
            closeModal={() =>
              setShowModal(false)
            }
          />

        )
      }

    </div>

  )
}

export default Home