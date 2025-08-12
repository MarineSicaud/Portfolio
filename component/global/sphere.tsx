export enum Colors {
  Rose = 'rgba(248, 116, 216, .7)',
  Orange = 'rgba(255, 133, 43, .7)',
  Violet = 'rgba(185, 146, 249, .7)'
}

type Props = {
  container: {
    top: number | "unset",
    left: number | "unset",
    right: number | "unset",
    bottom: number | "unset",
    width: number,
    height: number
  },
  sphere: {
    top: number | "unset",
    left: number | "unset",
    right: number | "unset",
    bottom: number | "unset",
    color: Colors
  },
  className: string
}

// TODO: Responsive -> Faire un nom pour mettre une className et changer le responsive
function Sphere({ container, sphere, className }: Props){

  const background = `radial-gradient(circle, ${sphere.color} 0%, rgba(2, 0, 36, 0) 70%)`

  return <div className={className} style={{...container, position: "absolute", zIndex: "-10", pointerEvents: "none", overflow: "hidden" }}>
    <span style={{...sphere, width: "100%", height: "100%", background: background, position: "absolute", color: "unset" }} />
  </div>
}

export { Sphere }
