import "../../style/list_projects.scss"
import { Footer } from "@/component/global/footer"
import { Projects } from "@/component/projects"
import { ProjectComponent } from "@/types/project_type"
import { Fetching } from "@/utils/fetching"

export default async function ProjectsList(){
  const projects = await Fetching.getDatas<ProjectComponent[]>("/projets/components")

  if ( projects === false ) return null

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
   <section className="project-page-container">
      <Projects projects={projects} />
   </section>

    <Footer social_media={social_media}/>
  </>
}
