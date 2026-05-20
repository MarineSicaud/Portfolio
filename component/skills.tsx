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
      x: 4,
      y: 87,
      deg: 60
    }
  },
  {
    text: "Autonomie",
    color: getRandom(0, colors.length),
    position: {
      x: 46,
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
      deg: -25
    }
  },
  {
    text: "Organisation",
    color: getRandom(0, colors.length),
    position: {
      x: 40,
      y: 72,
      deg: 10
    }
  },
  {
    text: "Créativité",
    color: getRandom(0, colors.length),
    position: {
      x: 65,
      y: 65.5,
      deg: 12
    }
  },
  {
    text: "Curiosité",
    color: getRandom(0, colors.length),
    position: {
      x: 20,
      y: 57.5,
      deg: 20
    }
  },
  {
    text: "Communication",
    color: getRandom(0, colors.length),
    position: {
      x: 75,
      y: 58.5,
      deg: 12
    }
  },
  {
    text: "Leadership",
    color: getRandom(0, colors.length),
    position: {
      x: 39,
      y: 46.5,
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
      y: 46.8,
      deg: 10
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
          opacity: 0,
          transform: `translate(-50%, -${getRandom(200, 600)}%) scale(1)`,
        },
        {
          transform: `translate(-50%, -50%) scale(1)`,
          opacity: 1,
          duration: .5,
          ease: "back.inOut",
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
    id={i}
    key={i} 
    onMouseEnter={() => {
        skillsRef.current.forEach((el, index) => {
            if ( index !== i ) {
                el.classList.add("no-hover")
            }
        })
    }}
    onMouseLeave={() => {
        skillsRef.current.forEach((el, index) => {
            el.classList.remove("no-hover")
        })
    }}
    style={{ 
        "--background-color": colors[v.color],
        background: colors[v.color], 
        top: `${v.position.y}%`, 
        left: `${v.position.x}%`, 
        rotate: `${v.position.deg}deg`
    }}>
    {v.text}
    </li>
    ))
  }
  </div>
  </div>
}

export { Skills }
