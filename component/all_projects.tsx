"use client"

import * as REACT from "react"
import { F_ProjectComponentType } from "@/types/project_type"
import { useSearchParams } from "next/navigation"
import { ProjectComponent } from "./project_component"
import { ProjectFilter } from "./filter"

type Props = {
  projects: F_ProjectComponentType[]
}

export type FilterType = {
  type: string | null,
}

function AllProjects( { projects } : Props) {
  const searchParams = useSearchParams()

  const [filter, setFilter] = REACT.useState<FilterType>({
    type: searchParams.get("type"),
  })

  function filterProjects(){
    let finalProjects = projects

    if ( filter.type ){
      finalProjects = finalProjects.filter((project) => project.type === filter.type)
    }

    if ( finalProjects.length === 0) {
      return <p>Aucun projet ne correspond a vos filtres</p>
    }

    return finalProjects.map(( projet, i ) => 
      <ProjectComponent key={i} project={projet} updating={false}/>
    )
  }

  return <>
      <ProjectFilter filter={filter} setFilter={setFilter} />

      <section className="project-list-container">
        {
          filterProjects()
        }
      </section>
  </>
}

export { AllProjects }
