let startA = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 20);
  // Move coordinates to the center for this object
  push();
  translate(width / 2, height / 2);
  noStroke();
  let w = 100;
  let h = 100;
  let angle = startA;
  beginShape();
  for (let a = 0; a < 360; a += 4) {
    let offset = sin(angle) * 10 + 30 * noise(a * 0.1);
    let x = (w + offset) * cos(a);
    let y = (h + offset) * sin(a);
    curveVertex(x, y);
    angle += 10;
  }
  // Restore coordinates to default
  pop();

  endShape(CLOSE);
  fill(200, 20);

  startA += 2;
}
