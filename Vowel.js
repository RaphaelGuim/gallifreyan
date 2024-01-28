class Vowel extends Particle {
  constructor(type, parent) {
    super(type, parent);

    this.modifiers = [];

    if (this.type == VOWEL_U) {
      this.modifiers.push(new Modifier(MODIFIER_OUT, this));
    }

    if (this.type == VOWEL_I) {
      this.modifiers.push(new Modifier(MODIFIER_INNER, this));
    }
  }
  getDistance() {
    let distance = 0;

    if (this.parent.type == WORD_TYPE) {
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
          distance = 0;
          break;
      }
    }

    return distance;
  }

  getInitialPosition() {
    let distance = this.getDistance();
    this.position.x = distance * cos(this.angleInParent) * this.scale;
    this.position.y = distance * sin(this.angleInParent) * this.scale;
    this.angle = this.angleInParent;
    this.initialPosition = true;
  }

  draw() {
    if (!this.initialPosition) this.getInitialPosition();

    let radius = VOWEL_RADIUS * 2 * this.amplitude * this.scale;

    push();
    translate(this.position);
    rotate(this.angle);
    this.modifiers.forEach((modifier) => {
      modifier.amplitude = this.amplitude;
      modifier.scale = this.scale;
      modifier.draw();
    });
    noFill();
    if (this.checkMouseOver()) {
      fill("red");
      circle(0, 0, radius);
    }

    circle(0, 0, radius);
    fill("white");
    pop();
  }

  static getVowel(letter, word) {
    if ("aeiou".includes(letter)) {
      switch (letter) {
        case "a":
          return new Vowel(VOWEL_A, word);

        case "e":
          return new Vowel(VOWEL_E, word);

        case "i":
          return new Vowel(VOWEL_I, word);

        case "o":
          return new Vowel(VOWEL_O, word);

        case "u":
          return new Vowel(VOWEL_U, word);
      }
    }
    return null;
  }

  checkMouseOver() {
    let position = this.getPositionInCanvas();   
    let radius = VOWEL_RADIUS * this.scale * this.amplitude;   
    let p1 = position.x - mouseX;
    let p2 = position.y - mouseY;
     
    if (Math.pow(p1, 2) + Math.pow(p2, 2) < radius * radius) {
      return true;
    }
    return false;
  }
}
