import Image from "next/image"
import Link from "next/link"

type Props = {
  image_url: string,
  name: string 
}

function Competence({ image_url, name }: Props){
  return <Link href={`/projets?competence=${name}`} className="competence-component">
    <Image
      alt={`logo de ${name}`}
      src={image_url}
      width={50}
      height={50}
    />
    
    <p>{name}</p>
  </Link> 
}

export { Competence }
