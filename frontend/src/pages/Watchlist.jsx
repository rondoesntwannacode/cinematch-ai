import { useEffect, useState } from "react"

import axios from "axios"

function Watchlist() {

  const [movies, setMovies]
    = useState([])

  useEffect(() => {

    const fetchWatchlist = async () => {

      try {

        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        )

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/preferences/watchlist/${userInfo.email}`
        )

        setMovies(
          response.data.watchlist
        )

      } catch (error) {

        console.log(error)

      }

    }

    fetchWatchlist()

  }, [])

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        🎬 My Watchlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {
          movies.map((movie, index) => (

            <div
              key={index}
              className="bg-zinc-900 p-5 rounded-xl"
            >

              <h2 className="text-xl font-semibold">
                {movie.movieTitle}
              </h2>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default Watchlist