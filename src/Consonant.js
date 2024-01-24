import { P5 } from "./main";

import {
  WORD_RADIUS,
  CONSONANT_RADIUS,
  WORD_TILT,
  CONSONANT_TYPE_CUT_WORD,
  CONSONANT_TYPE_INNER,
  CONSONANT_TYPE_CROSS,
  CONSONANT_TYPE_HALF,
  CONSONANT_TYPE_CUT,
  CUT_CONSONANT_TILT_MULTIPLIER,
  CONSONANT_B,
  CONSONANT_C,
  CONSONANT_D,
  CONSONANT_F,
  CONSONANT_G,
  CONSONANT_H,
  CONSONANT_J,
  CONSONANT_K,
  CONSONANT_L,
  CONSONANT_M,
  CONSONANT_N,
  CONSONANT_P,
  CONSONANT_Q,
  CONSONANT_R,
  CONSONANT_S,
  CONSONANT_SH,
  CONSONANT_T,
  CONSONANT_TH,
  CONSONANT_V,
  CONSONANT_W,
  CONSONANT_X,
  CONSONANT_Y,
  CONSONANT_Z,
} from "./Costants";

export default class Consonant {
  static p5;

  constructor(type, word) {
    this.type = type;
    this.word = word;
    this.angle = 0;
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.Ox;
    this.Oy;
    this.amplitude = 1;
    this.vowel = null;
    this.modifiers = [];
  }
  drawInnerConsonant() {
    this.x =
      (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
      P5.cos(this.angle) *
      this.scale;
    this.y =
      (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
      P5.sin(this.angle) *
      this.scale;
    this.drawConsonantCircle(this.x, this.y, false);
  }
  drawConsonantCircle(x, y, fill = true) {
    P5.push();
    P5.translate(x, y);
    P5.fill("white");
    if (!fill) {
      P5.noFill();
    }
    this.drawCircle(0, 0, CONSONANT_RADIUS * this.amplitude);
    P5.pop();
  }

  drawCircle(x, y, radius) {
    P5.circle(x, y, radius * 2 * this.scale);
  }

  drawCrossConsonant() {
    this.x = WORD_RADIUS * this.scale * P5.cos(this.angle);
    this.y = WORD_RADIUS * this.scale * P5.sin(this.angle);
    this.drawConsonantCircle(this.x, this.y, false);
  }

  drawHalfConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude,
      CONSONANT_RADIUS * this.amplitude
    );
  }
  static getConsonant(letter, word) {
    switch (letter) {
      case "b":
        return new Consonant(CONSONANT_B, word);
      case "c":
        return new Consonant(CONSONANT_C, word);
      case "d":
        return new Consonant(CONSONANT_D, word);
      case "f":
        return new Consonant(CONSONANT_F, word);
      case "g":
        return new Consonant(CONSONANT_G, word);
      case "h":
        return new Consonant(CONSONANT_H, word);
      case "j":
        return new Consonant(CONSONANT_J, word);
      case "k":
        return new Consonant(CONSONANT_K, word);
      case "l":
        return new Consonant(CONSONANT_L, word);
      case "m":
        return new Consonant(CONSONANT_M, word);
      case "n":
        return new Consonant(CONSONANT_N, word);
      case "p":
        return new Consonant(CONSONANT_P, word);
      case "q":
        return new Consonant(CONSONANT_Q, word);
      case "r":
        return new Consonant(CONSONANT_R, word);
      case "s":
        return new Consonant(CONSONANT_S, word);
      case "t":
        return new Consonant(CONSONANT_T, word);
      case "v":
        return new Consonant(CONSONANT_V, word);
      case "x":
        return new Consonant(CONSONANT_X, word);
      case "w":
        return new Consonant(CONSONANT_W, word);
      case "y":
        return new Consonant(CONSONANT_Y, word);
      case "z":
        return new Consonant(CONSONANT_Z, word);
    }
  }
  tiltArc(r1, r2, tiltCut) {
    P5.angleMode(P5.RADIANS);
    let d = r1 + r2 - tiltCut;
    let a = -r1 * r1 + d * d + r2 * r2;
    let b = 2 * d * r2;
    let angle = 2 * P5.acos(a / b);
    P5.angleMode(P5.DEGREES);
    return P5.degrees(angle);
  }

  drawCutWord(tiltCut, radiusCut) {
    let distance = (WORD_RADIUS + radiusCut - tiltCut) * this.scale;
    this.x = distance * P5.cos(this.angle);
    this.y = distance * P5.sin(this.angle);

    let tiltArc = this.tiltArc(WORD_RADIUS, radiusCut, tiltCut);
    let wordArc = this.tiltArc(radiusCut, WORD_RADIUS, tiltCut);

    //CLEAR WORD PERIMETER
    P5.push();    
    P5.rotate(this.angle);
    P5.stroke("white");
    P5.strokeWeight(this.word.strokeWeight*5);
    P5.strokeCap(P5.SQUARE);
    let clearRadius = WORD_RADIUS * 2 * this.scale;
    

    P5.arc(0, 0, clearRadius, clearRadius, -wordArc / 2, wordArc / 2, P5.CLOSE);
  
    P5.pop();

    //DRAW ARC 
    P5.push();
    P5.translate(this.x, this.y);
    P5.rotate(this.angle);    
    P5.stroke("black");
    P5.strokeWeight(this.word.strokeWeight);
    
    radiusCut = radiusCut * 2 * this.scale;
    P5.arc(0, 0, radiusCut, radiusCut, 180-tiltArc / 2, 180+tiltArc / 2, P5.CLOSE);
    P5.pop();
  }

  drawCutConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude * CUT_CONSONANT_TILT_MULTIPLIER,
      CONSONANT_RADIUS * this.amplitude
    );
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

    if (this.vowel) {
      P5.push();
      P5.translate(this.x, this.y);
      this.vowel.angle = this.angle;
      this.vowel.scale = this.scale;
      this.vowel.amplitude = this.amplitude;
      this.vowel.Ox = this.Ox + this.x;
      this.vowel.Oy = this.Oy + this.y;
      this.vowel.draw();
      P5.pop();
    }
  }
}
