import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const translate = async (original: string) => {
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
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPID_API_X_RAPIDAPI_KEY as string
    },
    data: `[{"Text":"${original}"}]`
  }

  let translation: string = ""
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

  return translation
}

export default translate
