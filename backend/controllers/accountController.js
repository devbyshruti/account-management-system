import { supabase } from "../config/supabaseClient.js"

export const getBalance = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", req.user.id)
      .single()

    if (error)
      return res.status(400).json({ message: error.message })

    res.json(data)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}

export const getUsers = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("id,name,email")

    if (error)
      return res.status(400).json({ message: error.message })

    res.json(data)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}

export const getStatement = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
      .order("created_at", { ascending: false })

    if (error)
      return res.status(400).json({ message: error.message })

    res.json(data)

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}

export const transferMoney = async (req, res) => {

  try {

    const receiver_id = req.body.receiver_id
    const amount = Number(req.body.amount)

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" })

    const { data: sender } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.user.id)
      .single()

    if (sender.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" })

    const { data: receiver } = await supabase
      .from("users")
      .select("*")
      .eq("id", receiver_id)
      .single()

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" })

    await supabase
      .from("users")
      .update({ balance: sender.balance - amount })
      .eq("id", sender.id)

    await supabase
      .from("users")
      .update({ balance: receiver.balance + amount })
      .eq("id", receiver.id)

    await supabase
      .from("transactions")
      .insert([
        {
          sender_id: sender.id,
          receiver_id: receiver.id,
          amount,
          transaction_type: "debit"
        },
        {
          sender_id: sender.id,
          receiver_id: receiver.id,
          amount,
          transaction_type: "credit"
        }
      ])

    res.json({ message: "Transfer successful" })

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}