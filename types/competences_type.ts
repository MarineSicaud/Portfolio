export type Competence = {
  _id: string,
  name: string,
  type: string, // Marketing / Design
  image: File
}

export type NewCompetence = {
  name: string,
  type: string, // Marketing / Design
  image: File
}

export type CompetenceComponent = {
  _id: string,
  type: string, // Marketing / Design
  name: string,
  image_url: string
}
