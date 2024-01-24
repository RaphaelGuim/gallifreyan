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

let words =[
  new Word("bacaqaraa",500, 200 ),
  new Word("beceqeree",500, 600 ),
  new Word("biciqirii",500, 1000 ),
  new Word("bocoqoroo",1500, 200 ),
  new Word("bucuxuruu",1500, 600 ),
]
 

P5.draw = ()=>{
  
  P5.background("white");
  words.forEach(w=>{
    w.scale = 0.35
    w.draw();
  })
 
  
}

export {P5}