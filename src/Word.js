import Consonant from "./Consonant";
import { P5 } from "./main";
import {
  WORD_RADIUS,
  CONSONANT_TYPE_CUT_WORD,
  CONSONANT_TYPE_INNER,
  CONSONANT_TYPE_CROSS,
  CONSONANT_TYPE_HALF,
  CONSONANT_TYPE_CUT,
  VOWEL_A,
  VOWEL_E,
  VOWEL_U,
  VOWEL_I,
  VOWEL_O,
  WORD_TYPE,
} from "./Costants";

import Vowel from "./Vowel";
export default class Word {
  constructor(word_string, x, y) {
    this.wordString = word_string.toLowerCase();
    this.x = x;
    this.y = y;
    this.Ox;
    this.Oy;
    this.letters = [];
    this.amplitude = 1;
    this.type = WORD_TYPE;
    this.strokeWeight = 1
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

      let consonant = Consonant.getConsonant(this.wordString[i], this);
      
      if (consonant) {
        //JUMP LETTER
        if (this.wordString[i] == "q" && this.wordString[i + 1] == "u") {
          i++;
        }

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
      letter.angle = -angle * index + 90;
      letter.amplitude = this.amplitude;
      return letter;
    });
  }

  draw() {
    P5.push();
    P5.translate(this.x, this.y);

    P5.noFill();
    P5.strokeWeight(this.strokeWeight);
    P5.circle(0, 0, WORD_RADIUS * 2 * this.scale);

    this.letters.forEach((letter) => {
      letter.scale = this.scale;
      letter.parent = this;
      letter.Ox = this.x;
      letter.Oy = this.y;
      letter.draw();
    });
    //DEBUG
    // P5.fill("black");
    // P5.textSize(30);
    // P5.text(`${this.x},${this.y}`, 0, 0);

    P5.pop();
  }
}
