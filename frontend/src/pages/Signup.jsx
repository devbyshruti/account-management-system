import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post("/auth/signup", form)
      navigate("/login")
    } catch (err) {
      alert("Signup failed")
    }
  }

  return (
    <div>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Signup</button>

      </form>

    </div>
  )
}