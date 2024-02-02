const EntitiesPanel = (props) => {
  function create_list(arr, id) {
    if (arr) {
       
      return (
        <ul key={`ul${id}`} className="list-group">
          {arr.map((element) => {
            return (
              <Li
                key={element.id}
                element={element}
                {...props}
                selected={props.selected}
                setSelected={props.setSelected}
              >
                {[
                  create_list(element.modifiers, element.id + "mod"),
                  create_list(element.children, element.id + "child"),
                ]}
              </Li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <div id="entitiesPanel"
      style={{ backgroundColor: "white",height: window.innerHeight*0.6,overflow: "scroll" }}
      onMouseLeave={() => props.setHover(null)}
    >
      {create_list(props.entities, "1")}
    </div>
  );
};
