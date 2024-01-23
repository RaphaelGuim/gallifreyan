import p5 from "p5";
import Word from "./Word";
 
const P5 = new p5((p) => {
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
  };

  // p.draw = () => {
  //   p.background("white");
  //   w.draw(0.5);
  // };
});
let w = new Word("vinretaseroum",P5.windowWidth / 2, P5.windowHeight / 2 );

P5.draw = ()=>{
  
  P5.background("white");
  w.scale = 0.5
  w.draw();
}

export {P5}