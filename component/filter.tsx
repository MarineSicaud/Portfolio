"use client"

import * as REACT from "react"
import { FilterType } from "./all_projects"

type Props = {
  filter: FilterType,
  setFilter: REACT.Dispatch<REACT.SetStateAction<FilterType>>,
}

function ProjectFilter({ filter, setFilter }: Props){
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
      <option value="Social-Media">Social Media</option>
      <option value="Branding">Branding</option>
    </select>

  </section>
}

export { ProjectFilter }
