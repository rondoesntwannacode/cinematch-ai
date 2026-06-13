import { useState } from "react"
import axios from "axios"

function AuthModal({ closeModal }) {

  const [isLogin, setIsLogin] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()
  
    try {
  
      const endpoint =
        isLogin
          ? "login"
          : "register"
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`,
        {
          name,
          email,
          password
        }
      )
  
      console.log("AUTH RESPONSE:")
      console.log(response.data)
  
      // SAVE USER INFO
      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      )
  
      // VERIFY SAVED
      console.log(
        localStorage.getItem("userInfo")
      )
  
      alert(
        isLogin
          ? "Login Successful"
          : "Registration Successful"
      )
  
      closeModal()
  
      // FORCE REFRESH
      window.location.href = "/"
  
    } catch (error) {
  
      console.log(error)
  
      alert(
        error.response?.data?.message
        || "Authentication Failed"
      )
  
    }
  
  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px] relative">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        <h1 className="text-4xl font-bold mb-6 text-white">

          {isLogin ? "Login" : "Register"}

        </h1>

        <form onSubmit={handleSubmit}>

          {!isLogin && (

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 bg-zinc-800 rounded text-white"
            />

          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-zinc-800 rounded text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 bg-zinc-800 rounded text-white"
          />

          <button
            type="submit"
            className="w-full bg-red-600 p-3 rounded-lg hover:bg-red-700"
          >

            {isLogin ? "Login" : "Register"}

          </button>

        </form>

        <p className="text-zinc-400 mt-6 text-center">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"
          }

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 ml-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>

        </p>

      </div>

    </div>

  )
}

export default AuthModal