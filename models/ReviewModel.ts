import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  review: {
    type: String,
    require: true
  },
  job: {
    type: String,
    require: false
  },
  image: {
    type: String,
    require: true
  }
}, { strict: true })

export default mongoose.models['reviews'] || mongoose.model("reviews", ReviewSchema)
