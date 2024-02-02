const Li = (props) => {
    const [isHover, setIsHover] = React.useState(false);
    const myRef = React.useRef(props.element.id);
  
    if (isHover) {
      props.setHover(props.element);
    }
  
    props.element.setSelected = props.setSelected;
  
    props.element.executeScroll = () => {
       
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };
    const style = {
      borderRadius: "5px",
      paddingLeft: "1px",
    };
  
    let className = "bg-white";
    if (props.selected == props.element) {
      className = "bg-primary text-white";
    } else if (isHover) {
      className = "bg-secondary";
    }
  
    return (
      <li className="list-group-item py-0" id={"li"+props.element.id}>
        <div
        id ={"div"+props.element.id}
          ref={myRef}
          className={className}
          style={style}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => props.setSelected(props.element)}
        >
          {props.element.char}
        </div>
  
        {props.children}
      </li>
    );
  };