import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import {
  getMovieDetails,
  getAIRecommendations,
  addToWatchlist,
  likeMovie
} from "../services/tmdb"

function MovieDetails() {

  const { id } = useParams()

  let userInfo = null

  try {

    userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    )

  } catch (error) {

    localStorage.removeItem("userInfo")

  }

  const [movie, setMovie] = useState(null)

  const [aiRecommendations, setAiRecommendations]
    = useState([])

  useEffect(() => {

    const fetchMovie = async () => {

      const data = await getMovieDetails(id)

      setMovie(data)

      if (data?.title) {

        const aiData =
          await getAIRecommendations(data.title)

        setAiRecommendations(aiData)

      }

    }

    fetchMovie()

  }, [id])

  if (!movie) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    )

  }

  const backdrop =
    `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (

    <div className="bg-black text-white min-h-screen">

      <div
        className="h-[70vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(${backdrop})`
        }}
      >

        <div className="bg-black/70 w-full p-10">

          <h1 className="text-6xl font-bold mb-4">
            {movie.title}
          </h1>

          <p className="text-lg max-w-3xl text-zinc-300">
            {movie.overview}
          </p>

          <div className="flex gap-6 mt-6 text-lg">

            <p>
              ⭐ {movie.vote_average}
            </p>

            <p>
              📅 {movie.release_date}
            </p>

          </div>

          {
            userInfo && (

              <div className="flex gap-4 mt-8">

                <button
                  onClick={async () => {

                    await addToWatchlist(
                      userInfo.email,
                      movie.title
                    )

                    alert("Added to Watchlist")

                  }}
                  className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  + Watchlist
                </button>

                <button
                  onClick={async () => {

                    await likeMovie(
                      userInfo.email,
                      movie.title
                    )

                    alert("Movie Liked")

                  }}
                  className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
                >
                  ❤️ Like
                </button>

              </div>

            )
          }

        </div>

      </div>

      <div className="p-10">

        <h2 className="text-4xl font-bold mb-8">
          AI Recommended Movies
        </h2>

        {
          aiRecommendations.length === 0 ? (

            <p className="text-zinc-400">
              No AI recommendations found
            </p>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

              {
                aiRecommendations.map((movie, index) => (

                  <div
                    key={index}
                    className="bg-zinc-900 p-5 rounded-xl hover:bg-zinc-800 transition"
                  >

                    <h3 className="text-lg font-semibold">
                      {movie}
                    </h3>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>

  )
}

export default MovieDetails