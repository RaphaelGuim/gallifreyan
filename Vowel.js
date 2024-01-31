class Vowel extends Particle {
  constructor(type, parent,char) {
    super(type, parent,char);
    this.radius = VOWEL_RADIUS
    this.modifiers = [];

    if (this.type == VOWEL_U) {
      this.modifiers.push(new Modifier(MODIFIER_OUT, this));
    }

    if (this.type == VOWEL_I) {
      this.modifiers.push(new Modifier(MODIFIER_INNER, this));
    }
  }

  setScale(scale) {
    if (scale != this.scale) {
     
      this.scale = scale;
      
    }
  }
  getDistance() {
    let distance = 0;

    if (this.parent.type == WORD_TYPE) {
      switch (this.type) {
        case VOWEL_A:
          distance = this.parent.radius + VOWEL_TILT * this.amplitude;
          break;
        case VOWEL_I:
        case VOWEL_E:
        case VOWEL_U:
          distance = this.parent.radius;
          break;
        case VOWEL_O:
          distance = this.parent.radius - VOWEL_TILT * this.amplitude;
          break;
      }
    } else {
      switch (this.type) {
        case VOWEL_A:
          switch (this.parent.type) {
            case CONSONANT_TYPE_INNER:
              distance =
                (CONSONANT_RADIUS + VOWEL_TILT) * this.amplitude + WORD_TILT;
              break;
            case CONSONANT_TYPE_CROSS:
              distance = VOWEL_TILT * this.amplitude;
              break;
            case CONSONANT_TYPE_HALF:
              distance = VOWEL_TILT * this.amplitude;
              break;
            case CONSONANT_TYPE_CUT:
              distance =
                (CONSONANT_RADIUS - CUT_CONSONANT_VOWEL_TILT + VOWEL_TILT) *
                this.amplitude;
              break;
          }
          break;

        case VOWEL_O:
          switch (this.parent.type) {
            case CONSONANT_TYPE_INNER:
              distance = -CONSONANT_RADIUS * this.amplitude;

              break;
            case CONSONANT_TYPE_CROSS:
              distance = -CONSONANT_RADIUS * this.amplitude;

              break;
            case CONSONANT_TYPE_HALF:
              distance = -CONSONANT_RADIUS * this.amplitude;

              break;
            case CONSONANT_TYPE_CUT:
              distance = -CONSONANT_RADIUS * this.amplitude;

              break;
          }
          break;
        default:
          distance = 0;
          break;
      }
    }

    return distance;
  }

  getInitialPosition() {
   
    
    let distance = this.getDistance();
    let x = distance * cos(this.angleInParent) * this.scale;
    let y = distance * sin(this.angleInParent) * this.scale;
   
    this.angle = this.angleInParent;

    this.position.sub(this.startPosition)
    this.startPosition = createVector(x,y)
    this.position.add(this.startPosition)
       
    this.inicialPosition = true;
  }
  drawModifiers() {
    push();
    translate(this.position);    
    this.modifiers.forEach((modifier) => {
      modifier.scale = this.scale;
      modifier.amplitude = this.amplitude;
      modifier.draw();
    });
    pop();
  }
  draw() {
    if(!this.inicialPosition){
      
      this.getInitialPosition()
    }
    
    
 

    let radius = this.radius * 2 * this.amplitude * this.scale;

    this.drawModifiers() 
    push();
    translate(this.position);
    rotate(this.angle);
     
    noFill();
   
    stroke(this.strokeColor)
    strokeWeight(this.strokeWeight)
    circle(0, 0, radius);
    fill("white");
    pop();
  }

  static getVowel(letter, word) {
    if ("aeiou".includes(letter)) {
      switch (letter) {
        case "a":
          return new Vowel(VOWEL_A, word,letter);

        case "e":
          return new Vowel(VOWEL_E, word,letter);

        case "i":
          return new Vowel(VOWEL_I, word,letter);

        case "o":
          return new Vowel(VOWEL_O, word,letter);

        case "u":
          return new Vowel(VOWEL_U, word,letter);
      }
    }
    return null;
  }

  checkMouseOver() {
    let position = this.getPositionInCanvas();   
    let radius = this.radius * this.amplitude * this.scale;   
    
    
    let p1 = position.x - mouseX;
    let p2 = position.y - mouseY;
     
    if (Math.pow(p1, 2) + Math.pow(p2, 2) < radius * radius) {
      return true;
    }
    return false;
  }

 

   

}
