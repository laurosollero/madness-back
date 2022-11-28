import express, { Request, Response } from "express"
// import { Todo } from "../models/todo"
import { db } from "../Firebase"
import { getRandomEl } from "../utils/getRandomEl"
import { verbs } from "../factory/verbs"

import { DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore"
import axios from "axios"

const router = express.Router()

router.get("/api/verb", [], async (req: Request, res: Response) => {
  const v = getRandomEl(verbs)
  let translation = ""

  const options = {
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    method: "POST",
    params: {
      "api-version": "3.0",
      "to[0]": "en",
      textType: "plain",
      profanityAction: "NoAction",
      from: "fr"
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "***REMOVED***",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com"
    },
    data: `[{"Text":"${v}"}]`
  }

  await axios
    .request(options)
    .then((ans) => {
      try {
        translation = ans.data[0].translations[0].text
      } catch (error) {
        console.error("err on translation", error)
      }
    })
    .catch((err) => console.log(err))

  // await axios
  //   .get(
  //     `https://api.mymemory.translated.net/get?q=${encodeURI(v)}&langpair=fr|en`
  //   )
  //   .then((ans) => {
  //     try {
  //       translation = ans.data.responseData.translatedText
  //       translation = translation.replace("to ", "")
  //     } catch (error) {
  //       console.error("err on translation", error)
  //     }
  //   })

  const obj = { original: v, translated: translation }

  return res.status(200).send(obj)
})

router.get("/api/verbs", [], async (req: Request, res: Response) => {
  return res.status(200).send("wait")
  db.collection("verbs")
    .limit(50)
    .get()
    .then((querySnapshot: QuerySnapshot) => {
      querySnapshot.forEach((documentSnapshot: DocumentSnapshot) => {
        console.log(`Found document at ${documentSnapshot.ref.path}`)
        console.log(documentSnapshot.get("verb"))
      })
    })

  // const todo = await Todo.find({})
  return res.status(200).send("yay")
})

router.post("/api/verbs", async (req: Request, res: Response) => {
  return res.status(200).send("nope")
  let { verb, difficulty } = req.body

  if (difficulty == undefined) {
    const min = 0
    const max = 10
    difficulty = Math.floor(Math.random() * (max - min) + min)
  }

  verb = verb.replace("`", "'")

  // const todo = Todo.build({ verb, difficulty })

  db.collection("verbs")
    .doc(verb)
    .set({ difficulty: difficulty })
    .then((documentReference: any) => {
      console.log("added - ", documentReference)
    })

  return res.status(201).send(verb)
})

export { router as todoRouter }
