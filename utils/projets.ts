import mongoose from "mongoose"

import ProjetComponentModel from "@/models/ProjetComponentModel"
import ProjetModel from "@/models/ProjetModel"
import { Project, ProjectComponent } from "@/types/project_type"

class Projet {
  // Get all projects component
  static async get_all_projets_component(): Promise<ProjectComponent[]> {
    const projets_component = await ProjetComponentModel.find({})

    return projets_component
  }

  static async get_component_from_project(id: string): Promise<ProjectComponent> {
    const projets_component = await ProjetComponentModel.findOne({id_projet: new mongoose.Types.ObjectId(id)})

    return projets_component
  }

  // Get last projects component
  static async get_last_projets_component(length: number): Promise<ProjectComponent[]> {
    const projets_component = await ProjetComponentModel.find(
      {},
      {},
      {
        sort: { date: -1 },
        limit: length
      }
    )

    if ( projets_component.length === length ){
      return projets_component
    }else {
      console.error("Le nombre de projet n'est pas optimale et pourrait conduire a des soucis d'affichage. ", `Voulu: ${length}, Recu: ${projets_component.length}`)
      return projets_component
    }
  }

  // Get one project
  static async get_project(id: string): Promise<Project> {
    const project = await ProjetModel.findOne({ _id: new mongoose.Types.ObjectId(id) })

    return project
  }


  // New project
  static async new_project(p: Project): Promise<boolean>{
    const date = new Date()

    const { title, type, description, background_image, services, duree, client, competences, link, content } = p

    let content_with_image_path = content.map(c => ({
      ...c,
      images: c.images.map(img => ({
        ...img,
        path: `/images/${img.file.name}`
      }))
    }))

    const new_project = await ProjetModel.create({
      title,
      description,
      background_image: `/images/${background_image.name}`,
      services,
      duree,
      client,
      competences,
      link,
      type,
      content: content_with_image_path
    })

    const new_projet_component = await ProjetComponentModel.create({
      id_projet: new_project._id,
      title,
      description,
      type,
      competences,
      image_url: `/images/${background_image.name}`,
      services,
      date: `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`
    })

    if ( new_projet_component.__v !== null || new_projet_component !== undefined && new_project.__v !== null || new_project.__v !== undefined ){
      return true
    }

    return false
  }

  // Delete project
  static async delete_project(id: string): Promise<boolean>{
    const project_deleted = await ProjetModel.deleteOne({_id: new mongoose.Types.ObjectId(id)})
    const project_component_deleted = await ProjetComponentModel.deleteOne({id_projet: new mongoose.Types.ObjectId(id)})

    if ( project_deleted.deletedCount === 1 && project_component_deleted.deletedCount === 1) {
      return true
    }

    return false
  }

  // Update project
  static async update_project(p: Project): Promise<boolean> {
    const { _id, type, title, description, background_image, services, duree, client, competences, link, content } = p

    let content_with_image_path = content.map(c => ({
      ...c,
      images: c.images.map(img => ({
        ...img,
        path: !img.path.includes("data") ? img.path : `/images/${img.file.name}`
      }))
    }))

    const project_update = await ProjetModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, {
      title,
      description,
      background_image: typeof background_image === "string" ? background_image : `/images/${background_image.name}`,
      services,
      duree,
      client,
      competences,
      link,
      type,
      content: content_with_image_path
    })

    const project_component_update = await ProjetComponentModel.updateOne(
      { id_projet: new mongoose.Types.ObjectId(_id) },
      {
        title,
        description,
        services,
        image_url: typeof background_image === "string" ? background_image : `/images/${background_image.name}`,
      }
    )

    console.log(project_update, project_component_update)

    if (project_update.matchedCount > 0 && project_component_update.matchedCount > 0){
      return true
    }

    console.log("this 404")
    return false
  }
}

export { Projet }
