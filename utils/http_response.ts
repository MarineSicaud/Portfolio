import { HttpResponseDataParam, StatusCode } from "@/types/http_response_type";
import { NextResponse } from "next/server";

function HttpResponse(
  status: StatusCode,
  data?: HttpResponseDataParam
) {
  let message = ""

  switch (status){
    case StatusCode.Success :
      message = "Votre requete a ete realiser avec succes."
      break

    case StatusCode.Redirection: 
      message = "Vous allez etre rediriger avec une autre page."
      break

    case StatusCode.NotFound :
      message = "Nous n'avons pas trouver de donnees valide a votre requete."
      break

    case StatusCode.UnAuthorized: 
      message = "Vous n'etes pas authoriser a realiser cette action."
      break

    case StatusCode.ConflicWithServer: 
      message = "Il y a eu une erreur coter serveur, si cela ce realiser trop souvent, veuillez me contactez."
      break

    case StatusCode.InternalError:
      message = "Il y a un erreur interne au serveur, veuillez me contactez pour la raisoudre au plus vite."
      break

    default:
      break
  }

  return NextResponse.json(
    {
      data,
      status,
      message
    },
    {
      status
    }
  )
}

export { HttpResponse }
