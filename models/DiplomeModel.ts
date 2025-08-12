import mongoose from "mongoose";

const DiplomeSchema = new mongoose.Schema({
  ecole: {
    type: String,
    require: true
  },
  diplome: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  }
})

export default mongoose.models["diplomes"] || mongoose.model("diplomes", DiplomeSchema)
