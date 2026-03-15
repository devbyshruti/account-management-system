import { useEffect, useState, useContext } from "react"
import API from "../api"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Dashboard() {

  const [balance, setBalance] = useState(0)

  const { logout } = useContext(AuthContext)

  useEffect(() => {

    const fetchBalance = async () => {

      const res = await API.get("/account/balance")

      setBalance(res.data.balance)

    }

    fetchBalance()

  }, [])

  return (
    <div>

      <h1>Dashboard</h1>

      <h2>Balance: ₹{balance}</h2>

      <Link to="/send">Send Money</Link>

      <br />

      <Link to="/statement">Account Statement</Link>

      <br /><br />

      <button onClick={logout}>Logout</button>

    </div>
  )
}