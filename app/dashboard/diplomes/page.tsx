export const dynamic = 'force‑dynamic';
 
import { Diplomes } from "@/component/diplomes";
import { DiplomeType } from "@/types/diplomes_types";
import { Fetching } from "@/utils/fetching";
import Link from "next/link";

import "@/style/dashboard.scss"

async function DashboardDiplome() {
  const diplomes = await Fetching.getDatas<DiplomeType[]>("/diplomes")
  
  if ( !diplomes ) return null

  return <section className="diplome-dashboard">
    <Diplomes diplomes={diplomes} dashboard={true} />
    <span className="new-dipl">
      <Link href={"/dashboard/diplomes/new"} />
    </span>
  </section>
}

export default DashboardDiplome
