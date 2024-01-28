class Word extends Particle {
  constructor(word_string, parent) {
    super(WORD_TYPE, parent);
    this.wordString = word_string.toLowerCase();    
    this.children = [];
    this.strokeWeight = 1;
    this.mapString();
  }
  mapString() {
    for (let i = 0; i < this.wordString.length; i++) {
      //ADD ALONE VOWEL
      let vowel = Vowel.getVowel(this.wordString[i], this);
      if (vowel) {
        vowel.parent = this;
        this.children.push(vowel);
        continue;
      }
      let consonant;

      if (
        Consonant.checkCompostConsonant(this.wordString.substring(i, i + 2))
      ) {
        consonant = Consonant.getConsonant(
          this.wordString.substring(i, i + 2),
          this
        );
        i++;
      } else {
        consonant = Consonant.getConsonant(this.wordString[i], this);
      }

      if (consonant) {
        //JUMP LETTER
        vowel = Vowel.getVowel(this.wordString[i + 1], this);

        if (vowel) {
          consonant.children.push(vowel);
          vowel.parent = consonant;
          i++;
        }
        this.children.push(consonant);
      }
    }

    let angle = 360 / this.children.length;

    if (angle < 60) {
      this.amplitude = 6 / this.children.length;
    }

    this.children = this.children.map((letter, index) => {
      letter.angleInParent = -angle * index + 90;
      letter.amplitude = this.amplitude;
      return letter;
    });
  }

  draw() {
    push();
    translate(this.position);
    rotate(this.angle);
    noFill();
    strokeWeight(this.strokeWeight); 
    circle(0, 0, WORD_RADIUS * 2 * this.scale);

    this.children.forEach((letter) => {
      letter.scale = this.scale;
      letter.parent = this;
      letter.draw();
    });
    //DEBUG
    // fill("black");
    // textSize(30);
    // text(`${this.position.x},${this.position.y}`, 0, 0);

    pop();
  }
  checkMouseOver() {
    let position = this.getPositionInCanvas()
    let radius = WORD_RADIUS * this.scale     
    if(Math.pow(position.x - mouseX,2) +Math.pow(position.y - mouseY,2) <radius*radius){
      return true
    }
    return false
  }

  
}
