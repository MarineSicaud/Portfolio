import mongoose from "mongoose";

import ReviewModel from "@/models/ReviewModel";
import { NewReviewType, ReviewType } from "@/types/review_type";

class Review {
  // Get all reviews
  static async get_all_reviews(): Promise<ReviewType[]> {
    const reviews = await ReviewModel.find({})

    return reviews
  }

  // Get one review
  static async get_one_review(id: string): Promise<ReviewType> {
    const review = await ReviewModel.findOne({ _id: new mongoose.Types.ObjectId(id) })

    return review
  }

  // New review
  static async new_review(r: NewReviewType): Promise<boolean> {
    const { review, name, job } = r

    let create_review = await ReviewModel.create({
      review,
      name,
      job
    })

    if ( create_review.__v !== null && create_review !== undefined) {
      return true
    }

    return false
  }

  // Update review
  static async update_review(r: ReviewType): Promise<boolean> {
    const { _id, review, name, job } = r

    let updating_review = await ReviewModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(_id)
      },
      {
        review,
        name,
        job
      }
    )

    if ( updating_review.modifiedCount === 1 ) {
      return true
    }

    return false
  }

  // Delete review
  static async delete_review(id: string): Promise<boolean> {
    const deleting_review = await ReviewModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

    if ( deleting_review.deletedCount === 1 ) {
      return true
    }

    return false
  }
}

export { Review }
