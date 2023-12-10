import { useEffect } from "react";

const TechCube = () => {

    useEffect(() => {

    }, [])

    return  <div className="cube-container" style={{}}>
  <div className="scene">
    <div className="cube">
      <div className="face front" />
      <div className="face back" />
      <div className="face right" />
      <div className="face left" />
      <div className="face top" />
      <div className="face bottom" />
    </div>
  </div>
</div>

}

export default TechCube;