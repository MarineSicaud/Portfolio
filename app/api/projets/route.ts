import { Competence } from "@/types/competences_type";
import { StatusCode } from "@/types/http_response_type";
import { Project } from "@/types/project_type";
import { ImagesGestion } from "@/utils/file";
import { formToObject } from "@/utils/formToObject";
import { Github } from "@/utils/github";
import { HttpResponse } from "@/utils/http_response";
import { connectionToDatabase } from "@/utils/mongodb";
import { Projet } from "@/utils/projets";

async function GET(req: Request){
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  let id = searchParams.get("id")

  if ( !id ) return HttpResponse(StatusCode.UnAuthorized)

  const project = await Projet.get_project(id)


  if ( project ) return HttpResponse(StatusCode.Success, project)

  return HttpResponse(StatusCode.NotFound)
}

export type POSTProject = {
  title: string,
  description: string,
  competences: Competence[],
  services: string[],
  client: string,
  duree: string,
  background_image: File,
  type: string, // Marketing / Logo / Branding
  link?: string,
  content: {
    title: string,
    description?: string,
    images: {
      file: File,
      path: string
      alt: string,
    }[]
  }[]
}

async function POST(req: Request){
  await connectionToDatabase()

  // Get data from formData 
  // to get files like images
  let formData = await req.formData()

  // Transform image for type wanted
  // Here its's for a project
  let project = formToObject<POSTProject>(formData)

  console.log(project.content[0].images)

  for ( const key in project ) {
    if ( key.includes("content.")) {
      const splitKey = key.split(".")
      const contentIndex = Number(splitKey[1])
      const imageIndex = Number(splitKey[2])

      project.content[contentIndex].images[imageIndex].file = project[key]
    }
  }

  // Create utilities managers
  let image_gestion = new ImagesGestion()
  let github_manager = new Github()


  // add all images in an array to properly send it to the ImageGestion
  let project_content_images: File[] = []

  if ( project.content.length > 0 ) {
    for ( let i = 0; i < project.content.length; i++ ) {
      if ( project.content[i].images && project.content[i].images.length > 0) {
        project.content[i].images.map(image => project_content_images.push(image.file))
      }
    }
  }

  let filter_image_to_push = await image_gestion.append_file([project.background_image, ...project_content_images])

  // Verify if the push has a probleme
  let push_passed = true;


  if ( filter_image_to_push.files.length > 0 ) {
    // If there is images, send it to github repo
    let push_files = await github_manager.push_gihtub_files(filter_image_to_push.files)

    push_passed = push_files
  }


  // If it passed, continu
  if ( push_passed ) {
    // Save images path in database, to verify if image already exist,
    // and doesn't create unessessary github push
    let save_images_path = await filter_image_to_push.new_image()

    if ( !save_images_path ) return HttpResponse(StatusCode.ConflicWithServer)

    // And create project in database
    const create_projet = await Projet.new_project(project as Project)

    if( create_projet ){
      return HttpResponse(StatusCode.Success)
    }

    return HttpResponse(StatusCode.ConflicWithServer)
  }

  // Or return an error without save project in the database
  return HttpResponse(StatusCode.InternalError)
}

type PATCHProject = {
  _id: string,
  title: string,
  description: string,
  competences: Competence[],
  services: string[],
  client: string,
  duree: string,
  background_image: File | string,
  link?: string
  type: string,
  content: {
    title: string,
    description?: string,
    images: {
      file: File,
      path: string
      alt: string,
      offsetTop: number,
      strengh: number,
      responciveOffsetTop: number,
      responciveStrengh: number
    }[]
  }[]
}

async function PATCH(req: Request) {
  await connectionToDatabase()

  let formData = await req.formData()
  let project = formToObject<PATCHProject>(formData)

  if ( !project._id ) return HttpResponse(StatusCode.NotFound)

  for ( const key in project ) {
    if ( key.includes("content.")) {
      const splitKey = key.split(".")
      const contentIndex = Number(splitKey[1])
      const imageIndex = Number(splitKey[2])

      project.content[contentIndex].images[imageIndex].file = project[key]
    }
  }

  let image_gestion = new ImagesGestion()
  let github_manager = new Github()

  let project_content_images: File[] = []

  console.log(project.background_image)

  if ( typeof project.background_image !== "string" ) {
    project_content_images.push(project.background_image)
  }

  if ( project.content.length > 0 ){
    for ( let i = 0; i < project.content.length; i++ ) {
      if ( project.content[i].images.length > 0 ) {
        project.content[i].images.map(image => typeof image.file !== "string" ? project_content_images.push(image.file) : null)
      }
    }
  }

  let filter_image_to_push = await image_gestion.append_file([...project_content_images])


  let push_passed = true;

  console.log(project.content[0].images)


  if ( filter_image_to_push.files.length > 0 ) {
    let files_pushing = await github_manager.push_gihtub_files(filter_image_to_push.files)

    push_passed = files_pushing
  }

  if ( push_passed ) {
    let images_saved = await filter_image_to_push.new_image()

    if ( !images_saved ) return HttpResponse(StatusCode.ConflicWithServer)

    const update_projet = await Projet.update_project(project)

    if ( update_projet ) return HttpResponse(StatusCode.Success)

    return HttpResponse(StatusCode.NotFound)
  }

  return HttpResponse(StatusCode.InternalError)
}

async function DELETE(req: Request){
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)

  let id = searchParams.get("id")

  if ( !id ) return HttpResponse(StatusCode.ConflicWithServer)

  const delete_project = await Projet.delete_project(id)

  if ( delete_project ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.NotFound)
}


export { GET, POST, PATCH, DELETE }
