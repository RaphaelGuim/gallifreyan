class Consonant {
  constructor(type, word, modifiers) {
    this.type = type;
    this.word = word;
    this.angleInWord = 0;
    this.angle=0
    this.scale = word.scale;
    this.x = 0;
    this.y = 0;
    this.Ox;
    this.Oy;
    this.amplitude = word.amplitude;
    this.vowel = null;
    this.modifiers = modifiers || [];
  }
  drawInnerConsonant() {
    this.x =
      (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
      cos(this.angleInWord) *
      this.scale;
    this.y =
      (WORD_RADIUS - CONSONANT_RADIUS * this.amplitude - WORD_TILT) *
      sin(this.angleInWord) *
      this.scale;
    this.drawConsonantCircle(this.x, this.y, false);
  }
  drawConsonantCircle(x, y, fillCircle = true) {    
    push();
    translate(x, y);
    rotate(this.angleInWord)
    fill("white");
    if (!fillCircle) {
      noFill();
    }
    this.drawCircle(0, 0, CONSONANT_RADIUS);
    pop();
  }

  drawCircle(x, y, radius) {
    circle(x, y, radius * 2 * this.scale* this.amplitude);
  }

  drawCrossConsonant() {
    this.x = WORD_RADIUS * this.scale * cos(this.angleInWord);
    this.y = WORD_RADIUS * this.scale * sin(this.angleInWord);
    this.drawConsonantCircle(this.x, this.y, false);
  }

  drawHalfConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude,
      CONSONANT_RADIUS * this.amplitude
    );
  }
  static checkCompostConsonant(letter){
    return ['ch','ph','wh','sh','th','gh' ,'qu','ng'].includes(letter )
  }
  static getConsonant(letter, word) {
    let consonant
    switch (letter) {
      case "b":
        return new Consonant(CONSONANT_B, word);
      case "c":
        consonant = new Consonant(CONSONANT_C, word )
        consonant.modifiers = Modifier.createDots(2,consonant)
        return consonant ;
      case "ch":
        consonant = new Consonant(CONSONANT_CH, word )
        consonant.modifiers = Modifier.createDots(2,consonant)
        return consonant ;
      case "d":
        consonant = new Consonant(CONSONANT_D, word )
        consonant.modifiers = Modifier.createDots(3,consonant)
        return consonant ;
      case "f":
        consonant = new Consonant(CONSONANT_F, word )
        consonant.modifiers = Modifier.createLines(3,consonant)
        return consonant ;
      case "g":
        consonant = new Consonant(CONSONANT_D, word )
        consonant.modifiers = Modifier.createLines(1,consonant)
        return consonant ;
      case "gh":
        consonant = new Consonant(CONSONANT_GH, word )
        consonant.modifiers = Modifier.createDots(1,consonant)
        return consonant ;
      case "h":
        consonant = new Consonant(CONSONANT_H, word )
        consonant.modifiers = Modifier.createLines(2,consonant)
        return consonant ;
      case "j":
        return new Consonant(CONSONANT_J, word);
      case "k":
        consonant = new Consonant(CONSONANT_K, word )
        consonant.modifiers = Modifier.createDots(2,consonant)
        return consonant ;
      case "l":
        consonant = new Consonant(CONSONANT_L, word )
        consonant.modifiers = Modifier.createDots(3,consonant)
        return consonant ;
      case "m":
        consonant = new Consonant(CONSONANT_M, word )
        consonant.modifiers = Modifier.createLines(3,consonant)
        return consonant ;
      case "n":
        consonant = new Consonant(CONSONANT_N, word )
        consonant.modifiers = Modifier.createLines(1,consonant)
        return consonant ;
      case "ng":
        consonant = new Consonant(CONSONANT_NG, word )
        consonant.modifiers = Modifier.createLines(3,consonant)
        return consonant ;
      case "p":
        consonant = new Consonant(CONSONANT_P, word )
        consonant.modifiers = Modifier.createLines(2,consonant)
        return consonant ;
      case "ph":
        consonant = new Consonant(CONSONANT_PH, word )
        consonant.modifiers = Modifier.createDots(1,consonant)
        return consonant ;
      case "q":
        return new Consonant(CONSONANT_Q, word);
      case "qu":
        consonant = new Consonant(CONSONANT_QU, word )
        consonant.modifiers = Modifier.createLines(1,consonant)
        return consonant ;
      case "r":
        consonant = new Consonant(CONSONANT_R, word )
        consonant.modifiers = Modifier.createDots(3,consonant)
        return consonant ;
      case "s":
        consonant = new Consonant(CONSONANT_S, word )
        consonant.modifiers = Modifier.createLines(3,consonant)
        return consonant ;
      case "sh":
        consonant = new Consonant(CONSONANT_SH, word )
        consonant.modifiers = Modifier.createDots(2,consonant)
        return consonant ;
      case "t":
        return new Consonant(CONSONANT_T, word);
      case "th":
        return new Consonant(CONSONANT_TH, word);
      case "v":
        consonant = new Consonant(CONSONANT_V, word )
        consonant.modifiers = Modifier.createLines(1,consonant)
        return consonant ;
      case "x":
        consonant = new Consonant(CONSONANT_QU, word )
        consonant.modifiers = Modifier.createLines(2,consonant)
        return consonant ;
      case "w":
        consonant = new Consonant(CONSONANT_W, word )
        consonant.modifiers = Modifier.createLines(2,consonant)
        return consonant ;
      case "wh":
        consonant = new Consonant(CONSONANT_WH, word )
        consonant.modifiers = Modifier.createDots(1,consonant)
        return consonant ;
      case "y":
        consonant = new Consonant(CONSONANT_Y, word )
        consonant.modifiers = Modifier.createDots(2,consonant)
        return consonant ;
      case "z":
        consonant = new Consonant(CONSONANT_Z, word )
        consonant.modifiers = Modifier.createDots(3,consonant)
        return consonant ;
    }
  }
  tiltArc(r1, r2, tiltCut) {
    angleMode(RADIANS);
    let d = r1 + r2 - tiltCut;
    let a = -r1 * r1 + d * d + r2 * r2;
    let b = 2 * d * r2;
    let angle = 2 * acos(a / b);
    angleMode(DEGREES);
    return degrees(angle);
  }

  drawCutWord(tiltCut, radiusCut) {
    let distance = (WORD_RADIUS + radiusCut - tiltCut) * this.scale;
    this.x = distance * cos(this.angleInWord);
    this.y = distance * sin(this.angleInWord);

    let tiltArc = this.tiltArc(WORD_RADIUS, radiusCut, tiltCut);
    let wordArc = this.tiltArc(radiusCut, WORD_RADIUS, tiltCut);

    //CLEAR WORD PERIMETER
    push();
    rotate(this.angleInWord);
    stroke("white");
    strokeWeight(this.word.strokeWeight * 5);
    strokeCap(SQUARE);
    let clearRadius = WORD_RADIUS * 2 * this.scale;

    arc(0, 0, clearRadius, clearRadius, -wordArc / 2, wordArc / 2, CLOSE);

    pop();

    //DRAW ARC
    push();
    translate(this.x, this.y);
    rotate(this.angleInWord);
    stroke("black");
    strokeWeight(this.word.strokeWeight);

    radiusCut = radiusCut * 2 * this.scale;
    arc(
      0,
      0,
      radiusCut,
      radiusCut,
      180 - tiltArc / 2,
      180 + tiltArc / 2,
      CLOSE
    );
    pop();
  }

  drawCutConsonant() {
    this.drawCutWord(
      CONSONANT_RADIUS * this.amplitude * CUT_CONSONANT_TILT_MULTIPLIER,
      CONSONANT_RADIUS * this.amplitude
    );
  }
  drawModifiers() {
    push();
    translate(this.x, this.y);
    console.log(this.angle)
    rotate(this.angleInWord)
    this.modifiers.forEach((modifier) => {
      modifier.Ox = this.Ox + this.x;
      modifier.Oy = this.Oy + this.y;
      modifier.scale = this.scale;
      modifier.amplitude = this.amplitude;
      modifier.draw();
    });
    pop();
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

    this.drawModifiers();
    
    if (this.vowel) {
      push();      
      translate(this.x, this.y);
      rotate(this.angleInWord)
      this.vowel.scale = this.scale;
      this.vowel.amplitude = this.amplitude;
      this.vowel.Ox = this.Ox + this.x;
      this.vowel.Oy = this.Oy + this.y;
      this.vowel.draw();
      pop();
    }
  }
}
