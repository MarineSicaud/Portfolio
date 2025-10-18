export const dynamic = 'force‑dynamic';
"use client"

import { ReviewType } from "@/types/review_type"
import { Fetching } from "@/utils/fetching"
import Link from "next/link"
import * as REACT from "react"

type Props = {
  reviews: ReviewType[]
  dashboard?: boolean
}

function Reviews({ reviews, dashboard = false }: Props){
  const [index, setIndex] = REACT.useState(0)

  return <section className="reviews-container">
    <ul className="reviews-scroll-container">
      {
        reviews[index - 1] ? 
          <Review review={reviews[index - 1]} is_active={false} dashobard={false}/>
          : 
          <Review review={reviews[reviews.length - 1]} is_active={false} dashobard={false} />
      }

      <Review review={reviews[index]} is_active={true} dashobard={dashboard} />

      {
        reviews[index + 1] ? 
          <Review review={reviews[index + 1]} is_active={false} dashobard={false} />
          : 
          <Review review={reviews[0]} is_active={false} dashobard={false} />
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

function Review({ review, is_active, dashobard }: { review: ReviewType, is_active: boolean, dashobard: boolean }){

  async function deleteReview(){
    await Fetching.deleteDatas("/reviews", review._id)
  }

  return <article className="review-container" style={{ scale: is_active ? "1.2" : ".6"}}>
  {
    dashobard && <> <Link href={`/dashboard/reviews/${review._id}`}> Modifier </Link>   <button onClick={() => deleteReview()}>Supprimer</button></>
  }
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
