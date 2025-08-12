import { DiplomeType, NewDiplomeType } from "@/types/diplomes_types";
import { StatusCode } from "@/types/http_response_type";
import { Diplome } from "@/utils/diplomes";
import { HttpResponse } from "@/utils/http_response";
import { connectionToDatabase } from "@/utils/mongodb";

async function GET(req: Request){
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") || undefined

  let diplomes: DiplomeType | DiplomeType[];

  if ( id ) {
    diplomes = await Diplome.get_one_diplome(id)
  }else {
    diplomes = await Diplome.get_all_diplomes()
  }

  if ( Array.isArray(diplomes) || diplomes !== null ){
    return HttpResponse(StatusCode.Success, diplomes)
  }

  return HttpResponse(StatusCode.ConflicWithServer)
}

async function POST(req: Request){
  await connectionToDatabase()

  const json = await req.json() as NewDiplomeType

  const new_diplome = await Diplome.new_diplome(json)

  if ( new_diplome ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.InternalError)
}

async function PATCH(req: Request) {
  await connectionToDatabase()

  let json = await req.json() as DiplomeType

  let update_diplome = await Diplome.update_diplome(json)

  if ( update_diplome ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.ConflicWithServer)
}

async function DELETE(req: Request){
  await connectionToDatabase()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if( !id ) return HttpResponse(StatusCode.UnAuthorized)

  const delete_diplome = await Diplome.delete_diplome(id)

  if ( delete_diplome ) return HttpResponse(StatusCode.Success)

  return HttpResponse(StatusCode.ConflicWithServer)
}

export { GET, POST, PATCH, DELETE }
