import { useEffect, useState } from "react"

import axios from "axios"

function LikedMovies() {

  const [movies, setMovies]
    = useState([])

  useEffect(() => {

    const fetchLikedMovies = async () => {

      try {

        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        )

        const response = await axios.get(
          `http://localhost:5000/api/preferences/liked/${userInfo.email}`
        )

        setMovies(
          response.data.likedMovies
        )

      } catch (error) {

        console.log(error)

      }

    }

    fetchLikedMovies()

  }, [])

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        ❤️ Liked Movies
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

export default LikedMovies