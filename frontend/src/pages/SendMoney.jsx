import { useEffect, useState } from "react"
import API from "../api"

export default function SendMoney() {

  const [users, setUsers] = useState([])
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {

    const fetchUsers = async () => {

      const res = await API.get("/account/users")

      setUsers(res.data)

    }

    fetchUsers()

  }, [])

  const sendMoney = async (e) => {

    e.preventDefault()

    try {

      await API.post("/account/transfer", {
        receiver_id: receiver,
        amount: Number(amount)
      })

      alert("Transfer Successful")

    } catch (err) {
      alert("Transfer failed")
    }

  }

  return (
    <div>

      <h2>Send Money</h2>

      <form onSubmit={sendMoney}>

        <select onChange={(e) => setReceiver(e.target.value)}>

          <option>Select User</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}

        </select>

        <input
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button>Send</button>

      </form>

    </div>
  )
}