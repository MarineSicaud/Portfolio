import { StatusCode } from "@/types/http_response_type";
import { Project } from "@/types/project_type";
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

async function POST(req: Request){
  await connectionToDatabase()

  let json = await req.json() as Project

  if ( json._id ) return HttpResponse(StatusCode.ConflicWithServer)

  const create_projet = await Projet.new_project(json)

  if( create_projet ){
    return HttpResponse(StatusCode.Success)
  }

  return HttpResponse(StatusCode.ConflicWithServer)
}

async function PATCH(req: Request) {
  await connectionToDatabase()

  let json = await req.json() as Project

  const update_projet = await Projet.update_project(json)

  if ( update_projet ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.NotFound)
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
