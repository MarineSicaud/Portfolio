import { Competence } from "./competences_type";
import { DiplomeType } from "./diplomes_types";
import { Project, ProjectComponent } from "./project_type";
import { ReviewType } from "./review_type";

export enum StatusCode {
  // 2--
  Success = 200,

  // 3--
  Redirection = 301,

  // 4--
  UnAuthorized = 401,
  NotFound = 404,
  ConflicWithServer = 409,

  // 5--
  InternalError = 500
}

export type B_HttpResponseDataParam = ProjectComponent[] | Project | Competence | Competence[] | DiplomeType | DiplomeType[] | ReviewType | ReviewType[]
