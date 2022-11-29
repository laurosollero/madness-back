import * as fs from "fs"
import dotenv from "dotenv"

dotenv.config()

const words: string[] = fs
  .readFileSync(process.env.WORDS_FILE as string, "utf8")
  .toString()
  .replace(/\r\n|\n/g, "\n")
  .split("\n")

export default words
