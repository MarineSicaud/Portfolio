import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  competences: {
    type: Array,
    require: true
  },
  services: {
    type: Array,
    require: true
  },
  client: {
    type: String,
    require: true
  },
  duree: {
    type: String,
    require: true
  },
  background_image: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: false 
  },
  content: {
    type: Array,
    require: false 
  },
}, { strict: true })

export default mongoose.models["projets"] || mongoose.model("projets", ProjetSchema)
