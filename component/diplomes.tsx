export const dynamic = 'force‑dynamic';
"use client"

import * as REACT from "react"
import { Colors } from "./global/sphere"
import { DiplomeType } from "@/types/diplomes_types"
import Link from "next/link"
import { Fetching } from "@/utils/fetching"

type Props = {
  dashboard?: boolean,
  diplomes: DiplomeType[]
}

type LineProps = {
  dashboard: boolean,
  diplome: DiplomeType,
  index: number,
  active_state: boolean,
  activeLine: (id: number) => void

}

type State = {
  [id: number]: boolean
}

const colors = [Colors.Rose, Colors.Orange, Colors.Violet]

function Diplomes ({ diplomes, dashboard = false }: Props){
  const [diplomesStates, setDiplomesStates] = REACT.useState<State>({})

  // Init diplomes State to update state of active diplomes or no
  REACT.useEffect(() => {
    function initState(){
      for( let i = 0; i < diplomes.length; i++){
        setDiplomesStates((prev) => ({
          ...prev,
          [diplomes[i]._id]: false
        }))
      }
    }

    initState()
  }, [])

  function activeLine(index: number) {
    const isAlreadyActive = diplomesStates[index] === true;

    const newState: State = {};
    for (const key in diplomesStates) {
      newState[Number(key)] = false;
    }

    if (!isAlreadyActive) {
      newState[index] = true;
    }

    setDiplomesStates(newState);
  }


  return <ul className="diplomes-container">
    {
      diplomes.map((diplome, i) => (
        <DiplomeLine key={i} diplome={diplome} dashboard={dashboard} active_state={diplomesStates[i+1]} activeLine={activeLine} index={i+1}/>
      )) 
    }
  </ul>
}



function DiplomeLine({ diplome, active_state, activeLine, index, dashboard }: LineProps) {
  const contentRef = REACT.useRef<HTMLLIElement>(null);
  const titleRef= REACT.useRef<HTMLParagraphElement>(null)

  async function deleteDiplome(){
    if ( dashboard ) {
      await Fetching.deleteDatas("/diplomes", diplome._id)
    }
  }

  return <li key={diplome._id} className="diplome-container" style={contentRef.current && active_state ? {height: `${contentRef.current.scrollHeight}px`}: titleRef.current ? { height: `${titleRef.current.scrollHeight + 50}px`} : { height: "100px"}} onClick={() => activeLine(index)} ref={contentRef}>
    <div className="diplome-information">
      <p ref={titleRef}>
        <strong>{diplome.ecole}</strong> - {diplome.diplome} 
        { 
          dashboard && <span> | <Link href={`/dashboard/diplomes/${diplome._id}`}>Modifier</Link>  <button onClick={() => deleteDiplome()}>Supprimer</button> </span> 
        } 
      </p>

      <span className="active-arrow" style={{ background: colors[(index - 1) % 3], transform: active_state ? "rotate(180deg)" : "none"}}/>
    </div>

    <p className="diplome-description">
      {diplome.description}
    </p>
  </li>
}

export { Diplomes, DiplomeLine }
