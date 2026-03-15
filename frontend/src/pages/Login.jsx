import { useState, useContext } from "react"
import API from "../api"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      login(res.data.token)

      navigate("/dashboard")

    } catch (err) {
      alert("Invalid credentials")
    }

  }

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

      </form>

    </div>
  )
}