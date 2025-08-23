"use client"

import * as REACT from "react"

import { F_ProjectComponentType } from "@/types/project_type";
import { SectionTitle } from "./global/sectionTitle";
import { Colors } from "./global/sphere";
import { ProjectComponent } from "./project_component";

function HomeProject({ projects }: { projects:  F_ProjectComponentType[] }) {
  const [sliderIndex, setSliderIndex] = REACT.useState(0)

  if ( !Array.isArray(projects) ) return <p>Erreur</p>

  REACT.useEffect(() => {
    console.log(projects.length, sliderIndex)
  }, [sliderIndex])

  return <section className="projects-slider-container">

    <SectionTitle text="Projets Récents" color={Colors.Rose} />
    {
      sliderIndex > 0 && projects.length !== 1 ? 
        <span className="left-arrow" onClick={() => setSliderIndex(sliderIndex-1)}/>
        :
        null
    }
    {
      sliderIndex < projects.length - 1 && projects.length !== 1 ?
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
          <ProjectComponent key={project.id_projet} project={project} updating={false}/>
        ))
      }
    </ul>
  </section>
}

export { HomeProject }
