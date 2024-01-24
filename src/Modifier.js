import { P5 } from "./main";

import * as Constants from "./Costants";

export default class modifier {
  static p5;

  constructor(type) {
    this.type = type;
    this.parent;
    this.angle = 0;
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.Ox;
    this.Oy;
    this.amplitude = 1;
  }

  draw() {}
}
