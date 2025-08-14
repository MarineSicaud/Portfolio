"use client"

import * as REACT from "react"

import { ProjectComponent } from "@/types/project_type";
import { SectionTitle } from "./global/sectionTitle";
import { Colors } from "./global/sphere";
import { Project } from "./project";

function HomeProject({ projects }: { projects: [ProjectComponent, ProjectComponent, ProjectComponent] }) {
  const [sliderIndex, setSliderIndex] = REACT.useState(0)

  console.log(projects)
  if ( !Array.isArray(projects) ) return <p>Erreur</p>

  return <section className="projects-slider-container">

    <SectionTitle text="Projets Récents" color={Colors.Rose} />

    {
      sliderIndex > 0 ? 
        <span className="left-arrow" onClick={() => setSliderIndex(sliderIndex-1)}/>
        :
        null
    }
    {
      sliderIndex < 2 ?
        <span className="right-arrow" onClick={() => {
          setSliderIndex(sliderIndex+1)
          console.log("click")
        }} />
        :
        null
    }

    <ul className="projects-slider" style={{ transform: `translateX(-${sliderIndex * 36 }%)` }}>
      {
        projects.map((project) => (
          <Project _id={project._id} title={project.title} services={project.services} image_url={project.image_url} id_projet={project.id_projet} description={project.description} key={project._id} />
        ))
      }
    </ul>
  </section>
}

export { HomeProject }
