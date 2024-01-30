function mouseClicked() {
   
  if (hover) {
   
    if (selected != hover) {
      selected = hover;
      selected.strokeColor = "blue";
      setSliderValues();
    }
  }
}
function mouseDragged() {
  if (selected) {
    let position = selected.getPositionInCanvas();
    let distance = position.sub(createVector(mouseX, mouseY)).mag();
   
    if (distance < 100) {
      let rotation = selected.getRotationInCanvas();

      selected.move(createVector(movedX, movedY).rotate(-rotation));
    }
  }
}

function findHover() {
  hover = null;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].checkMouseOver()) {
      hover = objects[i];
    }
    if (objects[i] != selected) {
      objects[i].strokeColor = objects[i].color;
    }
  }
  if (hover && hover != selected) {
    hover.strokeColor = "gray"
    text(`Hover: ${hover}`, 10,45); 
  }
}
