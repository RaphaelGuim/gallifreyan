const Slider = (props) => {
    const [value, setValue] = React.useState(props.value || 0);
    
    const handleChange = function(e){
        setValue( e.target.value)
       
        console.log(props.element[props.change](value))
    }
    return (
        <input type="range" className="form-range px-1" 
        value={value} 
        min={props.min} max={props.max} step={props.step} id={props.id}  onChange={handleChange}/>
    );
  };