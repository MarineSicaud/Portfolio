import { Competence, NewCompetence } from "@/types/competences_type";
import { StatusCode } from "@/types/http_response_type";
import { Competences } from "@/utils/competences";
import { ImagesGestion } from "@/utils/file";
import { formToObject } from "@/utils/formToObject";
import { Github } from "@/utils/github";
import { HttpResponse } from "@/utils/http_response";
import { connectionToDatabase } from "@/utils/mongodb";

async function GET(req: Request){
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  let id = searchParams.get("id") || undefined

  let competences: Competence | Competence[]

  if ( id ) {
    competences = await Competences.get_competence(id)
  } else {
    competences = await Competences.get_all_competences()
  }


  if ( !competences || Array.isArray(competences) && competences.length === 0 ) {
    return HttpResponse(StatusCode.NotFound)
  }

  return HttpResponse(StatusCode.Success, competences)
}

async function POST(req: Request){
  await connectionToDatabase()

  let formData = await req.formData()
  let competence = formToObject<NewCompetence>(formData)


  let image_gestion = new ImagesGestion()
  let github_manager = new Github()

  let filter_image_to_push = await image_gestion.append_file([competence.image])

  let push_passed = true

  if ( filter_image_to_push.files.length > 0 ) {
    let push_images = await github_manager.push_gihtub_files(filter_image_to_push.files)

    push_passed = push_images
  }

  if ( push_passed ) {
    let save_images = await filter_image_to_push.new_image()

    if ( !save_images ) return HttpResponse(StatusCode.ConflicWithServer)

    const new_comp = await Competences.new_competence(competence)

    if ( !new_comp ) return HttpResponse(StatusCode.ConflicWithServer)

    return HttpResponse(StatusCode.Success)
  }

  return HttpResponse(StatusCode.InternalError)
}

async function PATCH(req: Request) {
  await connectionToDatabase()

  let formData = await req.formData()
  let competence = formToObject<Competence>(formData)
  console.log(competence)

  if ( !competence._id ) return HttpResponse(StatusCode.UnAuthorized)

  let image_gestion = new ImagesGestion()
  let github_manager = new Github()

  let images = []

  if ( typeof competence.image !== "string") {
    images.push(competence.image)
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

    const update_comp = await Competences.update_competence(competence)

    if ( !update_comp ) return HttpResponse(StatusCode.ConflicWithServer)

    return HttpResponse(StatusCode.Success)
  }

  return HttpResponse(StatusCode.InternalError)
}

async function DELETE(req: Request) {
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  let id = searchParams.get("id")

  if ( !id ) return HttpResponse(StatusCode.ConflicWithServer)

  const delete_comp = await Competences.delete_competence(id)

  if ( delete_comp ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.ConflicWithServer)
}

export { GET, POST, PATCH, DELETE }
