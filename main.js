let words;
let objects = [];
let selectedObject = null;
let originParent;
let scale = 0.15;
let sliders = [];
let selected;
let hover;
const pressed = new Set();

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  originParent = new Particle();
  originParent.scale = scale;
  originParent.children = 
  
  "Kronnos e o senhor do tempo".split(" ").map(w=> new Word(w, originParent),)
   
  originParent.children.forEach((w,index) => {
    w.position.x = (index+1)*windowWidth/(originParent.children.length +2)
    
    w.position.y = windowHeight / 2;
    w.scale = scale
    objects.push(w);
    w.children.forEach((l) => {
      objects.push(l);
      l.modifiers.forEach((m) => objects.push(m));
      l.children.forEach((v) => {
        objects.push(v);
        v.modifiers.forEach((m) => objects.push(m));
      });
    });
  });
  createSliders()
}


function draw() {
  background("white");
  originParent.draw();
  moveParent();
  findHover();
  
   
  showSliders();
}





 

 
