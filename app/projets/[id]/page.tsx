"use client"

export const dynamic = 'force-dynamic';

import * as REACT from "react"
import Image from "next/image"

import { ResponsiveValues, usePage, usePageReturn } from "@/hooks/usePage"
import "../../../style/project_page.scss"
import { Parallax } from "@/utils/parallax"
import { Footer } from "@/component/global/footer"
import { F_ProjectType, F_ProjectContentType } from "@/types/project_type"
import { Fetching } from "@/utils/fetching"
import Link from "next/link"

export default function ProjectPage({ params }: { params: Promise<{ id: string }>}){
  const [projet, setProjet] = REACT.useState<F_ProjectType>();
  const { id } = REACT.use(params);

  const infoPage = usePage();


  REACT.useEffect(() => {
    if ( !projet ) return

    Parallax.bind();
  }, [projet])

  REACT.useEffect(() => {
    async function getProject(){
      const project = await Fetching.getDatas<F_ProjectType>(`/projets?id=${id}`)
      setProjet(project as F_ProjectType)
    }

    getProject()
  }, [id])

  if ( !projet ) return null

  return <>
    <section className="projet-page-header">
      <div className="projet-important-informations">
        <h2>{projet.title}</h2>

        {
          projet.description && <p>{projet.description}</p>

        }

        <div className="horizontal-informations">
          <ul>
            <li>Client</li>
            <li>{projet.client}</li>
          </ul>

          <ul>
            <li>Service</li>
            {
              projet.services.map((service, i) => (
                <li key={i}>{service}</li>
              ))
            }
          </ul>

          <ul>
            <li>Durée</li>
            <li>{projet.duree}</li>
          </ul>

          {
            projet.link &&
              <Link
                href={projet.link}
                target="_blank"
              >Lien pour visualiser <span className="arrow"></span></Link>
          }
        </div>
      </div>

      <div className="image-container">
        <Image
          alt={`Image descriptif du projet ${projet.title}`}
          src={projet.background_image}
          width={1920}
          height={1080}
          data-parallax="30"
          data-offset="400"
        />
      </div>
    </section>

    <section className="project-information-container">
      {
        projet.content.map((content, i) => (
          <ProjectInformations projet={content as F_ProjectContentType} key={i} infoPage={infoPage}/>
        ))
      }
    </section>

    <Footer />

  </>
}

function ProjectInformations( { projet, infoPage }: { projet: F_ProjectContentType, infoPage: usePageReturn } ){
  let count = projet.images.length
  let next: null | number = null

  return <section className="projet-information">
    <section className="information-container">
      <h2>{projet.title}</h2>

      <p style={{ whiteSpace: "pre-line"}}>{projet.description}</p>
    </section>

    <section className="images-container">
      {
        projet.images.map((image, i) => {
          if ( next === i ) return 

          if ( count >= 2 ){
            next = i + 1
            count -= 2

            return <ul key={i} className="projet-images-container" style={{ grid: "auto / 1fr 1fr"}}>
              <li className="image">
                <Image
                  alt={image.alt}
                  src={image.path}
                  width={1980}
                  height={1080}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 7 : 15}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 0 : 0}
                />
              </li>
              <li className="image">
                <Image
                  alt={projet.images[i + 1].alt}
                  src={projet.images[i + 1].path}
                  width={1980}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 7 : 15}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 0 : 0}
                  height={1080}
                />
              </li>
            </ul>
          }else {
            count -= 1
            return <ul key={i} className="projet-images-container" style={{ grid: "1fr"}}>
              <li className="image">
                <Image
                  alt={image.alt}
                  src={image.path}
                  width={1980}
                  height={1080}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 7 : 10}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Mobile ? 0 : 0}
                />
              </li>
            </ul>
          }
        })
      }
    </section>
  </section>
}
