const App = (props) => {
  const [entities, setEntities] = React.useState(props.entities);
  const [selected, setSelected] = React.useState(null);

  return (
    <div >
      <EntitiesPanel
        {...props}
        entities={entities}
        selected={selected}
        setSelected={setSelected}
      />
      <div>Teste</div>
    </div>
  );
};

let app = (
  <App
    entities={originParent.children}
    setHover={setHover}
    changeSelected={changeSelected}
  />
);

// Render the component
ReactDOM.render(app, document.getElementById("root"));
