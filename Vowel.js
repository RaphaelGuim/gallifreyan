 

 
 class Vowel {
  constructor(type,word) {
    this.type = type;
    this.word=word
    this.scale = 1;
    this.angle = 0;
    this.word;
    this.x = 0;
    this.y = 0;
    this.amplitude = 1;
    this.Ox;
    this.Oy;
    this.modifiers = []

    
    if (this.type == VOWEL_U) {
      this.modifiers.push(new Modifier(MODIFIER_OUT,this))
    }

    if (this.type == VOWEL_I) {
      this.modifiers.push(new Modifier(MODIFIER_INNER,this))
    }
  }
  getDistance() {
    let distance = 0;
    console.log(this.parent.type)
    if (this.parent.type==WORD_TYPE) {
      switch (this.type) {
        case VOWEL_A:
          distance = WORD_RADIUS + VOWEL_TILT * this.amplitude;
          break;
        case VOWEL_I:
        case VOWEL_E:
        case VOWEL_U:
          distance = WORD_RADIUS;
          break;
        case VOWEL_O:
          distance = WORD_RADIUS - VOWEL_TILT * this.amplitude;
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
          distance = 0
          break;
      }
    }
    console.log(distance)
    return distance;
  }

  draw() {  

    let distance = this.getDistance();
   
    if(this.parent.type == WORD_TYPE){       
      this.x = distance* cos(this.angleInWord) * this.scale;
      this.y = distance*sin(this.angleInWord) * this.scale;
    }else{
      this.x = distance * this.scale;

    } 
    
    push();
    translate(this.x, this.y);
    if(this.parent.type == WORD_TYPE){
      rotate(this.angleInWord)
    }
    rotate(this.angle)
    this.modifiers.forEach(modifier=> {
      modifier.amplitude = this.amplitude
      modifier.scale = this.scale
      modifier.draw()
    })
    noFill();
    circle(0, 0, VOWEL_RADIUS * 2 * this.amplitude * this.scale);
    fill("white");
    pop();

     

    
  }
   
  static getVowel(letter,word) {
    if ("aeiou".includes(letter)) {
      switch (letter) {
        case "a":
          return new Vowel(VOWEL_A,word);

        case "e":
          return new Vowel(VOWEL_E,word);

        case "i":
          return new Vowel(VOWEL_I,word);

        case "o":
          return new Vowel(VOWEL_O,word);

        case "u":
          return new Vowel(VOWEL_U,word);
      }
    }
    return null;
  }
}
