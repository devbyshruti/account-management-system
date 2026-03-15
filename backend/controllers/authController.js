import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { supabase } from "../config/supabaseClient.js"
import { generateToken } from "../utils/generateToken.js"

export const signup = async (req, res) => {

  try {

    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
          balance: 10000
        }
      ])
      .select()

    if (error)
      return res.status(400).json({ error: error.message })

    const token = generateToken(data[0])

    res.json({
      token,
      user: data[0]
    })

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}

export const login = async (req, res) => {

  try {

    const { email, password } = req.body

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !data)
      return res.status(404).json({ message: "User not found" })

    const valid = await bcrypt.compare(password, data.password)

    if (!valid)
      return res.status(401).json({ message: "Invalid password" })

    const token = generateToken(data)

    res.json({
      token,
      user: data
    })

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

}