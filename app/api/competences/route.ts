import { Competence, NewCompetence } from "@/types/competences_type";
import { StatusCode } from "@/types/http_response_type";
import { Competences } from "@/utils/competences";
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

  let json = await req.json() as NewCompetence

  const new_comp = await Competences.new_competence(json)

  if ( !new_comp ) return HttpResponse(StatusCode.ConflicWithServer)

  return HttpResponse(StatusCode.Success)
}

async function PATCH(req: Request) {
  await connectionToDatabase()

  let json = await req.json() as Competence

  const update_comp = await Competences.update_competence(json)

  if ( !update_comp ) return HttpResponse(StatusCode.ConflicWithServer)

  return HttpResponse(StatusCode.Success)
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
