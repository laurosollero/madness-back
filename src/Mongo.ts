import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connect = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING as string, {}, () => {
    console.log("connected to db")
  })
}

export default connect
