function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

class Particle {
  constructor(type, parent, char) {
    this.type = type;
    this.parent = parent;
    this.angle = 0;
    this.angleInParent = 0;
    this.amplitude = 1;
    this.scale = 1;
    this.strokeWeight = 1;
    this.position = createVector(0, 0);
    this.startPosition = createVector(0, 0);
    this.children = [];
    this.defaultColor = "black";
    this.strokeColor = "black";
    this.color = "black";
    this.char = char;
    this.inicialPosition = false;
    this.id = uuidv4()
  }

  setStrokeWeight(value) {
    this.strokeWeight = value;
  }
  getStrokeWeight() {
    return this.strokeWeight;
  }

  setRadius(radius) {
    this.radius = radius;
  }
  getRadius() {
    return this.radius;
  }

  setScale(scale) {
    if (scale != this.scale) {
      let diff = 1 + (scale - this.scale);

      this.scale = scale;
      this.children.forEach((c) => {
        c.setRadius(c.radius * diff);
      });
    }
  }
  getScale() {
    return this.scale;
  }

  toString() {
    return this.char;
  }

  move(addVector) {
    this.position.add(addVector);
  }

  checkMouseOver() {
    throw Error("checkMouseOver - Método Não implementado");
  }
  getPositionInCanvas() {
    let position = this.position.copy().mult(scaleA)
    let parent = this.parent;

    while (parent) {
       
      position.rotate(parent.angle).add(parent.position.copy().mult(scaleA))
      parent = parent.parent;
    }
    return position.add(createVector(translateX,translateY)) 
  }

  getRotationInCanvas() {
    let rotation = 0;
    let parent = this.parent;

    while (parent) {
      rotation += parent.angle;
      parent = parent.parent;
    }
    return rotation;
  }
  draw() {
    push();
    translate(this.position);
    rotate(this.angle);
    noFill();
    this.children.forEach((letter) => {
      letter.scale = this.scale;
      letter.draw();
    });

    pop();
  }
  checkMouseOver() {
    return false;
  }

  setAngleInParent(angle) {
    this.angleInParent = angle;
  }
}
