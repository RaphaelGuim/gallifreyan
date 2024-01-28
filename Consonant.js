class Consonant extends Particle {
  constructor(type, parent, modifiers) {
    super(type,parent)     
    this.angleInParent = 0;
    this.modifiers = modifiers || [];
  }
  drawInnerConsonant() {
    if (!this.inicialPosition)  this.getInitialPosition()
    this.drawConsonantCircle( false);
  }
  drawConsonantCircle(fillCircle = true) {
    push();
    translate(this.position);
    rotate(this.angle);
    fill("white");
    if (!fillCircle) {
      noFill();
    }
    circle(0, 0, CONSONANT_RADIUS* 2 * this.scale * this.amplitude);
    pop();
  }
  drawCrossConsonant() {
    if (!this.inicialPosition)  this.getInitialPosition()
    this.drawConsonantCircle(false);
  }
  drawHalfConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude,
      CONSONANT_RADIUS * this.amplitude
    );
  }
  static checkCompostConsonant(letter) {
    return ["ch", "ph", "wh", "sh", "th", "gh", "qu", "ng"].includes(letter);
  }
  static getConsonant(letter, word) {
    let consonant;
    switch (letter) {
      case "b":
        return new Consonant(CONSONANT_B, word);
      case "c":
        consonant = new Consonant(CONSONANT_C, word);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "ch":
        consonant = new Consonant(CONSONANT_CH, word);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "d":
        consonant = new Consonant(CONSONANT_D, word);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "f":
        consonant = new Consonant(CONSONANT_F, word);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "g":
        consonant = new Consonant(CONSONANT_D, word);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "gh":
        consonant = new Consonant(CONSONANT_GH, word);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "h":
        consonant = new Consonant(CONSONANT_H, word);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "j":
        return new Consonant(CONSONANT_J, word);
      case "k":
        consonant = new Consonant(CONSONANT_K, word);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "l":
        consonant = new Consonant(CONSONANT_L, word);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "m":
        consonant = new Consonant(CONSONANT_M, word);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "n":
        consonant = new Consonant(CONSONANT_N, word);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "ng":
        consonant = new Consonant(CONSONANT_NG, word);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "p":
        consonant = new Consonant(CONSONANT_P, word);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "ph":
        consonant = new Consonant(CONSONANT_PH, word);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "q":
        return new Consonant(CONSONANT_Q, word);
      case "qu":
        consonant = new Consonant(CONSONANT_QU, word);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "r":
        consonant = new Consonant(CONSONANT_R, word);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
      case "s":
        consonant = new Consonant(CONSONANT_S, word);
        consonant.modifiers = Modifier.createLines(3, consonant);
        return consonant;
      case "sh":
        consonant = new Consonant(CONSONANT_SH, word);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "t":
        return new Consonant(CONSONANT_T, word);
      case "th":
        return new Consonant(CONSONANT_TH, word);
      case "v":
        consonant = new Consonant(CONSONANT_V, word);
        consonant.modifiers = Modifier.createLines(1, consonant);
        return consonant;
      case "x":
        consonant = new Consonant(CONSONANT_QU, word);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "w":
        consonant = new Consonant(CONSONANT_W, word);
        consonant.modifiers = Modifier.createLines(2, consonant);
        return consonant;
      case "wh":
        consonant = new Consonant(CONSONANT_WH, word);
        consonant.modifiers = Modifier.createDots(1, consonant);
        return consonant;
      case "y":
        consonant = new Consonant(CONSONANT_Y, word);
        consonant.modifiers = Modifier.createDots(2, consonant);
        return consonant;
      case "z":
        consonant = new Consonant(CONSONANT_Z, word);
        consonant.modifiers = Modifier.createDots(3, consonant);
        return consonant;
    }
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
    this.tiltCut = tiltCut
    this.radiusCut=radiusCut
    
    if (!this.inicialPosition)  this.getInitialPosition()
    let tiltArc = this.tiltArc(WORD_RADIUS, radiusCut, tiltCut);
    let wordArc = this.tiltArc(radiusCut, WORD_RADIUS, tiltCut);
 
    //CLEAR WORD PERIMETER
    push();
    rotate(this.angle);
    stroke("white");
    strokeWeight(this.parent.strokeWeight * 5);
    strokeCap(SQUARE);
    let clearRadius = WORD_RADIUS * 2 * this.scale;

    arc(0, 0, clearRadius, clearRadius, -wordArc / 2, wordArc / 2, CLOSE);

    pop();

    //DRAW ARC
    push();
    translate(this.position);
    rotate(this.angle);
    stroke("black");
    strokeWeight(this.parent.strokeWeight);

    radiusCut = radiusCut * 2 * this.scale;
    arc(
      0,
      0,
      radiusCut,
      radiusCut,
      180 - tiltArc / 2,
      180 + tiltArc / 2,
      CLOSE
    );
    pop();
  }

  drawCutConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude * CUT_CONSONANT_TILT_MULTIPLIER,
      CONSONANT_RADIUS * this.amplitude
    );
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
    tilt = CONSONANT_RADIUS * this.amplitude,
    radius = CONSONANT_RADIUS * this.amplitude * 4
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
    this.children.forEach(child=>{
     
      child.scale = this.scale;
      child.amplitude = this.amplitude;      
      child.draw();
     
    })
    pop();
    
  }

  getInitialPosition(){
    switch(this.type){
      case CONSONANT_TYPE_INNER:
        this.position.x =
        (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
        cos(this.angleInParent) *
        this.scale;
      this.position.y =
        (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
        sin(this.angleInParent) *
        this.scale;
        break;
      case CONSONANT_TYPE_CROSS:
        this.position.x = WORD_RADIUS * this.scale * cos(this.angleInParent);
        this.position.y = WORD_RADIUS * this.scale * sin(this.angleInParent);        
        break;
      case CONSONANT_TYPE_HALF:
      case CONSONANT_TYPE_CUT:
      case CONSONANT_TYPE_CUT_WORD:
        let distance = (WORD_RADIUS +  this.radiusCut - this.tiltCut) * this.scale;
        this.position.x = distance * cos(this.angleInParent);
        this.position.y = distance * sin(this.angleInParent);        
        break;      
    }

    this.angle = this.angleInParent
    this.inicialPosition = true;
  }

  checkMouseOver() {
    let position = this.getPositionInCanvas()
    let radius = CONSONANT_RADIUS * this.amplitude * this.scale   
    if(Math.pow(position.x - mouseX,2) +Math.pow(position.y - mouseY,2) <radius*radius){
      return true
    }
    return false
  }
}
