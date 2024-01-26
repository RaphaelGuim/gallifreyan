 
class Word {
  constructor(word_string, x, y) {
    this.wordString = word_string.toLowerCase();
    this.x = x;
    this.y = y;
    this.Ox;
    this.Oy;
    this.angle = 0
    this.letters = [];
    this.amplitude = 1;
    this.type = WORD_TYPE;
    this.strokeWeight = 1;
    this.mapString();
  }

  

  mapString() {
    for (let i = 0; i < this.wordString.length; i++) {
      //ADD ALONE VOWEL
      let vowel = Vowel.getVowel(this.wordString[i], this);
      if (vowel) {
        vowel.parent = this;
        this.letters.push(vowel);
        continue;
      }
      let consonant; 
     
      if(Consonant.checkCompostConsonant(this.wordString.substring(i,i+2))){
        consonant = Consonant.getConsonant(this.wordString.substring(i,i+2), this);
        i++
      }      
     
      else{
        consonant = Consonant.getConsonant(this.wordString[i], this);
      }

       
      if (consonant) {
        //JUMP LETTER
        vowel = Vowel.getVowel(this.wordString[i + 1], this);

        if (vowel) {
          consonant.vowel = vowel;
          vowel.parent = consonant;
          i++;
        }
        this.letters.push(consonant);
      }
    }

    let angle = 360 / this.letters.length;

    if (angle < 60) {
      this.amplitude = 6 / this.letters.length;
    }

    this.letters = this.letters.map((letter, index) => {
      letter.angleInWord = -angle * index + 90;
      letter.amplitude = this.amplitude;
      return letter;
    });
  }

  draw() {
    
 
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noFill();
    strokeWeight(this.strokeWeight);
    circle(0, 0, WORD_RADIUS * 2 * this.scale);

    this.letters.forEach((letter) => {
      letter.scale = this.scale;
      letter.parent = this;
      letter.Ox = this.x;
      letter.Oy = this.y;
      letter.draw();
    });
    //DEBUG
    // fill("black");
    // textSize(30);
    // text(`${this.x},${this.y}`, 0, 0);

    pop();
  }
}
