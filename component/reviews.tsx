"use client"

export const dynamic = 'force-dynamic';

import { Colors } from "@/component/global/sphere";
import Image from "next/image"
import { usePage } from "@/hooks/usePage"
import { ReviewType } from "@/types/review_type"
import { Fetching } from "@/utils/fetching"
import { SectionTitle } from "@/component/global/sectionTitle";
import Link from "next/link"
import * as REACT from "react"

type Props = {
  reviews: ReviewType[]
  dashboard?: boolean
}


function Reviews({ reviews, dashboard }: Props){
  return <section className="reviews-container" style={{ height: `${reviews.length * 100}vh` }}>
    <ul>
        {
            reviews.map((r, i) => <Review key={i} review={r} index={i} dashboard={dashboard} />)
        }
    </ul>
  </section>
}

function Review({ review, index, dashboard }: { review: ReviewType, index: number, dashboard: boolean }){
    const elRef = REACT.useRef<HTMLElement>(null)
    const [height, setHeight] = REACT.useState(0)

  REACT.useEffect(() => {
    if (elRef.current) {
      setHeight(elRef.current.offsetHeight)
    }
  }, [elRef])

  async function deleteReview(){
    await Fetching.deleteDatas("/reviews", review._id)
  }

  return <section className="review-separator-container" ref={elRef} style={{ "--height": `${height}px` }}>
    <div className="review-separator"></div>
    <article className="review-container">
    {
        dashboard && <> <Link href={`/dashboard/reviews/${review._id}`}> Modifier </Link>   <button className="delete-button" onClick={() => deleteReview()}>Supprimer</button></>
    }
    <div className="review-user-information">
        <section>
            {
                review.image && review.image !== "undefined" ?
                <div className="image-container">
                <Image
                    alt={`logo de ${review.name}`}
                    src={review.image}
                    width={50}
                    height={50}
                />
                </div>
                : <div className="image-container grey-bg"></div>
            }
            <h2>{review.name}</h2>
        </section>
      {
        review.job ?
          <p className="user-job">{review.job}</p>
          : 
          null
      }
    </div>

    <p className="review">{review.review}</p> 
    </article>
    </section>
}

export { Reviews }
