import { useEffect } from "react";

const TechCube = ({ skillsObj }: any) => {

  console.log(skillsObj, ' @@@skillsObj')

    useEffect(() => {

    }, [])
    const sides = ['font', 'back', 'right', 'left', 'top', 'bottom']
    const renderCube = skillsObj.slice(0, 6).map((sk: any, idx: any) => {
      return <div className={"face " + sides[idx] || 'bottom'} style={{background: sk.imageUrl}}/>
      })

    return  <div className="cube-container" style={{}}>
  <div className="scene">
    <div className="cube">
      {renderCube}
    </div>
  </div>
</div>

}

export default TechCube;