import { P5 } from "./main";
import {
  WORD_RADIUS,
  VOWEL_RADIUS,
  WORD_TILT,
  VOWEL_A,
  VOWEL_E,
  VOWEL_I,
  VOWEL_O,
  VOWEL_U,
  VOWEL_TILT,
  CONSONANT_TYPE_INNER,
  CONSONANT_TYPE_CROSS,
  CONSONANT_TYPE_HALF,
  CONSONANT_TYPE_CUT,
  CONSONANT_RADIUS,
  CUT_CONSONANT_TILT_MULTIPLIER,
  CUT_CONSONANT_VOWEL_TILT,
  MODIFIER_INNER,
  MODIFIER_OUT,
  WORD_TYPE,
} from "./Costants";
export default class Vowel {
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
  }
  getDistance() {
    let distance = 0;
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
    return distance;
  }

  draw() {
    this.ACos = P5.cos(this.angle) * this.scale;
    this.ASin = P5.sin(this.angle) * this.scale;
    
    let distance = this.getDistance();
 
    this.x = distance * this.ACos;
    this.y = distance * this.ASin;

    if (this.type == VOWEL_U) {
      this.modifier(MODIFIER_OUT);
    } else if (this.type == VOWEL_I) {
      this.modifier(MODIFIER_INNER);
    }

    P5.push();
    P5.translate(this.x, this.y);
    P5.noFill();
    P5.circle(0, 0, VOWEL_RADIUS * 2 * this.amplitude * this.scale);
    P5.fill("white");
    P5.pop();

    P5.push()
    P5.translate(this.x,this.y)
    
    //DEBUG
    // P5.fill("black");
    // P5.textSize(30);    
    // P5.text(`${Math.round(this.Ox+this.x)},${Math.round(this.Oy)}`, 0, 0);
    
    P5.pop()

    
  }
  modifier(type) {
    P5.push();
    P5.translate(this.x, this.y);
    let x0, y0, x1, y1;
    if (type == MODIFIER_INNER) {
      x0 = -VOWEL_RADIUS * this.amplitude;
      y0 = -VOWEL_RADIUS * this.amplitude;
      x1 = -6 * VOWEL_RADIUS * this.amplitude;
      y1 = -6 * VOWEL_RADIUS * this.amplitude;
    } else if (type == MODIFIER_OUT) {
      x0 = VOWEL_RADIUS * this.amplitude;
      y0 = VOWEL_RADIUS * this.amplitude;
      x1 = 6 * VOWEL_RADIUS * this.amplitude;
      y1 = 6 * VOWEL_RADIUS * this.amplitude;
    }
 
   
   
    P5.line(x0 * this.ACos, y0 * this.ASin, x1 * this.ACos, y1 * this.ASin);
    P5.pop();
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
