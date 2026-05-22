import { StatusCode } from "@/types/http_response_type";
import { NewReviewType, ReviewType } from "@/types/review_type"
import { ImagesGestion } from "@/utils/file";
import { Github } from "@/utils/github";
import { formToObject } from "@/utils/formToObject";
import { HttpResponse } from "@/utils/http_response";
import { connectionToDatabase } from "@/utils/mongodb";
import { Review } from "@/utils/reviews";

async function GET(req: Request) {
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  let id = searchParams.get("id") || undefined

  let reviews: ReviewType | ReviewType[];

  if ( id ) {
    reviews = await Review.get_one_review(id)
  } else {
    reviews = await Review.get_all_reviews()
  }

  if ( reviews || Array.isArray(reviews) ) return HttpResponse(StatusCode.Success, reviews)

  return HttpResponse(StatusCode.InternalError)
}

async function POST(req: Request) {
  await connectionToDatabase()

  const formData = await req.formData()
  const review = formToObject<NewReviewType>(formData)

  let image_gestion = new ImagesGestion()
  let github_manager = new Github()

  let filter_image_to_push = await image_gestion.append_file([review.image])

  let push_passed = true

  if ( filter_image_to_push.files.length > 0 ) {
    console.log(filter_image_to_push.files)
    let push_images = await github_manager.push_gihtub_files(filter_image_to_push.files)

    push_passed = push_images
  }

  if ( push_passed ) {
    let save_images = await filter_image_to_push.new_image()

    if ( !save_images ) return HttpResponse(StatusCode.ConflicWithServer)
        console.log(review)
        let new_review = await Review.new_review(review)

        if ( new_review ) return HttpResponse(StatusCode.Success)
  }

  return HttpResponse(StatusCode.ConflicWithServer)
}

async function PATCH(req: Request){
  await connectionToDatabase()

  const formData = await req.formData()
  const review = formToObject<ReviewType>(formData)

  if ( !review._id ) return HttpResponse(StatusCode.NotFound)

  let image_gestion = new ImagesGestion()
  let github_manager = new Github()

  let images = []

  if ( typeof review.image !== "string") {
    images.push(review.image)
  }

  let filter_image_to_push = await image_gestion.append_file(images)

  let push_passed = true

  if ( filter_image_to_push.files.length > 0 ){
    let push_images = await github_manager.push_gihtub_files(filter_image_to_push.files)

    push_passed = push_images
  }

  if ( push_passed ) {
      let save_images = await filter_image_to_push.new_image()

      if ( !save_images ) return HttpResponse(StatusCode.ConflicWithServer)

      let update_review = await Review.update_review(review)

      if ( update_review ) return HttpResponse(StatusCode.Success)
  }


  return HttpResponse(StatusCode.ConflicWithServer)
}

async function DELETE(req: Request) {
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  let id = searchParams.get("id") || undefined

  if ( !id ) return HttpResponse(StatusCode.UnAuthorized)

  let deleting_review = await Review.delete_review(id)

  if ( deleting_review ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.ConflicWithServer)
}

export { GET, POST, PATCH, DELETE }
