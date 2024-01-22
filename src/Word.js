const WORD_RADIUS = 700
const CONSONANT_RADIUS = 150

export default class Word {
  static p5;
  static tilt = 40;
 
  constructor(x, y) {
    
    this.x = x;
    this.y = y;
  }
  drawInnerConsonant(angle) {
    let x =
      (WORD_RADIUS - CONSONANT_RADIUS - Word.tilt) *
      Word.p5.cos(angle) *
      this.scale;
    let y =
      (WORD_RADIUS - CONSONANT_RADIUS - Word.tilt) *
      Word.p5.sin(angle) *
      this.scale;
    this.drawConsonantCircle(x, y);
  }
  drawConsonantCircle(x, y, fill = true) {
    Word.p5.push();
    Word.p5.translate(x, y);
    Word.p5.fill("white");
    if (!fill) {
      Word.p5.noFill();
    }

    this.drawCircle(0, 0, CONSONANT_RADIUS);

    Word.p5.pop();
  }

  drawCircle(x, y, radius) {
    Word.p5.circle(0, 0, radius * 2 * this.scale);
  }

  drawCrossConsonant(angle) {
    let x = WORD_RADIUS * this.scale * Word.p5.cos(angle);
    let y = WORD_RADIUS * this.scale * Word.p5.sin(angle);
    this.drawConsonantCircle(x, y, false);
  }

  drawHalfConsonant(angle) {
    this.drawCutWord(angle,CONSONANT_RADIUS,CONSONANT_RADIUS);
  }

  tiltArc(r1,r2,tiltCut){
    let d = r1 + r2 - tiltCut;
    let a = -r1 * r1 + d * d + r2 * r2;
    let b = 2 * d * r2;
    return 2 * Word.p5.acos(a / b);
  }

  drawCutWord(angle,tiltCut,radiusCut) {    

    let x =
      (WORD_RADIUS + radiusCut - tiltCut) * Word.p5.cos(angle) * this.scale;
    let y =
      (WORD_RADIUS + radiusCut - tiltCut) * Word.p5.sin(angle) * this.scale;

   
    
    Word.p5.angleMode(Word.p5.RADIANS);

  
    let tiltArc =this.tiltArc(WORD_RADIUS,radiusCut,tiltCut)
    tiltArc =Word.p5.degrees(tiltArc)
    Word.p5.push();
    Word.p5.translate(x, y);
    Word.p5.angleMode(Word.p5.DEGREES);
    Word.p5.rotate(angle + 180);

    Word.p5.noStroke();
    this.drawCircle(0, 0, radiusCut);
    
    Word.p5.stroke("black");
    Word.p5.arc(
      0,
      0,
      radiusCut * 2 * this.scale,
      radiusCut * 2 * this.scale,
      -tiltArc/2,
      tiltArc/2,
      Word.p5.OPEN
    );

    Word.p5.pop();
  }

  drawCutConsonant(angle) {

    this.drawCutWord(angle,CONSONANT_RADIUS*1.8,CONSONANT_RADIUS);
     
  }
  draw(scale = 1) {
    this.scale = scale;
    Word.p5.circle(this.x, this.y, WORD_RADIUS * 2 * this.scale);

    Word.p5.translate(this.x, this.y);
    
    this.drawInnerConsonant(0);
    this.drawCrossConsonant(90);
    this.drawHalfConsonant(180);
    this.drawCutConsonant(270);

    this.drawCutWord(-34,CONSONANT_RADIUS,CONSONANT_RADIUS*4);
  }
}
