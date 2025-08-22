//
// ------ Font End -----
//

export type F_ProjectComponentType = {
  _id: string,
  id_projet: string,
  image_url: string,
  title: string,
  description: string,
  services: string[],
  type: string,
  date?: string
}

export type F_ProjectType = {
  _id: string,
  title: string,
  type: string,
  description: string,
  services: string[],
  client: string,
  duree: string,
  background_image: string
  link?: string,
  content: F_ProjectContentType[]
}

export type F_ProjectContentType = {
  title: string,
  description?: string,
  images: {
    path: string,
    alt: string,
  }[]
}

//
// ------ Backend End -----
//

export type B_ProjectContentType = {
  title: string,
  description?: string,
  images: {
    file: File,
    path: string,
    alt: string,
  }[]
}

export type B_ProjectType = {
  _id?: string,
  title: string,
  type: string,
  description: string,
  services: string[],
  client: string,
  duree: string,
  background_image: {
    file: File,
    path: string
  } | string,
  link?: string,
  content: ProjectContent[]
}
