"use client"

export const dynamic = 'force-dynamic';

import { DashboardInput } from "@/component/dashboard_input"
import React from "react"

import "@/style/dashboard.scss"
import { Fetching } from "@/utils/fetching"
import { NewReviewType, ReviewType } from "@/types/review_type"

function NewReview({ params }: { params: Promise<{ id: string }>}){
  const [review, setReview] = React.useState({
    name: "",
    review: "",
    job: ""
  })

  const { id } = React.use( params )

  async function sendData(){
    await Fetching.postDatas<NewReviewType>("/reviews", review)
  }

  React.useEffect(() => {
    async function getData(){
      const data = await Fetching.getDatas<ReviewType>(`/reviews?id=${id}`)
      console.log(data)

      if ( !data ) return

      setReview(data)
    }

    if ( id === "new") return

    getData()
  }, [id])

  return <section className="new-reviews-page">
    <article className="new-review-container review-container" style={{ scale: "1.2"}}>
    <div className="review-user-information">
      <DashboardInput value={review.name} setValueKey="name" setValue={setReview} fontSize={1.4} style={{textAlign: "center"}} />

      <DashboardInput value={review.job} setValueKey="job" setValue={setReview} fontSize={.8} />
    </div>

    <textarea value={review.review} onChange={(e) => setReview((prev) => ({
      ...prev,
      review: e.target.value
    }))} placeholder="Veuillez entrer l'avis"/>
  </article> 

  {
    review.name && review.review && <button className="save-button" onClick={() => sendData()}>Enregistrer</button>
  }
  </section>
}

export default NewReview
