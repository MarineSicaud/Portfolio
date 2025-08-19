import { Project } from "@/component/project"
import "@/style/dashboard.scss"
import { ProjectComponent } from "@/types/project_type"
import { Fetching } from "@/utils/fetching"
import Link from "next/link"

async function DashboardProjets(){
  const projets = await Fetching.getDatas<ProjectComponent[]>("/projets/components")
  
  if ( !projets ) return null

  async function deleteProject(formData: FormData){
    "use server"
    const id = formData.get("id");

    const removeProject = await Fetching.deleteDatas("/projets", id) 
  }

  return <section className="dashboard-projets-container">

  <ul className="projects-container">
  {
    projets.map((projet, i) => (
      <li key={i}>
      <Project project={projet} updating={true} />

      <form action={deleteProject}>
      <input type="hidden" name="id" value={projet.id_projet} />
      <button className="delete-projet" type="submit">
      Supprimer Projet
      </button>
      </form>
      </li>
    ))
  }

    <li className="new-project">
      <Link href={"/dashboard/projets/new"} />
    </li>
  </ul>
    
  </section>
}

export default DashboardProjets
