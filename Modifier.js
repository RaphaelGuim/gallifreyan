class Modifier extends Particle {
  constructor(type, parent) {
    super(type, parent);
    this.radius = MODIFIER_DOT_RADIUS
    this.char = this.type
  }
  static createDots(numberOfDots = 1, consonant) {
    let angle = -180 + 8 * random(-10, 10);
    let dots = [];
    for (let i = 0; i < numberOfDots; i++) {
      let dot = new Modifier(MODIFIER_DOT, consonant);
      dot.angleInParent = angle + 10 * i;
      dots.push(dot);
    }
    return dots;
  }

  static createLines(numberOfLines = 1, consonant) {
    let angle = -180 + 8 * random(-10, 10);
    let lines = [];
    for (let i = 0; i < numberOfLines; i++) {
      let line = new Modifier(MODIFIER_LINE, consonant);
      line.angle = angle + 10 * i;
      lines.push(line);
    }
    return lines;
  }

  lineModifier() {
    push();
    rotate(this.angle);
    translate(this.position);
    strokeWeight(this.strokeWeight);
    stroke(this.strokeColor)
    line(this.x, this.y, this.x1, this.y1);
    pop();
  }

  dotModifier() {
   
    push();
     
    translate(this.position);
    stroke(this.strokeColor)
    fill("black");
    circle(0, 0, this.radius * 2 * this.scale * this.amplitude);
    pop();
  }

   

  draw() {
    if (!this.inicialPosition) {
      this.getInitialPosition();
    }

    switch (this.type) {
      case MODIFIER_INNER:
      case MODIFIER_OUT:
      case MODIFIER_LINE:
        this.lineModifier();
        break;

      case MODIFIER_DOT:
        this.dotModifier();
        break;
      
      
    }
  }

  getInitialPosition() {
    this.ACos = cos(this.parent.angle) * this.scale;
    this.ASin = sin(this.parent.angle) * this.scale;
    let x, y, x1, y1;
    switch (this.type) {
      case MODIFIER_INNER:
        x = -VOWEL_RADIUS * this.amplitude;
        y = -VOWEL_RADIUS * this.amplitude;
        x1 = -6 * VOWEL_RADIUS * this.amplitude;
        y1 = -6 * VOWEL_RADIUS * this.amplitude;

        this.x = x * this.ACos;
        this.y = y * this.ASin;
        this.x1 = x1 * this.ACos;
        this.y1 = y1 * this.ASin;

        break;
      case MODIFIER_OUT:
        x = VOWEL_RADIUS * this.amplitude;
        y = VOWEL_RADIUS * this.amplitude;
        x1 = 6 * VOWEL_RADIUS * this.amplitude;
        y1 = 6 * VOWEL_RADIUS * this.amplitude;
        this.x = x * this.ACos;
        this.y = y * this.ASin;
        this.x1 = x1 * this.ACos;
        this.y1 = y1 * this.ASin;

        break;
      case MODIFIER_DOT:
        this.position.x =
          (CONSONANT_RADIUS + MODIFIER_DOT_TILT) * this.scale * this.amplitude;
        this.position.y = 0;
        this.position.rotate(this.angleInParent) 
         
         
        break;
      case MODIFIER_LINE:
        this.position.x = CONSONANT_RADIUS * this.scale * this.amplitude;
        this.position.y = 0;
        x = 0
        y = 0
        x1 = MODIFIER_LINE_RADIUS * 2 * this.scale * this.amplitude;
        y1 =0

        this.x = x
        this.y = y
        this.x1 = x1 
        this.y1 = y1 
        break;
    }

    this.inicialPosition = true;
  }

  checkMouseOver() {

    switch (this.type) {
      case MODIFIER_INNER:
      case MODIFIER_OUT:
      case MODIFIER_LINE:  
        break;       
      case MODIFIER_DOT:
      
        let position = this.getPositionInCanvas();

       

        let radius = this.radius * this.amplitude * this.scale;
        
        if (
          Math.pow(position.x - mouseX, 2) + Math.pow(position.y - mouseY, 2) <
          radius * radius
        ) {
          return true;
        }
        return false;
        
        break;
      
      
    }
    
    return false
  }
}
