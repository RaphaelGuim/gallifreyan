let words;
let Objects = [];
let selectedObject = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  
  words = [
    // new Word("ra ",500, 600 ),
    new Word("wacaqaraa" ),
    // new Word("beceqeree"),
    // new Word("biciqirii"),
    // new Word("bocoqoroo" ),
    // new Word("bucuxuruu"),

    // new Word("wa".split("").map(l=> `d${l}a`).join()),
    // new Word("wa"),
    // new Word("bacada", windowWidth / 2, windowHeight / 2),
  ];
  words.forEach((w) => {
    Objects.push(w);
    w.children.forEach((l) => {
      Objects.push(l);
      l.modifiers.forEach((m) => Objects.push(m));
      if(l.vowel){
        Objects.push(l.vowel);
      l.vowel.modifiers.forEach((m) => Objects.push(m));
      }
      
    });
  });
}

function draw() {
  background("white");
  words.forEach((w) => {
    w.scale = 0.4;
    
    w.position.x  =windowWidth / 2 
    w.position.y  =windowHeight / 2 
    w.draw();
    //  w.angle +=1 
  });
  

  // Objects.forEach(obj=>console.log(obj.getPositionInCanvas()))
}
