'use client'

import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import * as REACT from 'react'

import FinalNavbar from "@/component/global/navbar"
import { usePage } from "@/hooks/usePage"
import { Colors, Sphere } from "@/component/global/sphere"
import { getRandom } from "@/utils/get_random"

import "../../style/profil.scss"
import { Diplomes } from "@/component/diplomes"
import { Footer } from "@/component/global/footer"
import { SectionTitle } from "@/component/global/sectionTitle"

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

export default function Profil(){
  const pageinfo = usePage()

  const skillsRef = REACT.useRef<HTMLLIElement[]>([])

  const social_media = [
    {
      id: 0,
      name: "Linkedin",
      link: "https://www.linkedin.com/in/marine-sicaud/"
    },
    {
      id: 1,
      name: "Gmail",
      link: "mailto:sicaud.marine.pro@gmail.com"
    }
  ]

  const diplomes = [
    {
      id: 1,
      ecole: "MDS",
      nom_diplome: "testing",
      description: `J'ai choisi d'intégrer My Digital School pour développer mes compétences en marketing digital, un domaine qui me passionne profondément pour son pouvoir à transformer la visibilité et la croissance des marques. Cette formation m'a permis d'acquérir des compétences solides en marketing digital, me permettant de concevoir des stratégies efficaces et de mesurer leur impact à travers des outils et des techniques modernes. \n \n

En parallèle, j'ai exploré la communication, un domaine clé pour diffuser des messages percutants et engager efficacement une audience. J'ai développé des compétences en création de contenu pour différents supports, en élaboration de stratégies de communication et en gestion des relations publiques. Cette expertise m’a sensibilisée à l’importance de l’alignement des messages, de la gestion de la réputation de marque, et de la cohérence dans l’ensemble des actions de communication pour instaurer une relation de confiance et favoriser l’engagement. \n \n

Grâce à cette double compétence, je suis désormais capable de coordonner efficacement des projets digitaux, en combinant stratégie marketing et design graphique, pour offrir des résultats créatifs et performants, tout en garantissant des livrables de qualité qui répondent aux besoins des clients et utilisateurs.`
    },
    {
      id: 2,
      ecole: "MDS",
      nom_diplome: "testing",
      description: "oui"
    },
    {
      id: 3,
      ecole: "MDS",
      nom_diplome: "testing",
      description: "oui"
    },
  ]


  let reviews = [
    {
      id: 1,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
    },
    {
      id: 2,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
      job: "Testeur de site internet"
    },
    {
      id: 3,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
    },
    {
      id: 4,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
      job: "Testeur de site internet"
    },
  ]

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
          delay: 1,
          ease: "bounce.out"
        }
      )
    }
  }, [skillsRef])

  return <>
    <FinalNavbar pageInfo={pageinfo} />

    <section className="profil-page-header">
      <div className="profil-header-left-container">
        <div className="image-container">
          <Image
            alt="Image illustrant les lieux de contact"
            src={"/images/marine-secret.png"}
            width={100}
            height={100}
          />
        </div>

        <h2>Marine Sicaud</h2>

        <div className="contact-link-container">
          <Link href={"mailto:marine.sicaud.pro@gmail.com"} style={{ background: Colors.Rose}}>Contact <FontAwesomeIcon icon={faArrowRight} /></Link>
          <Link href={"https://www.linkedin.com/in/marine-sicaud/"}>Linkedin <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
      </div>

      <Sphere 
        container={{
          top: "unset",
          right: "unset",
          bottom: -300,
          left: -300,
          width: 1000,
          height: 1000
        }}

        sphere={{
          top: 0,
          left: 0,
          right: "unset",
          bottom: "unset",
          color: Colors.Rose
        }}

        className="profil-header-sphere"
      />

      <div className="profil-header-right-container">
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
    </section>

    <section className="vision-profil-page-container">
      <div className="slider-container" style={{ rotate: "-2deg" }}>
        <div className="slider right">
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
        </div>
        <div className="slider right">
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
          <span>MA VISION</span>
        </div>
      </div>

      <ul className="list-visions">
        {/* First Vision */}
        <li className="vision-container">
          <Sphere
            container={{
              top: -200,
              left: -300,
              right: "unset",
              bottom: "unset",
              width: 800,
              height: 800
            }}

            sphere={{
              top: 0,
              left: 0,
              right: "unset",
              bottom: "unset",
              color: Colors.Violet
            }}

            className="first-vision-sphere"
          />

          <section className="first-information-container">
            <div className="image-container">
              <Image
                alt="Image illustrant les lieux de contact"
                src={"/images/marine-secret.png"}
                width={100}
                height={100}
              />
            </div>

            <div className="information-container">
              <h3>Ma vision du Marketing</h3>
              <p>
                Le marketing digital est un outil qui permet de générer et augmenter les revenus d’une entreprise.
                <br /> <br />
                Mon approche du marketing digital pour favoriser la croissance en ligne s’articule autour de 3 points :
              </p>
            </div>
          </section>

          <ul className="second-information-container">
            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Violet}}>01</h3>
                <hr />
              </div>

              <h4>Acquisition</h4>
              <p>Attirer une audience susceptible d’être intéressé par l’offre proposé. </p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Orange}}>02</h3>
                <hr />
              </div>

              <h4>Conversion</h4>
              <p>Faire avancer les prospects dans le parcours d’achat.</p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Rose}}>03</h3>
                <hr />
              </div>

              <h4>Rétention</h4>
              <p>Décupler les revenus en fidélisant la clientèle et en augmentant le panier moyen.</p>
            </li>
          </ul>

          <section className="last-information-container">
            <p className="section-title">J’aide les entreprises à augmenter leurs revenus grâce à ces compétences : </p>

            <ul className="competance-container">
              <li className="competances">
                <p>Stratégie d’acquisition</p>
                <p>Content Marketing</p>
                <p>SEO</p>
                <p>Marketing automation</p>
              </li>

              <li className="competances">
                <p>Stratégie de conversion</p>
                <p>Conception Wordpress</p>
                <p>E-mail marketing</p>
                <p>Stratégie de rétention</p>
              </li>

              <li className="competances">
                <p>Gestion de projet</p>
                <p>Planification & Organisation</p>
                <p>Analyse de données</p>
              </li>
            </ul>
          </section>
        </li>

        {/* Second Vision */}
        <li className="vision-container">
          <Sphere
            container={{
              top: -200,
              right: -300,
              left: "unset",
              bottom: "unset",
              width: 800,
              height: 800
            }}

            sphere={{
              top: 0,
              left: 0,
              right: "unset",
              bottom: "unset",
              color: Colors.Orange
            }}

            className="first-vision-sphere"
          />

          <section className="first-information-container special">

            <div className="information-container">
              <h3>Ma vision en Communication </h3>
              <p>
                La communication est un levier stratégique essentiel pour construire une image forte et établir des relations durables avec l’audience.
                <br /> <br />
                Mon approche de la communication se structure autour de 3 axes principaux :
              </p>
            </div>

            <div className="image-container">
              <Image
                alt="Image illustrant les lieux de contact"
                src={"/images/marine-secret.png"}
                width={100}
                height={100}
              />
            </div>
          </section>

          <ul className="second-information-container">
            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Violet}}>01</h3>
                <hr />
              </div>

              <h4>Stratégie</h4>
              <p>Définir des messages clairs et adaptés aux attentes de l’audience, en choisissant les bons canaux pour maximiser l’impact.</p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Orange}}>02</h3>
                <hr />
              </div>

              <h4>Interaction</h4>
              <p>Créer des échanges authentiques, engageants et personnalisés pour instaurer une relation de confiance et encourager l’engagement avec la marque.</p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Rose}}>03</h3>
                <hr />
              </div>

              <h4>Visibilité</h4>
              <p>Assurer une présence constante et cohérente à travers des actions de communication ciblées, permettant de maintenir l'attention et d'élargir l’audience.</p>
            </li>
          </ul>

          <section className="last-information-container">
            <p className="section-title">Assurer une présence constante et cohérente à travers des actions de communication ciblées, permettant de maintenir l'attention et d'élargir l’audience. </p>

            <ul className="competance-container">
              <li className="competances">
                <p>Création de contenu</p>
                <p>Rédaction</p>
                <p>Création de contenu</p>
                <p>Support Graphiques</p>
              </li>

              <li className="competances">
                <p>Stratégie de communication</p>
                <p>Gestion des relations publiques</p>
                <p>Développement de la réputation</p>
                <p>Stratégies médias et influence</p>
              </li>

              <li className="competances">
                <p>Gestion de projet</p>
                <p>Planification & Organisation</p>
                <p>Suivi des performances</p>
                <p>Coordination des équipes</p>
              </li>
            </ul>
          </section>
        </li>

        {/* Third Vision */}
        <li className="vision-container">
          <Sphere
            container={{
              top: -200,
              left: -300,
              right: "unset",
              bottom: "unset",
              width: 800,
              height: 800
            }}

            sphere={{
              top: 0,
              left: 0,
              right: "unset",
              bottom: "unset",
              color: Colors.Rose
            }}

            className="first-vision-sphere"
          />

          <section className="first-information-container">
            <div className="image-container">
              <Image
                alt="Image illustrant les lieux de contact"
                src={"/images/marine-secret.png"}
                width={100}
                height={100}
              />
            </div>

            <div className="information-container">
              <h3>Ma vision en Communication </h3>
              <p>
                Le design graphique est un levier puissant pour valoriser une marque, captiver une audience et soutenir la croissance visuelle et commerciale d’une entreprise.
                <br /> <br />
                  Mon approche du design graphique pour renforcer votre image de marque s’articule autour de 3 axes principaux :
              </p>
            </div>
          </section>

          <ul className="second-information-container">
            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Violet}}>01</h3>
                <hr />
              </div>

              <h4>Composition</h4>
              <p>Créer des visuels accrocheurs avec une mise en page percutante, des contrastes forts et des éléments graphiques adaptés attractifs.</p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Orange}}>02</h3>
                <hr />
              </div>

              <h4>Interaction</h4>
              <p>Concevoir des designs fonctionnels avec des interfaces intuitives, des hiérarchies visuelles claires et des appels à l'action bien placés.</p>
            </li>

            <li>
              <div className="top-container">
                <h3 style={{ color: Colors.Rose}}>03</h3>
                <hr />
              </div>

              <h4>Identité</h4>
              <p>réer une image de marque cohérente et mémorable avec des éléments graphiques sur mesure, un branding affirmé et des supports visuels distinctifs.</p>
            </li>
          </ul>

          <section className="last-information-container">
            <p className="section-title">J’aide les entreprises à se démarquer avec des solutions de design percutantes </p>

            <ul className="competance-container">
              <li className="competances">
                <p>Création de visuelle</p>
                <p>Design print</p>
                <p>Réseaux sociaux</p>
              </li>

              <li className="competances">
                <p>Branding</p>
                <p>Logos</p>
                <p>Identité visuelle </p>
                <p>Chartes graphiques</p>
              </li>

              <li className="competances">
                <p>Gestion créative</p>
                <p>Direction artistique</p>
                <p>Planning de production</p>
                <p>Suivi des livrables</p>
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </section>

    <section className="profil-diplomes-container">
      <SectionTitle text="Diplômes  &  Certifications" color={Colors.Orange} />

      <Diplomes diplomes={diplomes} />
    </section>

    <Footer social_media={social_media} />
  </>
}
