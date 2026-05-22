import { metadata } from "@/app/layout"
import { ProjectContent } from "@/types/project_type"

export type DataFetch<T> = {
  data: T,
  status: number,
  message: string
}

const WEBSITE_LINK = "http://localhost:3000"
// const WEBSITE_LINK = "https://www.marinesicaud.fr"

class Fetching<T> {
  static async getDatas<T>(url: string): Promise<T | false> {
    const request = await fetch(`${WEBSITE_LINK}/api${url}`)
    
    if ( request.status === 200 ) { 
      const values = await request.json() as DataFetch<T>

      // TODO: Error Handle in the front end ( #4 )

      return values.data
    }

    console.log(request)
    return false
  }



  static async postDatas<T extends Record<string, any>>(url: string, data: T): Promise<boolean> {
    const formData = this.createFormData<T>(data);


    const request = await fetch(`${WEBSITE_LINK}/api${url}`, {
      method: "POST",
      body: formData
    })
    
    if ( request.status === 200 ) { 
      return true
    }

    console.log(request)
    return false

  }

  static async patchDatas<T extends Record<string, any>>(url: string, data: T): Promise<boolean> {
    const formData = this.createFormData<T>(data);

    const request = await fetch(`${WEBSITE_LINK}/api${url}`, {
      method: "PATCH",
      body: formData
    })
    
    if ( request.status === 200 ) { 
      return true
    }

    console.log(request)
    return false

  }

  static async deleteDatas(url: string, id: string): Promise<boolean> {
    const request = await fetch(`${WEBSITE_LINK}/api${url}?id=${id}`,
      {
        method: "DELETE"
      }
    )
    
    if ( request.status === 200 ) { 
      return true
    }

    console.log(request)
    return false
  }

  static createFormData<T>(data: T): FormData {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value: any = data[key];

        if (typeof value === "object" && !(value instanceof File) || Array.isArray(value) && !(value instanceof File)) {

          // Pour le contenu des projets
          if ( key === "content") {
            // sérialiser les images
            data.content.images = JSON.stringify(data.content.images)
            formData.append(key, JSON.stringify(value));

            data[key].forEach((content: ProjectContent, i: number) => {
              content.images.forEach((image, j: number) => {

                // Ajouter les images independament 
                // dans le fromdata
                formData.append(`content.${i}.${j}`, image.file);

              })
            });

          }else {
            // sérialiser les objets et tableaux
            formData.append(key, JSON.stringify(value));
          }

        } else {
          formData.append(key, value);
        }
      }
    }

    return formData
  }
}

export { Fetching }
