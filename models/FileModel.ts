import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  path: {
    type: String,
    require: true
  }
})

export default mongoose.models["images"] || mongoose.model("images", FileSchema)
