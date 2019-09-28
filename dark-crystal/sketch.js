//References

// curveVertex:
// https://p5js.org/reference/#/p5/curveVertex

// Perlin noise:
// https://p5js.org/reference/#/p5/noise

//Videos:
// https://www.youtube.com/watch?v=rX5p-QRP6R4&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=9
// https://www.youtube.com/watch?v=D1BBj2VaBl4&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=5

let startA = 0;
let yoff = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 10);
  wavesObject();
  vertexObject();
}

function vertexObject() {
  // Move coordinates from top left to the center for this object
  push();
  translate(width / 2, height / 2);
  noStroke();
  let w = width / 3;
  let h = height / 7;
  let angle = startA;

  // For loop and a bit of Perlin noise
  beginShape();
  for (let a = 0; a < 360; a += 4) {
    let offset = sin(angle) * 10 + 30 * noise(a * 0.5);
    let x = (w - offset) * cos(a);
    let y = (h + offset) * sin(a);
    curveVertex(x, y);
    angle += 20;
  }
  endShape(CLOSE);

  // Restore coordinates to default
  pop();

  // Random color adds blinking
  fill(random(40), 3);

  startA += 2;
}

function wavesObject() {
  fill(random(150), 3);
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
