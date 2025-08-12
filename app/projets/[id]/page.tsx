"use client"

import * as REACT from "react"
import Link from "next/link"
import Image from "next/image"

import FinalNavbar from "@/component/global/navbar"
import { ResponsiveValues, usePage, usePageReturn } from "@/hooks/usePage"
import "../../../style/project_page.scss"
import { Parallax } from "@/utils/parallax"
import { Footer } from "@/component/global/footer"

const projet = {
  id: 0,
  title: "Jimmy fairly",
  description: "je teste la description par ce que je nais plus lancienne et que je voudrais faire un teste sans avoir a mettre un placeholder de type lorem ipsum ou autre",
  competencesId: [{name: "photoshop", image: "/images/photoshop-logo.png"}],
  services: ["je ne sais pas", "test"],
  client: "Moi",
  duree: "1 mois",
  backgroundImage: "/images/MockupZigZag.jpg",
  lien: "https://google.com",

  content: [
    {
      title: "Titre",
      description: "description explicatif du projet afin de proposer une explication plus approfondi sur ce que la personne a realiser sur le projet mais aussi des choses quelle veut dire en plus",
      images: [
        {
          url: "/images/test_project_page.jpg",
          alt: "testing alt",
          offsetTop: 150,
          strength: 20,
          responciveOffsetTop: 150,
          responciveStrength: 20
        },
        {
          url: "/images/MockupZigZag.jpg",
          alt: "testing alt",
          offsetTop: -300,
          strength: 20,
          responciveOffsetTop: -300,
          responciveStrength: 20
        },
        {
          url: "/images/MockupZigZag.jpg",
          alt: "testing alt",
          offsetTop: 300,
          strength: 30,
          responciveOffsetTop: -300,
          responciveStrength: 30
        },
      ]
    },
    {
      title: "Titre",
      // description: "description explicatif du projet afin de proposer une explication plus approfondi sur ce que la personne a realiser sur le projet mais aussi des choses quelle veut dire en plus",
      images: [
        {
          url: "/images/MockupZigZag.jpg",
          alt: "testing alt",
          offsetTop: 300,
          strength: 30
        },
      ]
    },
  ]
}

export default function ProjectPage(){
  const infoPage = usePage()

  REACT.useEffect(() => {
    Parallax.bind()
  }, [])

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
  return <>
    <FinalNavbar pageInfo={infoPage}/>

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
            <li>Duree</li>
            <li>{projet.duree}</li>
          </ul>

          {
            projet.lien &&
              <Link
                href={projet.duree}
                target="_blank"
              >Lien pour visualiser <span className="arrow"></span></Link>
          }
        </div>
      </div>

      <div className="image-container">
        <Image
          alt={`Image descriptif du projet ${projet.title}`}
          src={projet.backgroundImage}
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
          <ProjectInformations projet={content as Projet} key={i} infoPage={infoPage}/>
        ))
      }
    </section>

    <Footer social_media={social_media}/>
  </>
}

type Projet = {
  title: string,
  description: string,
  images: {
    url: string,
    alt: string,
    strength: number,
    offsetTop: number
    responciveStrength: number,
    responciveOffsetTop: number
  }[]
}

function ProjectInformations( { projet, infoPage }: { projet: Projet, infoPage: usePageReturn } ){
  let count = projet.images.length
  let next: null | number = null

  return <section className="projet-information">
    <section className="information-container">
      <h2>{projet.title}</h2>

      <p>{projet.description}</p>
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
                  src={image.url}
                  width={1980}
                  height={1080}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.strength : image.responciveStrength}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.offsetTop : image.responciveOffsetTop}
                />
              </li>
              <li className="image">
                <Image
                  alt={projet.images[i + 1].alt}
                  src={projet.images[i + 1].url}
                  width={1980}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? projet.images[i + 1].strength : projet.images[i + 1].responciveStrength}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? projet.images[i + 1].offsetTop : projet.images[i + 1].responciveOffsetTop}
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
                  src={image.url}
                  width={1980}
                  height={1080}
                  data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.strength : image.responciveStrength}
                  data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.offsetTop : image.responciveOffsetTop}
                />
              </li>
            </ul>
          }
        })
      }
    </section>
  </section>
}
