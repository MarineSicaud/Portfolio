import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


function Footer(){
  const colors = ["rose", "orange", "violet"]

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

  return <footer>
    <p className="footer-title">Travaillons <span style={{color: "#F874D8"}}>Ensemble</span> !</p>

    <ul className="auto-scroll-footer">

      {
        new Array(10).fill("").map((_, i) => (
          <Link key={i} href={"mailto:sicaud.marine.pro@gmail.com"} className={`future-${colors[(i - 1) % 3]}`}>
            CONTACTEZ-MOI
            <span className="footer-element-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
        ))
      }
    </ul>

    <h2>MARINE SICAUD</h2>

    <section className="footer-social-media">
      {
        social_media.map((s) => (
          <Link
            key={s.id}
            href={s.link}
            target="_blank"
            className="social-media-container"
          >
            <section className="social-media">
              <span>{s.name}</span>
              <span>{s.name}</span>
            </section>
          </Link>
        ))
      }
    </section>
  </footer>
}


export { Footer }
