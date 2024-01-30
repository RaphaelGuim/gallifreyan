function createSliders() {
  
  //Scale
  let slider = createSlider(0.01, 1, 1, 0.01);
  slider.size(0);
  sliders.push(slider);
  slider.value(originParent.scale); 
  
  //STROKE
  slider = createSlider(0.1, 5, 1, 0.01);
  slider.size(0);
  sliders.push(slider);

  //Radius
  slider = createSlider(1, 2000, 1, 0.01);
  slider.size(0);
  sliders.push(slider);
 
  
  //Angle InParente
  slider = createSlider(-270, 90, 1, 0.01);
  slider.size(0);
  sliders.push(slider);


  
}

function setSlider(index,x,y){
    sliders[index].position(x,y);     
    sliders[index].size(300);

    switch(index){
        case 0:           
            text(`Scale`, x,y); 
            originParent.setScale(sliders[index].value())
            break
        case 1:
            text(`Selected: ${selected} `, x,y-15); 
            text(`Stroke `, x,y); 
            selected.setStrokeWeight(sliders[index].value())
            break
        case 2:
            text(`Radius `, x,y); 
            selected.setRadius(sliders[index].value())
            break
        case 3:
            text(`Angle In Parent `, x,y); 
            selected.setAngleInParent(sliders[index].value())            
            break
      
    }
}
function showSliders() {

    let xPosition =10
    let yPosition =15
    let distance = 30
   setSlider(0,xPosition,yPosition)

  if (selected) {
    for(let i = 1 ; i<sliders.length;i++){
        setSlider(i,xPosition,yPosition + distance*(i+1))
    }

  } else {
    sliders.forEach((s) => s.size(0));
    sliders[0].size(300)
  }
}
function setSliderValues() {
  
  sliders[1].value(selected.getStrokeWeight());
  sliders[2].value(selected.radius);
  sliders[3].value(selected.angleInParent);
  
      
  
}
 
