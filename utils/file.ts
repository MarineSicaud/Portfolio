import FileModel from "@/models/FileModel";
import { FileType } from "@/types/files_type";
import toBase64 from "./base64";

class ImagesGestion {
  public files: FileType[]
  public urls: String[]

  constructor(){
    this.files = []
    this.urls = []
  }

  async append_file(files: File[]): Promise<this> {
    console.log(files)
    for ( let i = 0; i < files.length; i++ ) {
      let url = `/images/${files[i].name}`

      let image_already_exist = await this.already_exist(url)

      if ( image_already_exist ) continue

      const base64 = await toBase64(files[i])

      this.files.push({
        content: base64,
        path: `public/images/${files[i].name}`
      })

      this.urls.push(
        url
      )
    }
    return this
  }

  public async new_image(): Promise<boolean> {
    for ( let i = 0; i < this.urls.length; i++ ) {
      const path = this.urls[i]

      const new_img = await FileModel.create({
        path
      })

      if ( new_img.__v !== null && new_img.__v !== undefined) {
        continue
      }

      return false
    }

    console.log("all images are saved")
    return true
  }

  private async already_exist(path: string): Promise<boolean> {
    const path_find = await FileModel.findOne({ path })

    if ( path_find ) return true

    return false
  }
}

export { ImagesGestion }
