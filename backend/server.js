import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import preferenceRoutes from "./routes/preferenceRoutes.js"

dotenv.config()

// CONNECT DATABASE
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test Route
app.get("/", (req, res) => {

  res.send("Movie API Running")

})

// Auth Routes
app.use("/api/auth", authRoutes)

// Preference Routes
app.use("/api/preferences", preferenceRoutes)

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

})