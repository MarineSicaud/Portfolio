export const dynamic = 'force-dynamic';

import { Reviews } from "@/component/reviews"
import { ReviewType } from "@/types/review_type"
import { Fetching } from "@/utils/fetching"

import "@/style/dashboard.scss"
import Link from "next/link"

async function DashboardReview(){
  const review = await Fetching.getDatas<ReviewType[]>("/reviews")
  
  if ( !review ) return null

  return <section className="dashboard-review-page">
    <Reviews reviews={review} dashboard={true} />
    <span className="new-review">
      <Link href={"/dashboard/reviews/new"} />
    </span>
  </section>
}

export default DashboardReview
