"use client"

import { ProjectComponent } from "@/types/project_type";

import Image from "next/image";
import Link from "next/link";
import * as REACT from "react"

function Project({ project, updating }: { project: ProjectComponent, updating: boolean }) {
  const [position, setPosition] = REACT.useState({
    top: 0,
    left: 0
  })

  const image_container = REACT.useRef<HTMLDivElement>(null)


  function handleMouseMove(e: MouseEvent){
    if ( !image_container.current ) return

    const bound = image_container.current.getBoundingClientRect()

    setPosition({
      top: e.clientY - bound.top, 
      left: e.clientX - bound.left
    })
  }

  REACT.useEffect(() => {
    if( !image_container.current ) return

    image_container.current.addEventListener("mousemove", handleMouseMove)

    return () => {
      if( !image_container.current ) return

      image_container.current.removeEventListener("mousemove", handleMouseMove)
    }
  }, [image_container])



  return <Link href={`${updating ? "/dashboard" : ""}/projets/${project.id_projet}`} className="project-component-container" key={project._id}>
    <div className="image-container" ref={image_container}>
      <Image
        alt={`Image de presentation du projet: ${project.title}`} 
        src={project.image_url}
        height={500}
        width={500}
      />

      <span className="change-cursor" style={{ top: position.top, left: position.left }}/>
    </div>

    <h3>{project.title}</h3>

    <ul className="project-categories-container">
      {
        project.services.map((service, i) => (
          <li className="project-categorie" key={i}>{service}</li>
        ))
      }
    </ul>

    <p>{project.description}</p>


  </Link>
}

export { Project }
