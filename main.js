let words;
let objects = [];
let selectedObject = null;
let originParent;
let scaleA = 1;
let scaleParent = 0.2;
let sliders = [];
let selected;
let hover;
let hoverPanel;
let translateX;
let translateY;

const pressed = new Set();
let objects_list = [];

let canvas;
function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  translateX = window.innerWidth / 2;
  translateY = window.innerHeight / 2;

  rectMode(CENTER);
  angleMode(DEGREES);
  originParent = new Particle();
  originParent.scale = scaleParent;
  originParent.children = "O Senhor e meu pastor e nada me faltara"
    .split(" ")
    .map((w) => new Word(w, originParent));

  originParent.scale = scaleParent;
  let len = originParent.children.length;
  originParent.children.forEach((w, index) => {
    w.position.x = -(len / 2 - index) * (window.innerWidth / (len + 1));

    w.position.y = -100;
    w.scale = scaleParent;
    objects.push(w);
    w.children.forEach((l) => {
      l.scale = scaleParent;
      objects.push(l);
      l.modifiers.forEach((m) => objects.push(m));
      l.children.forEach((v) => {
        objects.push(v);
        v.scale = scaleParent;
        v.modifiers.forEach((m) => objects.push(m));
      });
    });
  });
  createSliders();
  setSlider(0, 10, 15);

  const elements = document.getElementById("elements");
  // create_list(originParent.children,elements)
}

function draw() {
  background("white");

  push();
  translate(translateX, translateY);

  scale(scaleA);

  originParent.draw();
  moveParent();

  pop();
  findHover();

  if (hoverPanel && hoverPanel != selected) {
    hover = hoverPanel;
    hover.strokeColor = "gray";
    text(`Hover: ${hover}`, 10, 45);
  }

  showHover();

  // showSliders();
}
function setHover(hv) {
  if (hv != hoverPanel) {
    hoverPanel = hv;
  }
}
function changeSelected(element) {
  selected = element;
}

function getSelected() {
  return selected;
}
