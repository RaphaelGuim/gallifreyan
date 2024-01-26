let words;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  words = [
    // new Word("ra ",500, 600 ),
    // new Word("bacaqaraa",150, 150 ),
    // new Word("beceqeree",150, 300 ),
    // new Word("biciqirii",150, 450 ),
    // new Word("bocoqoroo",450, 150 ),
    // new Word("bucuxuruu",450, 300 ),

    // new Word("aeiou".split("").map(l=> `d${l}`).join(),windowWidth/2, windowHeight/2 ),
    new Word("ga", windowWidth / 2, windowHeight / 2),
  ];
}

function draw() {
  background("black");
  // w.draw(0.5);
}


let index = 0
let inputs = [10,10,0,0,0,0,0,0]
let control = true;
function mouseDragged() {
  inputs[index] = mouseX
  inputs[index+1] = mouseY
}

function keyPressed() {
  index= index +2
  if(index > 7){
    index = 0
  }
}


 
function draw() {
  background("white");
  words.forEach((w) => {
    w.scale = 0.6;
    w.draw();
 
  });

  for(let i =0;i<7;i=i+2){
    if(i==index){
      fill("green")
    }
    else{
      fill("white")
    }
    circle(inputs[i],inputs[i+1],20)
  }
  
   
  
  noFill()
  bezier(inputs[0],inputs[1],inputs[2], inputs[3], inputs[4],inputs[5],inputs[6],inputs[7]);

  //DEBUG
  // P5.fill("black");
  // P5.textSize(30);
  // P5.text(`${P5.mouseX},${P5.mouseY}`, P5.mouseX, P5.mouseY);
}
