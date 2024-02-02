const Editor = (props) => {
    
  let editors =null
    console.log(props.selected.type)
    switch(props.selected.type){
      case WORD_TYPE:
        editors = [
          <label>Radius:</label>,
        <Slider element={props.selected} change={"setRadius"} value={props.selected.radius} min ={0.5} max={WORD_RADIUS*3} step={0.1} />,
        <label>Stroke:</label>,
        <Slider element={props.selected} change={"setStrokeWeight"} value={props.selected.getStrokeWeight()} min ={0.01} max={50} step={0.01} />,
        <label>Angle:</label>,
        <Slider element={props.selected} change={"setAngle"} value={props.selected.angle} min ={0} max={360} step={0.01} />,
        <label>Angle in Parent:</label>,
        <Slider element={props.selected} change={"setAngleInParent"} value={props.selected.angleInParent} min ={0} max={360} step={0.01} />

      ]
        break;
    }
    
    return(<div key={props.selected.id} className="border" style={{ backgroundColor: "white",height: window.innerHeight*0.4,overflow: "scroll" }}>
      <p>Selected: {props.selected.char}</p>
      {editors}
       </div>)
  };