export const dynamic = 'force‑dynamic';

import { ProjectComponent } from "@/component/project_component"
import "@/style/dashboard.scss"
import { F_ProjectComponentType } from "@/types/project_type"
import { Fetching } from "@/utils/fetching"
import Link from "next/link"

async function DashboardProjets(){
  const projets = await Fetching.getDatas<F_ProjectComponentType[]>("/projets/components")
  
  if ( !projets ) return null

  async function deleteProject(formData: FormData){
    "use server"
    const id = formData.get("id");

    if ( !id ) return

    const removeProject = await Fetching.deleteDatas("/projets", id as string) 
  }

  return <section className="dashboard-projets-container">
  <ul className="projects-container">
  {
    projets.map((projet, i) => (
      <li key={i}>
      <ProjectComponent project={projet} updating={true} />

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
