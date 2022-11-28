import express from "express"
import cors from "cors"
import { json } from "body-parser"
import { todoRouter } from "./routes/todo"

const app = express()
app.use(json())
app.use(cors())
app.use(todoRouter)

app.listen(3000, () => {
  console.log("server is listening on 3000")
})
