export const dynamic = 'force‑dynamic';
"use client"

import { DashboardInput } from "@/component/dashboard_input"
import Image from "next/image"
import React from "react"

import "@/style/dashboard.scss"
import { B_CompetenceType, B_NewCompetenceType } from "@/types/competences_type"
import { Fetching } from "@/utils/fetching"

function NewComp({params}: { params: Promise<{ id: string }>}){
  const [competences, setCompetences] = React.useState({
    name: "",
    image: {
      file: new File([""], "file.name"),
      path: ""
    },
    type: ""
  })

  const { id } = React.use(params)

  React.useEffect(() => {
    async function getData() {
      type B_CompetenceType = {
        _id: string,
        name: string,
        type: string,
        image_url: string
      }
      const datas = await Fetching.getDatas<B_CompetenceType>(`/competences?id=${id}`)
      console.log(datas)

      if ( !datas ) return 

        const comp = {
    name: datas.name,
    image: {
      file: new File([""], "file.name"),
      path: datas.image_url
    },
    type: datas.type
        }


      setCompetences(comp)
    }

    if ( id !== "new"){
      getData() 
    }
  }, [id])


  async function sendCompetences(){
    let newComp: B_NewCompetenceType = {
      name: competences.name,
      image: competences.image.file,
      type: competences.type as "Marketing" | "Design"
    }

    if ( id === "new") {
      const newCompetences = await Fetching.postDatas<B_NewCompetenceType>("/competences", newComp)
    }
    else{
     //@ts-ignore
     newComp._id = id 
  
     if ( competences.image.file.name === "file.name"){
        //@ts-ignore
        newComp.image = competences.image.path 
    }

        //@ts-ignore
      const updateCompetences = await Fetching.patchDatas<B_CompetenceType>("/competences", newComp)
    }
  }

  return <>
  <article className="new-competence-component">

   <input type="file" onChange={(e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            setCompetences((prev) => ({
              ...prev,
              image: {
                path: pathname,
                file: file
              }
            }))
          }

    }}/> 
    {
      competences.image.path ?
      <Image
      alt={`logo de ${competences.name}`}
      src={competences.image.path}
      width={50}
      height={50}
    />
    : <span style={{width: "50px", height: "50px"}} />
    }
    
    <DashboardInput value={competences.name} setValue={setCompetences} fontSize={1} setValueKey="name" />

    <select onChange={(e) => {
            setCompetences((prev) => ({
              ...prev,
              type: e.target.value
            }))
    }} value={competences.type}>
      <option value={""}>Selectionne le type de competence</option>
      <option value={"Marketing"}>Marketing</option>
      <option value={"Design"}>Design</option>
    </select>
  </article>


  {
    competences.name && competences.image.file && competences.type && <button onClick={() => sendCompetences()}>Push</button>
  }
  </> 
}

export default NewComp
