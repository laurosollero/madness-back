import express from "express"
import cors from "cors"
import { json } from "body-parser"
import { wordRouter } from "Routes/Word"
import connect from "./Mongo"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(wordRouter)

connect()

const port: string = process.env.PORT as string

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})
