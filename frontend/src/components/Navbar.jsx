import { Link } from "react-router-dom"

function Navbar() {

  return (

    <nav className="bg-zinc-900 text-white px-10 py-5 flex gap-10 items-center">

      <Link
        to="/"
        className="text-4xl font-bold text-red-500"
      >
        MovieAI
      </Link>

      <Link to="/">
        Home
      </Link>

      <Link to="/liked">
        Liked Movies
      </Link>

      <Link to="/watchlist">
        Watchlist
      </Link>

    </nav>

  )
}

export default Navbar