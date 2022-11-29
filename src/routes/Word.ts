import express, { Request, Response } from "express"
import words from "Factories/Words"
import translation from "Factories/Translation"
import { Word, IWord } from "Models/Word"
import { getNRandomEl } from "Utils/RandomEl"

const router = express.Router()

router.get("/api/verb", [], async (req: Request, res: Response) => {
  const diff = req.query?.difficulty
  const difficulty: number = diff === undefined ? 0 : +diff

  const v = await Word.aggregate([
    { $match: { difficulty: difficulty } },
    { $sample: { size: 1 } }
  ])

  const original = v[0]["original"]

  try {
    const translated = await translation(original)
    const obj: IWord = {
      original: original,
      translated: translated,
      difficulty: difficulty
    }
    return res.status(200).send(obj)
  } catch (error) {
    return res.status(500).send("Problem.")
  }
})

router.get("/api/populate", [], async (req: Request, res: Response) => {
  const force = req.query?.force
  const overwrite: boolean = force === undefined ? false : true

  let sizeOf: number = 0

  await Word.countDocuments()
    .then((count) => {
      sizeOf = count
    })
    .catch((err) => {
      console.error("err", err)
    })

  if (sizeOf > 0 && overwrite != true) {
    return res
      .status(200)
      .send(
        `Base already filled with ${sizeOf} words. Pass force=true to redo.`
      )
  }

  await Word.deleteMany({})

  const listSize: string =
    process.env.LIST_SIZE === undefined ? "500" : process.env.LIST_SIZE

  const wordsList = getNRandomEl(words, +listSize)

  const difficultyMin = 0
  const difficultyMax = 5

  wordsList.forEach((element) => {
    const difficulty = Math.floor(
      Math.random() * (difficultyMax - difficultyMin) + difficultyMin
    )
    const word = Word.build({
      original: element,
      translated: "",
      difficulty: difficulty
    })

    word.save()
  })

  return res.status(200).send("word")
})

export { router as wordRouter }
