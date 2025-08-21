import Link from "next/link"

import "@/style/dashboard.scss"

function DashboardPage() {
  return <section className="dashboard-container">
    <Link href={"/dashboard/projets"}>Projets</Link>
    <Link href={"/dashboard/competences"}>Competences</Link>
    <Link href={"/dashboard/diplomes"}>Diplomes</Link>
    <Link href={"/dashboard/reviews"}>Commentaires</Link>
  </section>
}

export default DashboardPage
