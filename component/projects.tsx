"use client"

import * as REACT from "react"
import { ProjectComponent } from "@/types/project_type"
import { useSearchParams } from "next/navigation"
import { Project } from "./project"
import { ProjectFilter } from "./filter"

type Props = {
  projects: ProjectComponent[]
}

export type FilterType = {
  type: string | null,
  competence: string | null
}

function Projects( { projects } : Props) {
  const searchParams = useSearchParams()

  const [ allCompetences, setAllCompetences ] = REACT.useState<string[]>([])

  const [filter, setFilter] = REACT.useState<FilterType>({
    type: searchParams.get("type"),
    competence: searchParams.get("competence"),
  })

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
      <Project key={i} project={projet} updating={false}/>
    )
  }


  REACT.useEffect(() => {
    let c: string[] = []

    for ( let i = 0; i < projects.length; i++ ) {
      let project = projects[i]

      for ( let j = 0; j < project.competences.length; j++ ) {
        if ( !c.includes(project.competences[j]) ) {
          c.push(project.competences[j])
        }
      }
    }


    setAllCompetences(c)
  }, [])
  return <>
      <ProjectFilter filter={filter} setFilter={setFilter} allCompetences={allCompetences} />

      <section className="project-list-container">
        {
          filterProjects()
        }
      </section>
  </>
}

export { Projects }
