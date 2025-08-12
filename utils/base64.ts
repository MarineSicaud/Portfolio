function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const base64 = fileReader.result as string;

      if ( base64 ) {
        const base64String = base64.split(",")[1]
        resolve(base64String)
      }


      reject(`Nous n'avous pas pu telecharger le fichier: ${file.name}`)
    }

    fileReader.onerror = (err) => {
      reject(`Il y a eu une erreur pendant le processus: ${err}`);
    }
  })
}

export default toBase64
