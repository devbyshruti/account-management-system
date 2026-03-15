import { useEffect, useState } from "react"
import API from "../api"

export default function Statement() {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {

    const fetchStatement = async () => {

      const res = await API.get("/account/statement")

      setTransactions(res.data)

    }

    fetchStatement()

  }, [])

  return (
    <div>

      <h2>Account Statement</h2>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t) => (

            <tr key={t.id}>

              <td>{new Date(t.created_at).toLocaleDateString()}</td>

              <td
                style={{
                  color: t.transaction_type === "credit" ? "green" : "red"
                }}
              >
                {t.transaction_type}
              </td>

              <td>₹{t.amount}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}