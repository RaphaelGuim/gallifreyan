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
  CUT_CONSONANT_TILT,
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
    this.amplitude = 1;
    this.vowel = null;
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
    this.drawConsonantCircle(this.x, this.y);
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
  static getConsonant(letter) {
    switch (letter) {
      case "b":
        return new Consonant(CONSONANT_B, this);
      case "c":
        return new Consonant(CONSONANT_C, this);
      case "d":
        return new Consonant(CONSONANT_D, this);
      case "f":
        return new Consonant(CONSONANT_F, this);
      case "g":
        return new Consonant(CONSONANT_G, this);
      case "h":
        return new Consonant(CONSONANT_H, this);
      case "j":
        return new Consonant(CONSONANT_J, this);
      case "k":
        return new Consonant(CONSONANT_K, this);
      case "l":
        return new Consonant(CONSONANT_L, this);
      case "m":
        return new Consonant(CONSONANT_M, this);
      case "n":
        return new Consonant(CONSONANT_N, this);
      case "p":
        return new Consonant(CONSONANT_P, this);
      case "q":
        return new Consonant(CONSONANT_Q, this);
      case "r":
        return new Consonant(CONSONANT_R, this);
      case "s":
        return new Consonant(CONSONANT_S, this);
      case "t":
        return new Consonant(CONSONANT_T, this);
      case "v":
        return new Consonant(CONSONANT_V, this);
      case "x":
        return new Consonant(CONSONANT_X, this);
      case "w":
        return new Consonant(CONSONANT_W, this);
      case "y":
        return new Consonant(CONSONANT_Y, this);
      case "z":
        return new Consonant(CONSONANT_Z, this);
    }
  }
  tiltArc(r1, r2, tiltCut) {
    let d = r1 + r2 - tiltCut;
    let a = -r1 * r1 + d * d + r2 * r2;
    let b = 2 * d * r2;
    return 2 * P5.acos(a / b);
  }

  drawCutWord(tiltCut, radiusCut) {
    this.x =
      (WORD_RADIUS + radiusCut - tiltCut) * P5.cos(this.angle) * this.scale;
    this.y =
      (WORD_RADIUS + radiusCut - tiltCut) * P5.sin(this.angle) * this.scale;

    P5.angleMode(P5.RADIANS);

    let tiltArc = this.tiltArc(WORD_RADIUS, radiusCut, tiltCut);
    tiltArc = P5.degrees(tiltArc);

    P5.push();
    P5.translate(this.x, this.y);
    
    P5.angleMode(P5.DEGREES);
    P5.rotate(this.angle + 180);

    P5.noStroke();
    P5.fill("white")
    this.drawCircle(0, 0, radiusCut);

    P5.stroke("black");
    P5.arc(
      0,
      0,
      radiusCut * 2 * this.scale,
      radiusCut * 2 * this.scale,
      -tiltArc / 2,
      tiltArc / 2,
      P5.OPEN
    );

    P5.pop();
  }

  drawCutConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude * CUT_CONSONANT_TILT,
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
      this.vowel.consonant = this;
      this.vowel.x = this.x
      this.vowel.y = this.y
      this.vowel.draw();
      P5.pop();
    }
  }
}
