import mongoose from "mongoose";

const CompetenceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: true
  }
})

export default mongoose.models["competences"] || mongoose.model("competences", CompetenceSchema)
