import p5 from 'p5'; 
import Word from './Word';

const canvasSizeX = 1000
const canvasSizeY = 1000
const wordRadius = 700
new p5((p) => {

  Word.p5 = p
  
  p.setup = () => {
    p.createCanvas(p.windowWidth,p.windowHeight);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES)
   
  };

 
 
  let w = new Word(p.windowWidth/2,p.windowHeight/2+100)

  p.draw = () => {
    p.background("white");
    w.draw(0.5)
    
  };
});