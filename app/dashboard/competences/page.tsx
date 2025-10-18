export const dynamic = 'force-dynamic';

import { Competence } from "@/component/competence"
import { Fetching } from "@/utils/fetching"

import "@/style/dashboard.scss"
import Link from "next/link"

async function DashboardCompetences(){
  type CompetenceType = {
    _id: string,
    name: string,
    image_url: string
  }
  const competences = await Fetching.getDatas<CompetenceType[]>("/competences")

  if ( !competences ) return null

  async function deleteComp(formData: FormData){
    "use server"
    const id = formData.get("id");

    //@ts-ignore
    const removeComp = await Fetching.deleteDatas("/competences", id) 
  }

  return <section className="dashboard-competences">
  <ul>
  {
    competences.map((c) => 
      <li key={c._id}>
        <Link href={`/dashboard/competences/${c._id}`}>
         <Competence name={c.name} key={c._id} image_url={c.image_url} id={c._id} dashboard={true}/>
        </Link>


      <form action={deleteComp}>
      <input type="hidden" name="id" value={c._id} />
      <button className="delete-projet" type="submit">
      Supprimer Projet
      </button>
      </form>
      </li>
    )
  }  
    <li className="new-comp">
      <a href="/dashboard/competences/new"></a>
    </li>

  </ul>
  </section>
}

export default DashboardCompetences
