let tileX = windowWidth / 16;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawLines();
}

function drawLines() {
  for (let i = tileX; i < windowWidth; i++) {
    // if (i % 2 === 0) {
    //   fill(0);
    // } else {
    //   fill(255);
    // }
    fill("red");
    rect(0, 0, i, windowHeight);
  }
}
