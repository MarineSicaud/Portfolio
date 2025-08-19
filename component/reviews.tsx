"use client"

import { ReviewType } from "@/types/review_type"
import * as REACT from "react"

type Props = {
  reviews: ReviewType[]
}

function Reviews({ reviews }: Props){
  const [index, setIndex] = REACT.useState(0)

  return <section className="reviews-container">
    <ul className="reviews-scroll-container">
      {
        reviews[index - 1] ? 
          <Review review={reviews[index - 1]} is_active={false} />
          : 
          <Review review={reviews[reviews.length - 1]} is_active={false} />
      }

      <Review review={reviews[index]} is_active={true} />

      {
        reviews[index + 1] ? 
          <Review review={reviews[index + 1]} is_active={false} />
          : 
          <Review review={reviews[0]} is_active={false} />
      }
    </ul>

    <span className="right-arrow" onClick={() => {
      if(index === reviews.length - 1) {
        setIndex(0)
      }else {
        setIndex(index + 1)
      }
    }}/>
    <span className="left-arrow" onClick={() => {
      if(index === 0) {
        setIndex(reviews.length - 1)
      }else {
        setIndex(index - 1)
      }
    }}/>
  </section>

}

function Review({ review, is_active }: { review: ReviewType, is_active: boolean }){
  return <article className="review-container" style={{ scale: is_active ? "1.2" : ".6"}}>
    <div className="review-user-information">
      <h4>{review.name}</h4>
      {
        review.job ?
          <p className="user-job">{review.job}</p>
          : 
          null
      }
    </div>

    <p className="review">{review.review}</p> 
  </article>
}

export { Reviews }
