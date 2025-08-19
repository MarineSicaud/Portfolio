import { Project } from "@/types/project_type"
import React from "react"

type Props = {
  value: string,
  setValueKey: string,
  setValue: React.Dispatch<React.SetStateAction<Project>>,
  fontSize: number,
  style?: Object
}

function DashboardInput({ value, style, setValue, fontSize, setValueKey }: Props){
  function update(value: string) {
    setValue((prev) => ({
      ...prev,
      [setValueKey]: value
    }))
  }

  return <input onChange={(e) => update(e.target.value)} style={{...style, fontSize: `${fontSize}rem`}} value={value} placeholder={`Veuillez renseignez le ${setValueKey}`} /> 
}

export { DashboardInput }
