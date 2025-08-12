import { Colors } from "./sphere"

type Props = {
  color: Colors,
  text: string
}

function SectionTitle({ text, color }: Props){
  return <h3 className="section-title">
    {
      text.split(" ")
      .filter(t => t !== "")
      .map((t, i) => {
        if( ( i + 1 ) % 2 == 0) {
          return <span key={i} style={{backgroundColor: color}}>{t}</span>
        }

        return <>{t}</>
      })
    }
  </h3>
}

export { SectionTitle }
