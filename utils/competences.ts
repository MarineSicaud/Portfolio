import mongoose from "mongoose"

import CompetenceModel from "@/models/CompetenceModel"
import { F_CompetenceComponentType, B_NewCompetenceType, B_CompetenceType } from "@/types/competences_type"

class Competences {
  // Get competences
  static async get_all_competences(): Promise<F_CompetenceComponentType[]>{
    let competences = await CompetenceModel.find({})

    return competences
  }

  // Get one competence
  static async get_competence(id: string): Promise<F_CompetenceComponentType>{
    let competence = await CompetenceModel.findOne({ _id: new mongoose.Types.ObjectId(id)})

    return competence
  }


  // New competence
  static async new_competence(c: B_NewCompetenceType): Promise<boolean>{
    const { image, type, name } = c

    const new_comp = await CompetenceModel.create({
      name,
      type,
      image_url: `/images/${image.name}`
    })

    if ( new_comp.__v !== null || new_comp.__v !== undefined ){
      return true
    }
    
    return false
  }


  // Update competence
  static async update_competence(c: B_CompetenceType): Promise<boolean> {
    const { _id, name, type, image } = c

    const update_comp = await CompetenceModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, {
      name,
      type,
      image_url: typeof image === "string" ? image : `/images/${image.name}`
    })

    if ( update_comp.matchedCount > 0 ) return true

    return false
  }

  // Delete competence
  static async delete_competence(id: string): Promise<boolean> {
    const delete_comp = await CompetenceModel.deleteOne( {_id: new mongoose.Types.ObjectId(id)} )

    if ( delete_comp.deletedCount === 1 ) return true

    return false
  }
}

export { Competences }
