import { Link } from "react-router-dom"

function MovieCard({ movie }) {

  if (!movie.poster_path) return null

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (

    <Link to={`/movie/${movie.id}`}>

      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer">

        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-4">

          <h2 className="text-lg font-bold">
            {movie.title}
          </h2>

          <p className="text-yellow-400 mt-2">
            ⭐ {movie.vote_average}
          </p>

        </div>

      </div>

    </Link>

  )
}

export default MovieCard