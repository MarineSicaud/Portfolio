import mongoose from "mongoose"

import CompetenceModel from "@/models/CompetenceModel"
import { Competence, NewCompetence } from "@/types/competences_type"

class Competences {
  // Get competences
  static async get_all_competences(): Promise<Competence[]>{
    let competences = await CompetenceModel.find({})

    return competences
  }

  // Get one competence
  static async get_competence(id: string): Promise<Competence>{
    let competence = await CompetenceModel.findOne({ _id: new mongoose.Types.ObjectId(id)})

    return competence
  }


  // New competence
  static async new_competence(c: NewCompetence): Promise<boolean>{
    const { image_url, name } = c

    const new_comp = await CompetenceModel.create({
      name,
      image_url
    })

    if ( new_comp.__v !== null || new_comp.__v !== undefined ){
      return true
    }
    
    return false
  }


  // Update competence
  static async update_competence(c: Competence): Promise<boolean> {
    const { _id, name, image_url } = c

    const update_comp = await CompetenceModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, {
      name,
      image_url
    })

    if ( update_comp.modifiedCount === 1 ) return true

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
