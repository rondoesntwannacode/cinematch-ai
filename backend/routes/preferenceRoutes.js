import express from "express"

import User from "../models/User.js"

const router = express.Router()

// Add to watchlist
router.post("/watchlist", async (req, res) => {

  try {

    const {
      email,
      movieTitle
    } = req.body

    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      })

    }

    user.watchlist.push({
      movieTitle
    })

    await user.save()

    res.json({
      message: "Added to watchlist"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// Like movie
router.post("/like", async (req, res) => {

  try {

    const {
      email,
      movieTitle
    } = req.body

    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      })

    }

    user.likedMovies.push({
      movieTitle
    })

    await user.save()

    res.json({
      message: "Movie liked"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// Get Watchlist
router.get("/watchlist/:email", async (req, res) => {

  try {

    const user =
      await User.findOne({
        email: req.params.email
      })

    res.json({
      watchlist: user.watchlist
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

// Get Liked Movies
router.get("/liked/:email", async (req, res) => {

  try {

    const user =
      await User.findOne({
        email: req.params.email
      })

    res.json({
      likedMovies: user.likedMovies
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

export default router