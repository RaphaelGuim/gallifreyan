class Line extends Particle{
    constructor(type, parent,char) {
        super(type, parent,char);
        this.endPosition = createVector(0,0)
    }

    draw(){
        push();
            rotate(this.angle);
            translate(this.position);
            strokeWeight(this.strokeWeight);
            stroke(this.strokeColor)
            line(0,0, this.endPosition.x, this.endPosition.y);
        pop();
      
    }
}