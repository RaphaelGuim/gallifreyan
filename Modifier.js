 class Modifier {
 

  constructor(type, parent) {
    this.type = type;
    this.parent=parent;
    this.angle = random(60);
    this.scale =parent.scale;
    this.amplitude = parent.amplitude;
    this.x;
    this.y;
    
   
   
    
  }
  static createDots(numberOfDots=1,consonant){
    let angle = -180 +8*random(-10,10)
    let dots =[]
    for(let i=0;i<numberOfDots;i++){
      let dot = new Modifier(MODIFIER_DOT, consonant)
      dot.angle = angle + 10*(i)
      dots.push(dot)
    }
    return dots;
  }

  static createLines(numberOfLines=1,consonant){
    let angle = -180 +8*random(-10,10)
    let lines =[]
    for(let i=0;i<numberOfLines;i++){
      let line = new Modifier(MODIFIER_LINE, consonant)
      line.angle = angle + 10*(i)
      lines.push(line)
    }
    return lines;
  }

  innerModifier() {
    this.ACos = cos(this.parent.angle) * this.scale;
    this.ASin = sin(this.parent.angle) * this.scale;
    let x0, y0, x1, y1;
   
    
    x0 = -VOWEL_RADIUS * this.amplitude;
    y0 = -VOWEL_RADIUS * this.amplitude;
    x1 = -6 * VOWEL_RADIUS * this.amplitude;
    y1 = -6 * VOWEL_RADIUS * this.amplitude;
    push();
    translate(this.x, this.y);
    // rotate(this.angle)
    line(x0 * this.ACos, y0 * this.ASin, x1 * this.ACos, y1 * this.ASin);
    pop();
  }
  outModifier() {
    this.ACos = cos(this.parent.angle) * this.scale;
    this.ASin = sin(this.parent.angle) * this.scale;
    let x0, y0, x1, y1;
    x0 = VOWEL_RADIUS * this.amplitude;
    y0 = VOWEL_RADIUS * this.amplitude;
    x1 = 6 * VOWEL_RADIUS * this.amplitude;
    y1 = 6 * VOWEL_RADIUS * this.amplitude;
    push();
    translate(this.x, this.y);
    line(x0 * this.ACos, y0 * this.ASin, x1 * this.ACos, y1 * this.ASin);
    pop();
  }
  dotModifier(){

    this.x = (CONSONANT_RADIUS+MODIFIER_DOT_TILT)*this.scale*this.amplitude
    this.y = 0
     
   
    push();
    rotate(this.angle)
    translate(this.x, this.y);
    fill("black")
    circle(0, 0, MODIFIER_DOT_RADIUS * 2 * this.scale*this.amplitude);
    pop();

  }

  lineModifier(){

    this.x = (CONSONANT_RADIUS)*this.scale*this.amplitude
    this.y = 0     
   
    push();
    rotate(this.angle)
    translate(this.x, this.y);
    fill("black")
    strokeWeight(4)
    strokeCap(SQUARE);
    let size = MODIFIER_LINE_RADIUS * 2 * this.scale*this.amplitude
    line(0, 0, size,0);
    pop();

  }


  draw() {
    
    switch (this.type) {
      case MODIFIER_INNER:
        this.innerModifier();
        break;
      case MODIFIER_OUT:
        this.outModifier();
        break;
      case MODIFIER_DOT:
        this.dotModifier();
        break;
      case MODIFIER_LINE:
        this.lineModifier();
    }
  }
}
