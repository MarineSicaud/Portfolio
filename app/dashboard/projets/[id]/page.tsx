"use client"

export const dynamic = 'force‑dynamic';

import { F_ProjectType, F_ProjectContentType, B_ProjectType } from "@/types/project_type"
import * as React from "react"

import "@/style/project_page.scss"
import "@/style/dashboard.scss"
import { Footer } from "@/component/global/footer"
import { ResponsiveValues, usePage, usePageReturn } from "@/hooks/usePage"
import { DashboardInput } from "@/component/dashboard_input"
import Image from "next/image"
import { Fetching } from "@/utils/fetching"

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

function NewProject({ params }: { params: Promise<{ id: string }>} ){
  const infoPage = usePage()

  const [projet, setProjet] = React.useState<B_ProjectType>({
    _id: "",
    title: "",
    description: "",
    services: [],
    type: "",
    background_image: {
      path: '',
      file: new File([""], "file.name")
    },
    client: "",
    content: [],
    duree: "",
    link: "",
  })

  const { id } = React.use(params)

  async function pushProject(){
    let newProject: B_ProjectType = {
      title: projet.title,
      description: projet.description,
      services: projet.services,
      //@ts-ignore
      background_image: projet.background_image.file,
      content: projet.content,
      client: projet.client,
      duree: projet.duree,
      type: projet.type,
      link: projet.link
    }
    
    if ( id === "new" ){
    const sendProjet = await Fetching.postDatas<B_ProjectType>("/projets", newProject)
    }else {
      newProject._id = projet._id
      if ( typeof projet.background_image === "string") {
        newProject.background_image = projet.background_image
      }

      console.log("Updating project.... : ", newProject)
      const updateProjet = await Fetching.patchDatas<B_ProjectType>("/projets", newProject)
    }
  }

  React.useEffect(() => {
    async function  getProjet(){
      const projet = await Fetching.getDatas<B_ProjectType>(`/projets?id=${id}`)

      if ( projet === false ) return 

      setProjet(projet)
    }

    if ( id !== "new" ) {
      getProjet()
    }
  }, [id])


  return <>
      <section className="projet-page-header">
        <div className="projet-important-informations">
          <DashboardInput value={projet.title} setValue={setProjet} setValueKey="title" fontSize={3} style={{marginLeft: "-10px", maxWidth: "70%"}} />

          <DashboardInput value={projet.description} setValue={setProjet} setValueKey="description" fontSize={.7} style={{
            marginTop: "-10px",
            marginBottom: "50px"
          }} />


          <select className="project-type" value={projet.type} onChange={(e) => {
            setProjet((prev) => ({
              ...prev,
              type: e.target.value
            }))
          }}>
            <option value={""}>Choisissez un type pour votre projet</option>
            <option value={"Marketing"}>Marketing</option>
            <option value={"Logofolio"}>Logofolio</option>
            <option value={"Branding"}>Branding</option>
          </select>

      <div className="horizontal-informations">
        <ul>
          <li>Client</li>

          <li>
            <DashboardInput value={projet.client} setValue={setProjet} setValueKey="client" fontSize={1} style={{ width: "100px"}} />
          </li>
        </ul>

        <ul>
          <li>Service</li>

          {
            projet.services.map((s, i) => <li>
              <input value={s} onChange={(e) => {
                let value = e.target.value

                let newServices = projet.services
                newServices[i] = value
                
                setProjet((prev) => ({
                  ...prev,
                  services: newServices
                }))
              }} />

              <span onClick={() => {
                let servicesProjets = projet.services
                servicesProjets.pop()


                setProjet((prev) =>({
                  ...prev,
                  services: servicesProjets
                }))
              }}>supprimer</span>
            </li>)
          }

          <button onClick={() => {
            let projetServices = projet.services
            projetServices.push("Nouveau service")

            setProjet((prev) => ({
              ...prev,
              services: projetServices
            }))
          }}>add</button>

        </ul>

        <ul>
          <li>Duree</li>

          <li>
            <DashboardInput value={projet.duree} setValue={setProjet} setValueKey="duree" fontSize={1} style={{ width: "100px"}} />
          </li>
        </ul>


      </div>
        <DashboardInput value={projet.link} setValue={setProjet} setValueKey="link" fontSize={1} style={{marginTop: "40px", marginBottom: "30px", width: "40%"}} />
    </div>


      <div className="image-container">
        <input type="file" onChange={async (e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            setProjet((prev) => ({
              ...prev,
              background_image: {
                path: pathname,
                file: file
              }
            }))
          }

        }}
        />


        {
         typeof projet.background_image === 'string' || projet.background_image.path !== "" ? 
      <Image
      alt={`Image descriptif du projet ${projet.title}`}
      src={typeof projet.background_image === "string" ? projet.background_image : projet.background_image.path}
      width={1920}
      height={1080}
      data-parallax="30"
      data-offset="400"
      //@ts-ignore
      style={projet.background_image.path === "" ? {background: "blue"} : {}}
      />
      :
        null
        }
      </div>

      <section className="project-information-container">
      {
        //@ts-ignore
        projet.content.map((content, i) => (
          <ProjectInformations projet={content as F_ProjectContentType} key={i} infoPage={infoPage} index={i} project={projet} setProjet={setProjet}/>
        ))
      }

      <button className="add"
        onClick={() => {
          const newContent: F_ProjectContentType = {
            title: "",
            description: "",
            images: []
          }

          const projetContent = projet.content
          projetContent.push(newContent)


          setProjet((prev) => ({
            ...prev,
            content: projetContent
          }))
        }}
      >add</button>
      </section>
  </section>


  {
      //@ts-ignore
    projet._id && <button className="push" onClick={() => pushProject()}>push</button> || projet.title && projet.description && projet.content.length > 0 && projet.background_image.file.name !== "file.name" && projet.type !== "" && projet.client && projet.duree && projet.services.length > 0 && <button className="push" onClick={() => pushProject()}>push</button>
  }



    {

      //@ts-ignore
      true && <Footer social_media={social_media}/>

    }

    </>
}
function ProjectInformations( { projet, infoPage, project, index, setProjet }: { projet: F_ProjectContentType, infoPage: usePageReturn, index: number, project: F_ProjectType, setProjet: React.Dispatch<React.SetStateAction<F_ProjectType>> } ){
  let count = projet.images.length
  let next: null | number = null

  function updateValue(key: "title" | "description", value: string) {
    let content: F_ProjectContentType = project.content[index]
    content[key] = value
    
    project.content[index] = content

    let newProject = project.content

    setProjet((prev) => ({
      ...prev,
      content: newProject
    }))

  }

  return <section className="projet-information">
  <section className="information-container">
  <input onChange={(e) => updateValue("title", e.target.value)} style={{fontSize: `2rem`}} value={projet.title} placeholder={`Veuillez renseignez le titre de section`} />

  <textarea onChange={(e) => updateValue("description", e.target.value)} style={{ resize: "none", height: "auto", width: "30%", fontSize: `1rem`}} value={projet.description} placeholder={`Veuillez renseignez le description de la section`} />
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

        <input type="file" onChange={async (e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            let content: F_ProjectContentType = project.content[index]
            content.images[i] = {
              ...content.images[i],
              path: pathname,
              file,
              alt: "image presentant la section",
            }

            project.content[index] = content

            let newProject = project.content

            setProjet((prev) => ({
              ...prev,
              content: newProject
            }))
          }
        }}
        />

        {
         typeof image.path === 'string' || image.path !== "" ? 
      <Image
      alt={`Image descriptif du projet ${projet.title}`}
      src={image.path}
      width={1920}
      height={1080}
      data-parallax="30"
      data-offset="400"
      />
      :
        null
        }
          <Image
          alt={image.alt}
          src={image.path}
          width={1980}
          height={1080}
          data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.strengh : image.responciveStrengh}
          data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.offsetTop : image.responciveOffsetTop}
          />
          </li>
          <li className="image">

        <input type="file" onChange={async (e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            let content: F_ProjectContentType = project.content[index]
            content.images[i + 1] = {
              ...content.images[i + 1],
              path: pathname,
              file,
              alt: "image presentant la section",
            }

            project.content[index] = content

            let newProject = project.content

            setProjet((prev) => ({
              ...prev,
              content: newProject
            }))
          }
        }}
        />
          <Image
          alt={projet.images[i + 1].alt}
          src={projet.images[i + 1].path == "" ? null : projet.images[i + 1].path}
          width={1980}
          data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? projet.images[i + 1].strengh : projet.images[i + 1].responciveStrengh}
          data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? projet.images[i + 1].offsetTop : projet.images[i + 1].responciveOffsetTop}
          height={1080}
          />
          </li>
          </ul>
        }else {
          count -= 1
          return <ul key={i} className="projet-images-container" style={{ grid: "1fr"}}>
          <li className="image">

        <input type="file" onChange={async (e) => {
          const file = e.target.files?.item(0)!
          let pathname: string = "";

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            pathname = reader.result as string | ""

            let content: F_ProjectContentType = project.content[index]
            content.images[i] = {
              ...content.images[i],
              path: pathname,
              file,
              alt: "image presentant la section",
            }

            project.content[index] = content

            let newProject = project.content

            setProjet((prev) => ({
              ...prev,
              content: newProject
            }))
          }
        }}
        />
          <Image
          alt={image.alt}
          src={image.path == "" ? null : image.path}
          width={1980}
          height={1080}
          data-parallax={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.strengh : image.responciveStrengh}
          data-offset={infoPage.responsiveInfo === ResponsiveValues.Laptop ? image.offsetTop : image.responciveOffsetTop}
          />
          </li>
          </ul>
        }
    })

  }
    <button onClick={() => {
      const newImage = {
        alt: "Image",
        file: new File([""], "file.name"),
        path: ""
      }
    let content: F_ProjectContentType = project.content[index]
    content.images.push({
      path: "",
      file: new File([""], "file.name"),
      alt: "",
      offsetTop: 0,
      responciveOffsetTop: 0,
      responciveStrengh: 0,
      strengh: 0
    })
    
    project.content[index] = content

    let newProject = project.content

    setProjet((prev) => ({
      ...prev,
      content: newProject
    }))
    }}>add</button>
  </section>
  </section>
}

export default NewProject
