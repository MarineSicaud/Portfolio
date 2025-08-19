import { Colors, Sphere } from "@/component/global/sphere";
import "../style/homepage.scss"

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/component/global/sectionTitle";
import { Competence } from "@/component/competence";
import { Diplomes } from "@/component/diplomes";
import { Reviews } from "@/component/reviews";
import { Footer } from "@/component/global/footer";
import { Fetching } from "@/utils/fetching";
import { ProjectComponent } from "@/types/project_type";
import { HomeProject } from "@/component/home_projects";
import { CompetenceComponent } from "@/types/competences_type";
import { DiplomeType } from "@/types/diplomes_types";
import { ReviewType } from "@/types/review_type";


export default async function Home() {
  type ProjectNeededType = [ ProjectComponent, ProjectComponent, ProjectComponent]

  let projects = await Fetching.getDatas<ProjectNeededType>("/projets/components?length=3")
  let competences = await Fetching.getDatas<CompetenceComponent[]>("/competences")
  let diplomes = await Fetching.getDatas<DiplomeType[]>("/diplomes")
  let reviews = await Fetching.getDatas<ReviewType[]>("/reviews")

  if ( projects === false || competences === false || reviews === false || diplomes === false ) return null

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

        <section className="competences-marketing-container">
          {
            competences.map(competence => competence.type === "Marketing" &&
              <Competence key={competence._id} name={competence.name} image_url={competence.image_url} />
            )
          }
        </section>

        <section className="competences-design-container">
          {
            competences.map(competence => competence.type === "Design" &&
              <Competence key={competence._id} name={competence.name} image_url={competence.image_url} />
            )
          }
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
