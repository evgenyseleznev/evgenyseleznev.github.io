let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  for (let i = 0; i < 4; i++) {
    let x = i + 20 * 40;
    let size = i + 10 * 20;
    circles[i] = new niceCircle(x, this.y, size, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(27, 49, 93);
  for (let i = 0; i < circles.length; i++) {
    circles[i].render();
    circles[i].animate();
  }
}

class niceCircle {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.minDim = min(windowWidth, windowHeight);
    this.size = this.minDim * 0.5;
  }

  animate() {
    this.time = millis() / 1000;
    this.duration = 3;
    this.playhead = this.time / this.duration;
    this.anim = sin(this.playhead * 360) * 0.5 + 0.5;
    this.thick = this.minDim * this.anim * 0.5;
  }

  render() {
    noFill();
    stroke(144, 216, 189);
    strokeWeight(this.thick);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
