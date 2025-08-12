"use client"

import * as REACT from "react"
import { Colors } from "./global/sphere"


type Diplome = {
  id: number,
  ecole: string,
  nom_diplome: string,
  description: string
}

type Props = {
  diplomes: Diplome[]
}

type LineProps = {
  diplome: Diplome,
  active_state: boolean,
  activeLine: (id: number) => void
}

type State = {
  [id: number]: boolean
}

const colors = [Colors.Rose, Colors.Orange, Colors.Violet]

function Diplomes ({ diplomes }: Props){
  const [diplomesStates, setDiplomesStates] = REACT.useState<State>({})

  // Init diplomes State to update state of active diplomes or no
  REACT.useEffect(() => {
    function initState(){
      for( let i = 0; i < diplomes.length; i++){
        setDiplomesStates((prev) => ({
          ...prev,
          [diplomes[i].id]: false
        }))
      }
    }

    initState()
  }, [])

  function activeLine(id: number) {
    const isAlreadyActive = diplomesStates[id] === true;

    const newState: State = {};
    for (const key in diplomesStates) {
      newState[Number(key)] = false;
    }

    if (!isAlreadyActive) {
      newState[id] = true;
    }

    setDiplomesStates(newState);
  }


  return <ul className="diplomes-container">
    {
      diplomes.map((diplome, i) => (
        <DiplomeLine diplome={diplome} active_state={diplomesStates[diplome.id]} activeLine={activeLine}/>
      )) 
    }
  </ul>
}



function DiplomeLine({ diplome, active_state, activeLine }: LineProps) {
  const contentRef = REACT.useRef<HTMLLIElement>(null);


  return <li key={diplome.id} className="diplome-container" style={contentRef.current && active_state ? {height: `${contentRef.current.scrollHeight}px`}: { height: "100px"}} onClick={() => activeLine(diplome.id)} ref={contentRef}>
    <div className="diplome-information">
      <p><strong>{diplome.ecole}</strong> - {diplome.nom_diplome}</p>

      <span className="active-arrow" style={{ background: colors[(diplome.id - 1) % 3], transform: active_state ? "rotate(180deg)" : "none"}}/>
    </div>

    <p className="diplome-description">
      {diplome.description}
    </p>
  </li>
}

export { Diplomes }
