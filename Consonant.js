class Consonant extends Particle {
  constructor(type, parent, modifiers,char="") {
    super(type, parent,char);
    this.angleInParent = 0;
    this.modifiers = modifiers || [];
    this.strokeColor = "black";
  
    this.tiltCut;
    this.radiusCut;
    this.radius = CONSONANT_RADIUS
    
    
   
  }
  setStrokeWeight(value){    
    switch(this.type){
      case CONSONANT_TYPE_HALF:                
      case CONSONANT_TYPE_CUT:                
      case CONSONANT_TYPE_CUT_WORD:
        this.parent.setStrokeWeight(value)
        break;             
    }
    this.strokeWeight = value  
    
  }
  getStrokeWeight(){
    switch(this.type){
      case CONSONANT_TYPE_HALF:                
      case CONSONANT_TYPE_CUT:                
      case CONSONANT_TYPE_CUT_WORD:
        return this.parent.strokeWeight        
        
    }
    return this.strokeWeight
  }
 
  move(addVector) {   
    switch(this.type){
      case CONSONANT_TYPE_HALF:
      case CONSONANT_TYPE_CUT:
      case CONSONANT_TYPE_CUT_WORD:
        // let move = (addVector.x+addVector.y)
        // this.tiltCut+=5
        // this.radiusCut+=10
        // this.radius+=10
        break;
      default:
        this.position.add(addVector)
        break;
    }
    
      
    
  }
  drawInnerConsonant() {
    if (!this.inicialPosition) this.getInitialPosition();
    this.drawConsonantCircle(false);
  }
  drawConsonantCircle(fillCircle = true) {
    push();
    translate(this.position);
    rotate(this.angle);
    fill("white");
    if (!fillCircle) {
      noFill();
    }
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
    circle(0, 0, this.radius * 2 * this.scale * this.amplitude);
    pop();
  }
  drawCrossConsonant() {
    if (!this.inicialPosition) this.getInitialPosition();
    this.drawConsonantCircle(false);
  }
  drawHalfConsonant() {
    if (!this.tiltCut || !this.radiusCut) {
      this.tiltCut = this.radius * this.amplitude
      this.radiusCut = this.radius * this.amplitude
    }
    this.drawCutWord(this.tiltCut, this.radiusCut);
  }
 
  tiltArc(r1, r2, tiltCut) {
    angleMode(RADIANS);
    let d = r1 + r2 - tiltCut;
    let a = -r1 * r1 + d * d + r2 * r2;
    let b = 2 * d * r2;
    let angle = 2 * acos(a / b);
    angleMode(DEGREES);
    return degrees(angle);
  }
  drawCutWord(tiltCut, radiusCut) {
    this.tiltCut = tiltCut;
    this.radiusCut = radiusCut;

    if (!this.inicialPosition) this.getInitialPosition();
    let tiltArc = this.tiltArc(this.parent.radius, radiusCut, tiltCut);
    let wordArc = this.tiltArc(radiusCut, this.parent.radius, tiltCut);

    //CLEAR WORD PERIMETER
    push();
    rotate(this.angle);
    noFill()
    stroke("white");
    strokeWeight(this.parent.strokeWeight * 5);
    strokeCap(SQUARE);
    let clearRadius = this.parent.radius * 2 * this.scale;

    arc(0, 0, clearRadius, clearRadius, -wordArc / 2, wordArc / 2, OPEN);

    pop();

    //DRAW ARC
    push();
    translate(this.position);
    rotate(this.angle);
    noFill()
    stroke(this.strokeColor);
    strokeWeight(this.parent.strokeWeight);

    radiusCut = radiusCut * 2 * this.scale;
    

    arc(0, 0, radiusCut, radiusCut, 180 - tiltArc / 2, 180 + tiltArc / 2, OPEN);
    pop();
  }

  

  drawCutConsonant() {
 
    if (!this.tiltCut || !this.radiusCut) {
    
      this.tiltCut =
        this.radius * this.amplitude * CUT_CONSONANT_TILT_MULTIPLIER
      this.radiusCut = this.radius * this.amplitude;
    }
    this.drawCutWord(this.tiltCut, this.radiusCut);
  }
  drawModifiers() {
    push();
    translate(this.position);

    rotate(this.angle);
    this.modifiers.forEach((modifier) => {
      modifier.scale = this.scale;
      modifier.amplitude = this.amplitude;
      modifier.draw();
    });
    pop();
  }
  draw(
    tilt = this.radius * this.amplitude,
    radius = this.radius * this.amplitude * 4
  ) {
    switch (this.type) {
      case CONSONANT_TYPE_INNER:
        this.drawInnerConsonant();
        break;
      case CONSONANT_TYPE_CROSS:
        this.drawCrossConsonant();
        break;
      case CONSONANT_TYPE_HALF:
        this.drawHalfConsonant();
        break;
      case CONSONANT_TYPE_CUT:
        this.drawCutConsonant();
        break;
      case CONSONANT_TYPE_CUT_WORD:
        this.drawCutWord(tilt, radius);
        break;
    }

    this.drawModifiers();
    push();
    translate(this.position);
    rotate(this.angle);
    this.children.forEach((child) => {
      child.scale = this.scale;
      child.amplitude = this.amplitude;
      child.draw();
    });
    pop();
  }

  getInitialPosition() {
    let x ,y;
    switch (this.type) {
      case CONSONANT_TYPE_INNER:
        x =
          (this.parent.radius - this.radius * this.amplitude - WORD_TILT) *
          cos(this.angleInParent) *
          this.scale;
        y =
          (this.parent.radius - this.radius * this.amplitude - WORD_TILT) *
          sin(this.angleInParent) *
          this.scale;
        break;
      case CONSONANT_TYPE_CROSS:
        x = this.parent.radius * this.scale * cos(this.angleInParent);
        y = this.parent.radius * this.scale * sin(this.angleInParent);
        break;
      case CONSONANT_TYPE_HALF:
      case CONSONANT_TYPE_CUT:
      case CONSONANT_TYPE_CUT_WORD:
        let distance =
          (this.parent.radius + this.radiusCut - this.tiltCut) * this.scale;
        x = distance * cos(this.angleInParent);
        y = distance * sin(this.angleInParent);
        break;
    }
    this.position.sub(this.startPosition)
    this.startPosition = createVector(x,y)
    this.position.add(this.startPosition)
    this.angle = this.angleInParent;
    this.inicialPosition = true;
  }

  checkMouseOver() {
    let position = this.getPositionInCanvas();
    let radius = this.radius * this.amplitude * this.scale*scaleA;
    if (
      Math.pow(position.x - mouseX, 2) + Math.pow(position.y - mouseY, 2) <
      radius * radius
    ) {
      return true;
    }
    return false;
  }

  setRadius(radius){
    switch(this.type){
      case CONSONANT_TYPE_HALF:
        this.radius = radius
        this.tiltCut = this.radius * this.amplitude
        this.radiusCut = this.radius * this.amplitude
        this.getInitialPosition()
        break;
      case CONSONANT_TYPE_CUT:
      case CONSONANT_TYPE_CUT_WORD:
        this.radius = radius
        this.tiltCut = this.radius * this.amplitude * CUT_CONSONANT_TILT_MULTIPLIER
        this.radiusCut = this.radius * this.amplitude;
        this.getInitialPosition()
        break;
      default:
        this.radius = radius
        break;
    }
   
  }
  setAngleInParent(angle){
    if(angle !=this.angleInParent){
       this.angleInParent = angle
     this.getInitialPosition()
    }
    
  }
}
