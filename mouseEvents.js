function mouseClicked() {
   
  if (hover) {
   
    if (selected != hover) {
      
      setSelected(hover)
      
       
      setSliderValues();
      if(!hoverPanel){
        selected.executeScroll()
      }
    }
  }
}

function setSelected(element){
  selected = element
  selected.setSelected(selected)
  
}
function mouseDragged() {
  if (selected) {
    let position = selected.getPositionInCanvas();
    let distance = position.sub(createVector(mouseX, mouseY)).mag();
    
    if (distance < selected.radius*scaleA) {
      let rotation = selected.getRotationInCanvas();

      selected.move(createVector(movedX, movedY).mult(1/scaleA).rotate(-rotation));
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
  
 
}
function showHover(){
  if (hover && hover != selected) {
    hover.strokeColor = "gray"
    text(`Hover: ${hover}`, 10,45); 
  }
}
