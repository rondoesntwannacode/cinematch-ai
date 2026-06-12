import User from "../models/User.js"

export const addToWatchlist = async (req, res) => {

  try {

    const { movieId } = req.body

    const user = await User.findById(req.user._id)

    if (!user.watchlist.includes(movieId)) {

      user.watchlist.push(movieId)

      await user.save()

    }

    res.json(user.watchlist)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

export const getWatchlist = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)

    res.json(user.watchlist)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}