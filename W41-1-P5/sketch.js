function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  blendMode(BLEND);
  background(27, 49, 93);
  fill(144, 216, 189);
  blendMode(DIFFERENCE);
  //   blendMode(EXCLUSION);
  drawCircle1();
  drawCircle2();
  drawCircle3();
}

function drawCircle1() {
  let px = width / 2;
  let py = height / 2;
  let minDim = min(width, height);
  let size = 200;

  let time = millis() / 1000;
  let duration = 4;
  let playhead = (time / duration) % 1;
  let anim = sin(playhead * 360) * 0.5 + 0.5;
  let thickness = minDim * 0.7 * anim;

  noFill();
  stroke(144, 216, 189);
  strokeWeight(thickness);
  ellipse(px, py, size, size);
}

function drawCircle2() {
  push();
  translate(width / 2, height / 2);
  let px = 0;
  let py = 0;
  pop();
  let minDim = min(width, height);
  let size = 1000;

  let time = millis() / 1000;
  let duration = 4;
  let playhead = (time / duration) % 1;
  let anim = sin(playhead * 360) * 0.5 + 0.5;
  let thickness = minDim * 1.3 * anim;

  noFill();
  stroke(144, 216, 189);
  strokeWeight(thickness);
  ellipse(px, py, size, size);
}

function drawCircle3() {
  let px = windowWidth + 600;
  let py = windowHeight + 600;
  let minDim = min(width, height);
  let size = 1500;

  let time = millis() / 1000;
  let duration = 4;
  let playhead = (time / duration) % 1;
  let anim = sin(playhead * 360) * 0.5 + 0.5;
  let thickness = minDim * 4 * anim;

  noFill();
  stroke(144, 216, 189);
  strokeWeight(thickness);
  ellipse(px, py, size, size);
}
