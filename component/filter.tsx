"use client"

import * as REACT from "react"

import { FilterType } from "@/app/projets/page"

type Props = {
  filter: FilterType,
  setFilter: REACT.Dispatch<REACT.SetStateAction<FilterType>>,
  allCompetences: string[]
}

function ProjectFilter({ filter, setFilter, allCompetences }: Props){
  function handleChange(value: string, key: "type" | "competence"){
    let new_value: string | null = null

    if ( value !== "" ){
      new_value = value
    }

    setFilter((prev: FilterType) => ({
      ...prev,
      [key]: new_value
    }))
  }

  return <section className="filters-container">
    <select className="filter-select type" value={filter.type || ""} onChange={(e) => handleChange(e.target.value, "type")}>
      <option value="">Type</option>
      <option value="Marketing">Marketing</option>
      <option value="Logofolio">Logofolio</option>
      <option value="Branding">Branding</option>
    </select>

    <select className="filter-select competence" value={filter.competence || ""} onChange={(e) => handleChange(e.target.value, "competence")}>
      <option value="">Competence</option>
      {
        allCompetences.map((c, i) => 
          <option key={i} value={c}>{c}</option>
        )
      }
    </select>

  </section>
}

export { ProjectFilter }
