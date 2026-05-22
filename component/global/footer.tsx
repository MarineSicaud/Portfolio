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
        <span className="footer-title" style={{display: "flex", gap: "5px"}}>
            Travaillons 
            <div
                style={{ "--scroll": "-2.5rem" }}
                className="double-text-container"
            >
                <div className="double-text">
                    <span style={{color: "#F874D8"}}>Ensemble</span> 
                    <span style={{color: "#F874D8"}}>Ensemble</span> 
                </div>
            </div>
            !
        </span>

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
            className="double-text-container"
            style={{ "--scroll": "-2.5rem" }}
          >
            <section className="double-text">
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
