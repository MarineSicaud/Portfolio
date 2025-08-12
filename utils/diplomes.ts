import mongoose from "mongoose";

import { DiplomeType, NewDiplomeType } from "@/types/diplomes_types";
import DiplomeModel from "@/models/DiplomeModel";

class Diplome {
  // Get all diplomes
  static async get_all_diplomes(): Promise<DiplomeType[]>{
    const diplomes = await DiplomeModel.find({})

    return diplomes
  }

  // Get one diplome
  static async get_one_diplome(id: string): Promise<DiplomeType> {
    const diplome = await DiplomeModel.findOne({ _id: new mongoose.Types.ObjectId(id)})

    return diplome
  }

  // New diplome
  static async new_diplome(d: NewDiplomeType): Promise<boolean> {
    const { ecole, diplome, description } = d

    const create_diplome = await DiplomeModel.create({
      ecole,
      diplome,
      description
    })

    if ( create_diplome.__v !== null || create_diplome.__v !== undefined ) {
      return true
    }

    return false
  }

  // Update diplome
  static async update_diplome(d: DiplomeType): Promise<boolean> {
    const { _id, ecole, diplome, description } = d

    const update = await DiplomeModel.updateOne(
      { _id: new mongoose.Types.ObjectId(_id)},
      {
        ecole,
        diplome,
        description
      }
    )

    if ( update.modifiedCount === 1 ) return true

    return false
  }

  // Delete diplome
  static async delete_diplome(id: string): Promise<boolean> {
    const delete_d = await DiplomeModel.deleteOne({ _id: new mongoose.Types.ObjectId(id)})

    if ( delete_d.deletedCount === 1 ) return true

    return false
  }
}

export { Diplome }
