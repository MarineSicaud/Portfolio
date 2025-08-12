import { Competence } from "./competences_type"

export type ProjectComponent = {
  _id: string,
  id_projet: string,
  image_url: string,
  title: string,
  description: string,
  services: string[],
  date?: string
}

export type ProjectContent = {
  title: string,
  description?: string,
  images: {
    url: string,
    alt: string,
    offsetTop: number,
    strengh: number,
    responciveOffsetTop: number,
    responciveStrengh: number
  }[]
}

export type Project = {
  _id: string,
  title: string,
  description: string,
  competences: Competence[],
  services: string[],
  client: string,
  duree: string,
  background_image: string,
  link?: string
  content: ProjectContent[]
}
