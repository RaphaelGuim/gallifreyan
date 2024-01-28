class Particle {
  constructor(type, parent) {
    this.type = type;
    this.parent = parent;
    this.angle = 0;
    this.angleInParent = 0;
    this.amplitude = 1;
    this.scale = 1;
    this.position = createVector(0, 0);
    this.children = [];
  }

  checkMouseOver() {
    throw Error("checkMouseOver - Método Não implementado");
  }
  getPositionInCanvas() {
    let position = this.position.copy();
    let parent = this.parent;

    while (parent) {
      position.rotate(parent.angle).add(parent.position);
      parent = parent.parent;
    }
    return position;
  }
}
