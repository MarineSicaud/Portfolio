import Image from "next/image"
import Link from "next/link"

type Props = {
  id?: string,
  image_url: string,
  name: string,
  dashboard?: boolean
}

function Competence({ id, image_url, name, dashboard = false }: Props){
  return <Link href={dashboard ? `/dashboard/competences/${id}` :`/projets?competence=${name}`} className="competence-component">
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
