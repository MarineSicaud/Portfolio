"use client"

export const dynamic = 'force-dynamic';

import { DashboardInput } from "@/component/dashboard_input"
import Image from "next/image"
import React from "react"

import "@/style/dashboard.scss"
import { Fetching } from "@/utils/fetching"
import { NewReviewType, ReviewType } from "@/types/review_type"

function NewReview({ params }: { params: Promise<{ id: string }>}){
  const [review, setReview] = React.useState({
    name: "",
    review: "",
    job: "",
    image: {
      file: new File([""], "file.name"),
      path: ""
    },
  })

  const { id } = React.use( params )

  async function sendReview(){
    let newReview: NewReviewType = {
      name: review.name,
      image: review.image.file,
      review: review.review,
      job: review.job
    }

    if ( id === "new") {
      const sendReview = await Fetching.postDatas<NewReviewType>("/reviews", newReview)
    }
    else{
     //@ts-ignore
     newReview._id = id 
  
     if ( review.image.file.name === "file.name"){
        //@ts-ignore
        newReview.image = review.image.path 
    }

        //@ts-ignore
      const updateReview = await Fetching.patchDatas<ReviewType>("/reviews", newReview)
    }
  }

  React.useEffect(() => {
    async function getData(){
      const data = await Fetching.getDatas<ReviewType>(`/reviews?id=${id}`)

      if ( !data ) return

          const review = {
              name: data.name,
              image: {
                  file: new File([""], "file.name"),
                  path: data.image
              },
              job: data.review,
              review: data.review
          }

      setReview(review)
    }

    if ( id === "new") return

    getData()
  }, [id])

  return <section className="new-reviews-page">
    <article className="new-review-container review-container" style={{ scale: "1.2"}}>
   
   <input type="file" onChange={(e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            setReview((prev) => ({
              ...prev,
              image: {
                path: pathname,
                file: file
              }
            }))
          }

    }}/> 
    {
      review.image.path && review.image.path !== "undefined" ?
      <Image
      alt={`logo de ${review.name}`}
      src={review.image.path}
      width={50}
      height={50}
    />
    : <span style={{width: "50px", height: "50px"}} />
    }

    <div className="review-user-information">
      <DashboardInput value={review.name} setValueKey="name" setValue={setReview} fontSize={1.4} style={{textAlign: "center"}} />

      <DashboardInput value={review.job} setValueKey="job" setValue={setReview} fontSize={.8} />
    </div>

    <textarea value={review.review} onChange={(e) => {
        let textarea = e.target;
        textarea.style.height = "1px";
        textarea.style.height = ( 18*.9 + textarea.scrollHeight ) + "px";
        setReview((prev) => ({
      ...prev,
      review: e.target.value
    }))}}
    style={{ outline: "none" }}
    placeholder="Veuillez entrer l'avis"/>
  </article> 

  {
    review.name && review.review && <button className="save-button" onClick={() => sendReview()}>Enregistrer</button>
  }
  </section>
}

export default NewReview
