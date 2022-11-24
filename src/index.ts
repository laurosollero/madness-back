import express from "express"
import mongoose from "mongoose"
import { json } from "body-parser"
import { todoRouter } from "./routes/todo"

const app = express()
app.use(json())
app.use(todoRouter)

mongoose.set("debug", true)

mongoose.connect(
  "mongodb+srv://user:***REMOVED***@cluster0.lwonjtb.mongodb.net/?retryWrites=true&w=majority",
  //   "mongodb://user:***REMOVED***@cluster0.lwonjtb.mongodb.net/",
  {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
  },
  () => {
    console.log("Mongo connected")
  }
)

app.listen(3000, () => {
  console.log("server is listening on 3000")
})
