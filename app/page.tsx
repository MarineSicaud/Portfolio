"server side"

import { Colors, Sphere } from "@/component/global/sphere";
import "../style/homepage.scss"

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/component/global/sectionTitle";
import { Competence } from "@/component/competence";
import { Diplomes } from "@/component/diplomes";
import { Reviews } from "@/component/reviews";
import { Footer } from "@/component/global/footer";
import { HomeProject } from "@/component/home_projects";
import { ProjectComponent } from "@/types/project_type";

export default async function Home() {
  const projectsRequest = await fetch("http://127.0.0.1:3000/api/projets/components")
  let projectsJson = await projectsRequest.json()
  let projects = projectsJson.data as [ ProjectComponent, ProjectComponent, ProjectComponent ]

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

  const diplomes = [
    {
      id: 1,
      ecole: "MDS",
      nom_diplome: "testing",
      description: `J'ai choisi d'intégrer My Digital School pour développer mes compétences en marketing digital, un domaine qui me passionne profondément pour son pouvoir à transformer la visibilité et la croissance des marques. Cette formation m'a permis d'acquérir des compétences solides en marketing digital, me permettant de concevoir des stratégies efficaces et de mesurer leur impact à travers des outils et des techniques modernes. \n \n

En parallèle, j'ai exploré la communication, un domaine clé pour diffuser des messages percutants et engager efficacement une audience. J'ai développé des compétences en création de contenu pour différents supports, en élaboration de stratégies de communication et en gestion des relations publiques. Cette expertise m’a sensibilisée à l’importance de l’alignement des messages, de la gestion de la réputation de marque, et de la cohérence dans l’ensemble des actions de communication pour instaurer une relation de confiance et favoriser l’engagement. \n \n

Grâce à cette double compétence, je suis désormais capable de coordonner efficacement des projets digitaux, en combinant stratégie marketing et design graphique, pour offrir des résultats créatifs et performants, tout en garantissant des livrables de qualité qui répondent aux besoins des clients et utilisateurs.`
    },
    {
      id: 2,
      ecole: "MDS",
      nom_diplome: "testing",
      description: "oui"
    },
    {
      id: 3,
      ecole: "MDS",
      nom_diplome: "testing",
      description: "oui"
    },
  ]


  let reviews = [
    {
      id: 1,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
    },
    {
      id: 2,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
      job: "Testeur de site internet"
    },
    {
      id: 3,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
    },
    {
      id: 4,
      name: "Theo Derive",
      review: "Je fais une review de teste afin de savoir si ce que je fais c'est quelque chose de relativement styler ou non",
      job: "Testeur de site internet"
    },
  ]


  return (
    <>
      <Sphere
        className="homepage-header-sphere-1"
        container={{
          top: 0,
          left: "unset",
          bottom: "unset",
          right: 0,
          width: 800,
          height: 800
        }}
        sphere={{
          top: -200,
          left: "unset",
          bottom: "unset",
          right: -300,
          color: Colors.Rose
        }}

      />


      <section className="header-container">

        <Sphere
          className="homepage-header-sphere-2"
          container={{
            top: "unset",
            right: "unset",
            bottom: -400,
            left: 0,
            width: 800,
            height: 800
          }}
          sphere={{
            top: "unset",
            left: -400,
            bottom: 0,
            right: "unset",
            color: Colors.Orange
          }}

        />

        <section className="header-left">
          <h1>Marketing <span className="special-word">Digital</span> <br/> & Communication <span className="special-word" style={{fontSize: "3rem"}}>.</span></h1>

          <Link href={"mailto:marine.sicaud.pro@gmail.com"} className="contact-button">
            Contactez-moi 
            <Image
              alt="image de salut"
              src="/images/coucou-icon.png"
              width={40}
              height={40}
            />
          </Link>

          <ul className="numbers-information-container">
            <li>
              <p className="numbers">+10</p>
              <p className="information">Stratégies marketing conçues et présentées </p>
            </li>

            <li>
              <p className="numbers">+5</p>
              <p className="information">Certifications obtenues</p>
            </li>

            <li>
              <p className="numbers">+10</p>
              <p className="information">Outils Stratégiques maitrisés </p>
            </li>
          </ul>
        </section>

        <section className="header-right">
          <p>Bienvenue sur mon portfolio</p>
          <Image
            alt="Emoji qui vous salue"
            src={"/images/hi-marine.png"}
            width={200}
            height={200}
          />
        </section>
      </section>

      <HomeProject projects={projects} />

      <section className="categories-homepage">
        <div className="slider-container" style={{ rotate: "-2deg" }}>
          <div className="slider right">
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
          </div>
          <div className="slider right">
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
          </div>
        </div>

        <Sphere
          className="homepage-categories-sphere-1"
          container={{
            top: 0,
            right: 0,
            left: 'unset',
            bottom: "unset",
            width: 800,
            height:800
          }}

          sphere={{
            top:0,
            right: -350,
            bottom: "unset",
            left: "unset",
            color: Colors.Orange
          }}
        />

        <Sphere
          className="homepage-categories-sphere-2"
          container={{
            bottom: 0,
            left: 0,
            right: 'unset',
            top: "unset",
            width: 800,
            height:800
          }}

          sphere={{
            top:0,
            left: -250,
            bottom: "unset",
            right: "unset",
            color: Colors.Rose
          }}
        />

        <ul className="categories-container">
          <Link href={"/projets?type=Marketing"} style={{color: Colors.Violet}}>Marketing</Link>
          <Link href={"/projets?type=Logofolio"} style={{color: Colors.Orange}}>Logofolio</Link>
          <Link href={"/projets?type=Branding"} style={{color: Colors.Rose}}>Branding</Link>
        </ul>

        <div className="slider-container" style={{ rotate: "2deg" }}>
          <div className="slider left">
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
          </div>
          <div className="slider left">
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
            <span>PROJETS</span>
          </div>
        </div>
      </section>

      <section className="homepage-competences-container">
        <SectionTitle text="Mes Competences" color={Colors.Violet} />

        <section className="competences-design-container">
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
        </section>

        <section className="competences-marketing-container">
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
          <Competence name="Photoshop" image_url="/images/photoshop-logo.png" />
        </section>
      </section>

      <section className="homepage-diplomes-container">
        <SectionTitle text="Diplômes  &  Certifications" color={Colors.Orange} />

        <Diplomes diplomes={diplomes} />
      </section>

      <section className="homepage-reviews-container">
        <SectionTitle text="Votre avis compte" color={Colors.Rose} />
        <Reviews reviews={reviews} />
      </section>


      <Footer social_media={social_media} />
    </>
  );
}
