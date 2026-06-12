import { useState } from "react"
import axios from "axios"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      )

      console.log(response.data)

      alert("Registration Successful")

    } catch (error) {

      console.log(error)

      alert("Registration Failed")

    }

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-black text-white">

      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-10 rounded-xl w-[400px]"
      >

        <h1 className="text-4xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-zinc-800 rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-600 p-3 rounded hover:bg-red-700"
        >
          Register
        </button>

      </form>

    </div>

  )
}

export default Register