import Image from "next/image"

type Props = {
  id?: string,
  image_url: string,
  name: string,
}

function Competence({ id, image_url, name }: Props){
  return <div className="competence-component">
    <Image
      alt={`logo de ${name}`}
      src={image_url}
      width={50}
      height={50}
    />
    
    <p>{name}</p>
  </div> 
}

export { Competence }
