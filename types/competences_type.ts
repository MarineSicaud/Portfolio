//
// ------ Backend End -----
//

export type B_CompetenceType = {
  _id: string,
  name: string,
  type: "Marketing" | "Design", 
  image_url: File | string
}

export type B_NewCompetenceType = {
  name: string,
  type: "Marketing" | "Design", 
  image: File
}

//
// ------ Frontend End -----
//

export type F_CompetenceComponentType = {
  _id: string,
  type: "Marketing" | "Design", 
  name: string,
  image_url: string
}
