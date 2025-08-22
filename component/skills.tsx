"use client"

import * as REACT from "react"
import { getRandom } from "@/utils/get_random"
import { Colors } from "./global/sphere"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap/gsap-core"

const colors = [Colors.Rose, Colors.Orange, Colors.Violet]
const skills = [
  {
    text: "Esprit d'équipe",
    color: getRandom(0, colors.length),
    position: {
      x: 50,
      y: 92,
      deg: 0
    }
  },
  {
    text: "Persévérance",
    color: getRandom(0, colors.length),
    position: {
      x: 18,
      y: 72,
      deg: 45
    }
  },
  {
    text: "Autonomie",
    color: getRandom(0, colors.length),
    position: {
      x: 53,
      y: 81.7,
      deg: 0
    }
  },
  {
    text: "Adaptabilité",
    color: getRandom(0, colors.length),
    position: {
      x: 78,
      y: 68,
      deg: -15
    }
  },
  {
    text: "Organisation",
    color: getRandom(0, colors.length),
    position: {
      x: 40,
      y: 68,
      deg: 13
    }
  },
  {
    text: "Créativité",
    color: getRandom(0, colors.length),
    position: {
      x: 60,
      y: 59.5,
      deg: 0
    }
  },
  {
    text: "Curiosité",
    color: getRandom(0, colors.length),
    position: {
      x: 20,
      y: 53.5,
      deg: 12
    }
  },
  {
    text: "Communication",
    color: getRandom(0, colors.length),
    position: {
      x: 75,
      y: 50,
      deg: 10
    }
  },
  {
    text: "Leadership",
    color: getRandom(0, colors.length),
    position: {
      x: 35.5,
      y: 45,
      deg: 5
    }
  },
  {
    text: "Autodidacte",
    color: getRandom(0, colors.length),
    position: {
      x: 22,
      y: 34,
      deg: 2
    }
  },
  {
    text: "Esprit critique",
    color: getRandom(0, colors.length),
    position: {
      x: 79,
      y: 40.5,
      deg: 10
    }
  },
  {
    text: "Esprit d'équipe",
    color: getRandom(0, colors.length),
    position: {
      x: 50,
      y: 26,
      deg: 6
    }
  },
]

function Skills() {
  const skillsRef = REACT.useRef<HTMLLIElement[]>([])
  
  useGSAP(() => {
    if (skillsRef.current.length === 0) return
    for (let i = 0; i < skillsRef.current.length; i++){
      let el = skillsRef.current[i] as HTMLElement;

      gsap.fromTo(el.style, 
        {
          transform: `translate(-50%, -${getRandom(200, 600)}%) rotate(${skills[i].position.deg}deg)`,
        },
        {
          transform: `translate(-50%, -50%) rotate(${skills[i].position.deg}deg)`,
          duration: 1,
          ease: "bounce.out"
        }
      )
    }
  }, [skillsRef])

  return <div className="profil-header-right-container">
  <h3>SKILLS</h3>

  <div className="soft-skills-container">
  {
    skills.map((v, i) => (
      <li 
      ref={(el) => {
        if (el) skillsRef.current[i] = el
      }} 
    key={i} 
    style={{ 
      background: colors[v.color], 
      top: `${v.position.y}%`, 
      left: `${v.position.x}%`, 
      transform: `translate(-50%, -50%) rotate(${v.position.deg}deg)`
    }}>
    {v.text}
    </li>
    ))
  }
  </div>
  </div>
}

export { Skills }
