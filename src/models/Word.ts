import mongoose from "mongoose"

export interface IWord {
  original: string
  translated: string | null
  difficulty: number | null
}

interface WordModelInterface extends mongoose.Model<WordDoc> {
  build(attr: IWord): WordDoc
}

interface WordDoc extends mongoose.Document {
  original: string
  translated: string | null
  difficulty: number | null
}

const wordSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  translated: {
    type: String
  },
  difficulty: {
    type: Number
  }
})

wordSchema.statics.build = (attr: IWord) => {
  return new Word(attr)
}

const Word = mongoose.model<WordDoc, WordModelInterface>("Word", wordSchema)

export { Word }
