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
  CUT_CONSONANT_TILT,
  CUT_CONSONANT_VOWEL_TILT,
} from "./Costants";
export default class Vowel {
  constructor(type) {
    this.type = type;
    this.scale = 1;
    this.angle = 0;
    this.x = 0;
    this.y = 0;
    this.amplitude = 1;
  }

  draw() {
    

    P5.angleMode(P5.DEGREES);
    let ACos = P5.cos(this.angle) * this.scale;
    let ASin = P5.sin(this.angle) * this.scale;
    if (!this.consonant) {
      switch (this.type) {
        case VOWEL_A:
          this.x = WORD_RADIUS + VOWEL_TILT * this.amplitude;
          this.y = WORD_RADIUS + VOWEL_TILT * this.amplitude;
          break;
        case VOWEL_I:
        case VOWEL_E:
        case VOWEL_U:
          this.x = WORD_RADIUS;
          this.y = WORD_RADIUS;
          break;
        case VOWEL_O:
          this.x = WORD_RADIUS - VOWEL_TILT * this.amplitude;
          this.y = WORD_RADIUS - VOWEL_TILT * this.amplitude;
          break;
      }
    } else {
      switch (this.type) {
        case VOWEL_A:
          switch (this.consonant.type) {
            case CONSONANT_TYPE_INNER:
              this.x =
                CONSONANT_RADIUS * this.amplitude +
                WORD_TILT +
                VOWEL_TILT * this.amplitude;
              this.y =
                CONSONANT_RADIUS * this.amplitude +
                WORD_TILT +
                VOWEL_TILT * this.amplitude;
              break;
            case CONSONANT_TYPE_CROSS:
              this.x = VOWEL_TILT * this.amplitude;
              this.y = VOWEL_TILT * this.amplitude;
              break;
            case CONSONANT_TYPE_HALF:
              this.x = VOWEL_TILT * this.amplitude;
              this.y = VOWEL_TILT * this.amplitude;
              break;
            case CONSONANT_TYPE_CUT:
              this.x =
                CONSONANT_RADIUS *
                this.amplitude *
                CUT_CONSONANT_VOWEL_TILT *
                this.amplitude;
              this.y =
                CONSONANT_RADIUS *
                this.amplitude *
                CUT_CONSONANT_VOWEL_TILT *
                this.amplitude;
              break;
          }
          break;

        case VOWEL_O:
          switch (this.consonant.type) {
            case CONSONANT_TYPE_INNER:
              this.x = -CONSONANT_RADIUS * this.amplitude;
              this.y = -CONSONANT_RADIUS * this.amplitude;
              break;
            case CONSONANT_TYPE_CROSS:
              this.x = -CONSONANT_RADIUS * this.amplitude;
              this.y = -CONSONANT_RADIUS * this.amplitude;
              break;
            case CONSONANT_TYPE_HALF:
              this.x = -CONSONANT_RADIUS * this.amplitude;
              this.y = -CONSONANT_RADIUS * this.amplitude;
              break;
            case CONSONANT_TYPE_CUT:
              this.x = -CONSONANT_RADIUS * this.amplitude;
              this.y = -CONSONANT_RADIUS * this.amplitude;
              break;
          }
          break;
      }
    }
    P5.noFill();
    this.x = this.x*ACos
    this.y = this.y*ASin

    if (this.type == VOWEL_U || this.type == VOWEL_I) {
      P5.push()
      P5.translate(this.x,this.y)
      let x0 = VOWEL_RADIUS * this.amplitude;
      let y0 = VOWEL_RADIUS * this.amplitude;
      let x1 = 6 * VOWEL_RADIUS * this.amplitude;
      let y1 = 6 * VOWEL_RADIUS * this.amplitude;
      if (this.type == VOWEL_I) {
        x0 = VOWEL_RADIUS * this.amplitude;
        y0 = VOWEL_RADIUS * this.amplitude;
        x1 = 6 * VOWEL_RADIUS * this.amplitude;
        y1 = 6 * VOWEL_RADIUS * this.amplitude;
      }

      P5.line(x0 * ACos, y0 * ASin, x1 * ACos, y1 * ASin);
      P5.pop()
    }
    
    P5.push()
    P5.translate( this.x,this.y)
    P5.circle(
      0,
      0,
      VOWEL_RADIUS * 2 * this.amplitude * this.scale
    );
    P5.fill("white");
    P5.pop()
  }
  static getVowel(letter) {
    if ("aeiou".includes(letter)) {
      switch (letter) {
        case "a":
          return new Vowel(VOWEL_A);

        case "e":
          return new Vowel(VOWEL_E);

        case "i":
          return new Vowel(VOWEL_I);

        case "o":
          return new Vowel(VOWEL_O);

        case "u":
          return new Vowel(VOWEL_U);
      }
    }
    return null;
  }
}
