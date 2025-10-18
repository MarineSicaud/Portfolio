export const dynamic = 'force‑dynamic';
import "../../style/list_projects.scss"
import { Footer } from "@/component/global/footer"
import { AllProjects } from "@/component/all_projects"
import { F_ProjectComponentType } from "@/types/project_type"
import { Fetching } from "@/utils/fetching"

export default async function ProjectsList(){
  const projects = await Fetching.getDatas<F_ProjectComponentType[]>("/projets/components")

  if ( projects === false ) return null

  return <>
   <section className="project-page-container">
      <AllProjects projects={projects} />
   </section>

    <Footer />
  </>
}
