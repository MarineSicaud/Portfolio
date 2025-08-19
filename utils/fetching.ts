import { metadata } from "@/app/layout"
import { ProjectContent } from "@/types/project_type"

export type DataFetch<T> = {
  data: T,
  status: number,
  message: string
}

class Fetching<T> {
  static async getDatas<T>(url: string): Promise<T | false> {
    const request = await fetch(`http://localhost:3000/api${url}`)
    
    if ( request.status === 200 ) { 
      const values = await request.json() as DataFetch<T>

      return values.data
    }

    console.error(request)
    return false
  }


  static async postDatas<T extends Record<string, any>>(url: string, data: T): Promise<boolean> {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value: any = data[key];

        if (typeof value === "object" && Array.isArray(value) && !(value instanceof File)) {

          if ( key === "content") {
            // sérialiser les objets et tableaux
            data.content.images = JSON.stringify(data.content.images)
            formData.append(key, JSON.stringify(value));

            data[key].forEach((content: ProjectContent, i: number) => {
              content.images.forEach((image, j: number) => {
                console.log(image)
                formData.append(`content.${i}.${j}`, image.file);
                
              })

              console.log(content.images)
            });
          }else {
            // sérialiser les objets et tableaux
            formData.append(key, JSON.stringify(value));
          }

        } else {
          console.log(key, "non")
          formData.append(key, value);
        }
      }
    }

    const request = await fetch(`http://localhost:3000/api${url}`, {
      method: "POST",
      body: formData
    })
    
    if ( request.status === 200 ) { 
      return true
    }

    console.error(request)
    return false

  }

  static async patchDatas<T extends Record<string, any>>(url: string, data: T): Promise<boolean> {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value: any = data[key];

        if (typeof value === "object" && Array.isArray(value) && !(value instanceof File)) {

          if ( key === "content") {
            // sérialiser les objets et tableaux
            data.content.images = JSON.stringify(data.content.images)
            formData.append(key, JSON.stringify(value));

            data[key].forEach((content: ProjectContent, i: number) => {
              content.images.forEach((image, j: number) => {
                console.log(image)
                formData.append(`content.${i}.${j}`, image.file);
                
              })

              console.log(content.images)
            });
          }else {
            // sérialiser les objets et tableaux
            formData.append(key, JSON.stringify(value));
          }

        } else {
          console.log(key, "non")
          formData.append(key, value);
        }
      }
    }

    const request = await fetch(`http://localhost:3000/api${url}`, {
      method: "PATCH",
      body: formData
    })
    
    if ( request.status === 200 ) { 
      return true
    }

    console.error(request)
    return false

  }

  static async deleteDatas(url: string, id: string): Promise<boolean> {
    const request = await fetch(`http://localhost:3000/api${url}?id=${id}`,
      {
        method: "DELETE"
    }
    )
    
    if ( request.status === 200 ) { 
      return true
    }

    console.error(request)
    return false
  }
}

export { Fetching }
