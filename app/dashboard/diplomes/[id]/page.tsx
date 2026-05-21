"use client"

export const dynamic = 'force-dynamic';

import { DashboardInput } from "@/component/dashboard_input"
import { Colors } from "@/component/global/sphere"
import { DiplomeType, NewDiplomeType } from "@/types/diplomes_types"
import * as React from "react"

import "@/style/dashboard.scss"
import { Fetching } from "@/utils/fetching"

function NewDiplome( {params} : { params: Promise<{ id: string }>}){
  const contentRef = React.useRef<HTMLLIElement>(null)

  const { id } = React.use(params)
  
  const [diplome, setDiplome] = React.useState<NewDiplomeType>({
    ecole: "",
    diplome: "",
    description: ""
  })

  async function sendFiles(){
    if ( id === "new" ){ 
      const pushFiles = await Fetching.postDatas<NewDiplomeType>("/diplomes", diplome)
    }else {
      //@ts-ignore
      const updateFiles = await Fetching.patchDatas<DiplomeType>("/diplomes", diplome)
    }
  }

  React.useEffect(() => {
    async function getDatas() {
      const data = await Fetching.getDatas<DiplomeType>(`/diplomes?id=${id}`)

      if ( !data ) return

      setDiplome(data)
    }

    if ( id === "new" ) return

    getDatas()
  }, [id])

  return <section className="new-diplome-page">
      <li className="diplome-container">
    <div className="diplome-information">
      <span> <DashboardInput style={{marginLeft: "0", marginRight: "10px"}} value={diplome.ecole} fontSize={1.3} setValue={setDiplome} setValueKey="ecole" /> - <DashboardInput style={{marginLeft: "10px"}} value={diplome.diplome} fontSize={1} setValue={setDiplome} setValueKey="diplome" /></span>

      <span className="active-arrow" style={{ background: Colors.Rose, transform: "rotate(180deg)"}}/>
    </div>

    <textarea value={diplome.description} onChange={(e) => {
        let textarea = e.target;
        textarea.style.height = "1px";
        textarea.style.height = ( 18*.9 + textarea.scrollHeight ) + "px";
        setDiplome((prev) => ({
      ...prev,
      description: e.target.value
    }))}}
    style={{ outline: "none" }}
    placeholder="Description du diplome"/>
  </li>

  {
    diplome.ecole && diplome.description && diplome.diplome && <button className={"append-button"} onClick={() => sendFiles()}>Sauvegarder</button>
  }
  </section>
}

export default NewDiplome
