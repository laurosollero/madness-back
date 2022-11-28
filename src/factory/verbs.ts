const fs = require("fs")

const verbs = fs
  .readFileSync("verbs.txt", "utf8")
  .toString()
  .replace(/\r\n/g, "\n")
  .split("\n")

export { verbs }
