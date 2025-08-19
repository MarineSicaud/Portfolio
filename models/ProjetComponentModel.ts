import mongoose from "mongoose";

const ProjetComponentSchema = new mongoose.Schema({
  id_projet: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image_url: {
    type: String,
    require: true
  },
  type: {
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
  date: {
    type: String,
    require: true
  },
  id_project: {
    type: String,
    require: true,
  }
}, { strict: true })

export default mongoose.models["projets_component"] || mongoose.model("projets_component", ProjetComponentSchema)
