import { StatusCode } from "@/types/http_response_type";
import { ProjectComponent } from "@/types/project_type";
import { HttpResponse } from "@/utils/http_response";
import { connectionToDatabase } from "@/utils/mongodb"
import { Projet } from "@/utils/projets";

async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const length = Number(searchParams.get("length")) || undefined

  try {
    await connectionToDatabase()

    let projets: ProjectComponent[];

    if ( length ){
      projets = await Projet.get_last_projets_component(length)
    } else {
      projets = await Projet.get_all_projets_component()
    }

    if ( projets ) {
      return HttpResponse(StatusCode.Success, projets)
    }

    return HttpResponse(StatusCode.NotFound)

  } catch (error) {
    console.log(error)
    return HttpResponse(StatusCode.InternalError)
  }
}

export { GET }
