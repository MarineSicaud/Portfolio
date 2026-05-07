"use client"

import { ResponsiveValues, usePage } from "@/hooks/usePage"

import * as React from "react"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

function FinalNavbar(){
  const pageInfo = usePage()

  if ( !pageInfo.responsiveInfo || !pageInfo.windowInfo || !pageInfo.isMounted ) return null

  return <>
    {
      pageInfo.responsiveInfo === ResponsiveValues.Mobile || pageInfo.responsiveInfo === ResponsiveValues.Tablet ?
        <Mobile />
        :
        <Desktop scrollY={pageInfo.windowInfo.scrollY} />
    }
  </>
}


function Mobile(){
  const [isOpen, setIsOpen] = React.useState(false)

  function clearState() {
    setIsOpen(false);
  }

  return <header className={"mobile-header"}>
    <nav>
      <Link href={"/"}>
        <p className="logo-remplacement">Marine Sicaud</p>
      </Link>

      <span className="open" onClick={() => setIsOpen(true)}/>


      <section className={`navbar-container ${isOpen && "navbar-container-open"}`}>

        <div className="nav-sphere-container"></div>

        <Image
          width={50}
          height={50}
          src={"/images/logo.svg"}
          alt="My logo"
        />

        <span className="close" onClick={() => setIsOpen(false)}/>

        <ul className="onglet-container">
          <li className="onglet"><Link href={"/"} onNavigate={clearState}>Acceuil <span className="arrow"/></Link></li>
          <li className="onglet"><Link href={"/profil"} onNavigate={clearState}>Profil <span className="arrow" /></Link></li>
          <li className="onglet"><Link href={"/projets"} onNavigate={clearState}>Projets <span className="arrow" /></Link></li>
          <li className="contact"><Link href={"mailto:marine.sicaud.pro@gmail.com"}>
            Parlons-en
            <FontAwesomeIcon icon={faArrowRight} />
          </Link></li>
        </ul>

        <ul className="nav-social-media">
          <Link href={"https://www.linkedin.com/in/marine-sicaud/"}>Linkedin</Link>
          <Link href={"mailto:marine.sicaud.pro@gmail.com"}>Gmail</Link>
        </ul>
      </section>
    </nav>
  </header>
}


function Desktop({ scrollY }: { scrollY: number }){
  const [isActive, setIsActive] = React.useState(true)

  React.useEffect(() => {
    if(scrollY >= 120){
      setIsActive(true)
    }else {
      setIsActive(false)
    }
  }, [scrollY])

  return <header className={isActive ? "header-active" : ""}>
    <nav>
      <Link href={"/"}>
        <Image
          width={50}
          height={50}
          src={"/images/logo.svg"}
          alt="My logo"
        />
      </Link>

      <ul className="onglet-container">
        <li className="onglet rose"><Link href="/profil">Mon Profil</Link></li>
        <li className="onglet orange"><Link href="/projets">Mes Projets</Link></li>
        <li className="contact"><Link href="mailto:marine.sicaud.pro@gmail.com">Contact <FontAwesomeIcon icon={faArrowRight} /></Link></li>
      </ul>
    </nav>
  </header>
}


export default FinalNavbar
