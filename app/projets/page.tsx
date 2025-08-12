"use client"

import { usePage } from "@/hooks/usePage"
import { useSearchParams } from "next/navigation"
import * as REACT from "react"

import { ProjectFilter } from "@/component/filter"
import FinalNavbar from "@/component/global/navbar"
import "../../style/list_projects.scss"
import { Project } from "@/component/project"
import { Footer } from "@/component/global/footer"

export type FilterType = {
  type: string | null,
  competence: string | null
}

const projects = [
  {
    title: "Jimmy Fairly",
    image_url:"/images/MockupZigZag.jpg",
    services:["Je ne sais pas", "Marketing", "Je teste les longues phrase au cas ou"],
    description:"Je ne sais pas quoi mettre en description, mais il faut quelle soient un peu plus longue pour savoir si je peux faire quelque chose de styler en css ou pas",
    type: "Marketing",
    date:"test",
    competences: ["Photoshop", "Illustrator"]
  },
  {
    title: "Jimmy Fairly",
    image_url:"/images/MockupZigZag.jpg",
    services:["Je ne sais pas", "Logo", "Je teste les longues phrase au cas ou"],
    description:"Je ne sais pas quoi mettre en description, mais il faut quelle soient un peu plus longue pour savoir si je peux faire quelque chose de styler en css ou pas",
    type: "Logofolio",
    date:"test",
    competences: ["Illustrator"]
  },
  {
    title: "Jimmy Fairly",
    image_url:"/images/MockupZigZag.jpg",
    services:["Je ne sais pas", "branding", "Je teste les longues phrase au cas ou"],
    description:"Je ne sais pas quoi mettre en description, mais il faut quelle soient un peu plus longue pour savoir si je peux faire quelque chose de styler en css ou pas",
    type: "Branding",
    date:"test",
    competences: ["Photoshop"]
  },
]

export default function ProjectsList(){
  const infoPage = usePage()
  const searchParams = useSearchParams()

  const [filter, setFilter] = REACT.useState<FilterType>({
    type: searchParams.get("type"),
    competence: searchParams.get("competence"),
  })

  const social_media = [
    {
      id: 0,
      name: "Linkedin",
      link: "https://www.linkedin.com/in/marine-sicaud/"
    },
    {
      id: 1,
      name: "Gmail",
      link: "mailto:sicaud.marine.pro@gmail.com"
    }
  ]


  function filterProjects(){
    let finalProjects = projects

    if ( filter.type ){
      finalProjects = finalProjects.filter((project) => project.type === filter.type)
    }

    if( filter.competence ){
      finalProjects = finalProjects.filter((project) => project.competences.includes(filter.competence!))
    }

    if ( finalProjects.length === 0) {
      return <p>Aucun projet ne correspond a vos filtres</p>
    }

    return finalProjects.map(( projet, i ) => 
      <Project services={projet.services} description={projet.description} title={projet.title} id={i} image_url="/images/MockupZigZag.jpg" key={i} date={projet.date}/>
    )
  }

  return <>
    <FinalNavbar pageInfo={infoPage}/>

    <section className="project-page-container">
      <ProjectFilter filter={filter} setFilter={setFilter} />

      <section className="project-list-container">
        {
          filterProjects()
        }
      </section>
    </section>

    <Footer social_media={social_media}/>
  </>
}
