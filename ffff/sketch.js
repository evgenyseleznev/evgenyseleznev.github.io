let video;
let buffer;
let result;
let previousPixels;
let poseNet;
let poses = [];
let imagesLeftEye = [];
let imagesRightEye = [];
let imagesNose = [];
let imagesMouth = [];
let historyLeftEye = [];
let historyRightEye = [];
let historyMouth = [];
let multiplePeopleCounter = 0;

function preload() {
  for (let i = 0; i < 20; i++) {
    imagesLeftEye[i] = loadImage(`src/re/re${i}.png`);
    imagesRightEye[i] = loadImage(`src/le/le${i}.png`);
    imagesNose[i] = loadImage(`src/no/no${i}.png`);
    imagesMouth[i] = loadImage(`src/mo/mo${i}.png`);
  }
}

p5.disableFriendlyErrors = true; // disables FES

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create a new poseNet method
  let options = {
    flipHorizontal: true,
  };
  poseNet = ml5.poseNet(video, options, modelReady);
  // This sets up an event that fills the global variable "poses" with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  frameRate(30);
  buffer = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t);
  // capturer.start();
}

function modelReady() {
  console.log('model ready');
}

function copyImage(src, dst) {
  let n = src.length;
  if (!dst || dst.length != n) dst = new src.constructor(n);
  while (n--) dst[n] = src[n];
  return dst;
}

function FrameDifference() {
  video.loadPixels();
  let total = 0;
  if (video.pixels.length > 0) {
    // don't forget this!
    if (!previousPixels) {
      previousPixels = copyImage(video.pixels, previousPixels);
    } else {
      let w = video.width,
        h = video.height;
      let i = 0;
      let pixels = video.pixels;
      let thresholdAmount = (12 * 255) / 250;
      thresholdAmount *= 3; // 3 for r, g, b
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // calculate the differences
          let rdiff = Math.abs(pixels[i + 0] - previousPixels[i + 0]);
          let gdiff = Math.abs(pixels[i + 1] - previousPixels[i + 1]);
          let bdiff = Math.abs(pixels[i + 2] - previousPixels[i + 2]);
          // copy the current pixels to previousPixels
          previousPixels[i + 0] = pixels[i + 0];
          previousPixels[i + 1] = pixels[i + 1];
          previousPixels[i + 2] = pixels[i + 2];
          let diffs = rdiff + gdiff + bdiff;
          let output = 0;
          if (diffs > thresholdAmount) {
            output = 255;
            total += diffs;
          }
          // pixels[i++] = output;
          // pixels[i++] = output;
          // pixels[i++] = output;
          // also try this:
          pixels[i++] = rdiff;
          pixels[i++] = gdiff;
          pixels[i++] = bdiff;
          i++; // skip alpha
        }
      }
    }
  }
  // need this because sometimes the frames are repeated
  if (total > 0) {
    video.updatePixels();
    push();
    scale(-1, 1);
    image(video, 0, 0, -width, height);
    pop();
  }
}

function jsfeatToP5(src, dst) {
  if (!dst || dst.width != src.cols || dst.height != src.rows) {
    dst = createImage(src.cols, src.rows);
  }
  let n = src.data.length;
  dst.loadPixels();
  let srcData = src.data;
  let dstData = dst.pixels;
  for (let i = 0, j = 0; i < n; i++) {
    let cur = srcData[i];
    dstData[j++] = cur;
    dstData[j++] = cur;
    dstData[j++] = cur;
    dstData[j++] = 255;
  }
  dst.updatePixels();
  return dst;
}

function JSFeatEffect() {
  video.loadPixels();
  if (video.pixels.length > 0) {
    jsfeat.imgproc.grayscale(video.pixels, width, height, buffer);
    jsfeat.imgproc.gaussian_blur(buffer, buffer, 4, 0);
    jsfeat.imgproc.canny(buffer, buffer, 20, 40);
    let n = buffer.rows * buffer.cols;
    //uncomment the following lines to invert the image
    // for (var i = 0; i < n; i++) {
    //   buffer.data[i] = 255 - buffer.data[i];
    // }
    result = jsfeatToP5(buffer, result);
    push();
    scale(-1, 1);
    image(result, 0, 0, -width, height);
    pop();
  }
}

function draw() {
  if (poses.length >= 2) {
    multiplePeopleCounter += 1;
  } else {
    multiplePeopleCounter = 0;
  }

  if (multiplePeopleCounter < 10) {
    FrameDifference();
  } else {
    JSFeatEffect();
  }

  drawKeypoints();

  if (frameCount % 300 == 0) {
    saveCanvas('Imperfection.jpg');
  }
}

// A function to draw over the detected keypoints
function drawKeypoints() {
  push();
  // Make images center aligned to keypoints
  imageMode(CENTER);
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      // Scale the chop parts based on the distance between eye and nose
      let scaleDistance = dist(
        poses[i].pose.keypoints[0].position.x,
        poses[i].pose.keypoints[0].position.y,
        poses[i].pose.keypoints[1].position.x,
        poses[i].pose.keypoints[1].position.y,
      );
      // 👁 Right eye 👁
      if (keypoint.part === 'rightEye' && keypoint.score > 0.2) {
        // Create an array for previous states
        let v = createVector(keypoint.position.x, keypoint.position.y);
        historyRightEye.push(v);
        // Limit the trails up to N
        if (historyRightEye.length > 5) {
          historyRightEye.splice(0, 1);
        }
        // Create trails
        for (let k = 0; k < historyRightEye.length; k++) {
          let loc = historyRightEye[k];
          image(imagesRightEye[k], loc.x, loc.y, scaleDistance * 1.25, scaleDistance);
        }
        // The current image
        let random = Math.floor(Math.random() * imagesRightEye.length);
        image(imagesRightEye[random], keypoint.position.x, keypoint.position.y, scaleDistance * 1.5, scaleDistance * 1.2);
      }
      // 👀 Left Eye 👀
      if (keypoint.part === 'leftEye' && keypoint.score > 0.2) {
        // Create an array for previous states
        let v = createVector(keypoint.position.x, keypoint.position.y);
        historyLeftEye.push(v);
        // Limit the trails up to N
        if (historyLeftEye.length > 5) {
          historyLeftEye.splice(0, 1);
        }
        // Create trails
        for (let k = 0; k < historyLeftEye.length; k++) {
          let loc = historyLeftEye[k];
          image(imagesLeftEye[k], loc.x, loc.y, scaleDistance, scaleDistance);
        }
        // The current image
        let random = Math.floor(Math.random() * imagesLeftEye.length);
        image(imagesLeftEye[random], keypoint.position.x, keypoint.position.y, scaleDistance * 1.3, scaleDistance * 1.3);
      }
      // 👄 Mouth 👄
      if (keypoint.part === 'nose' && keypoint.score > 0.2) {
        // Create an array for previous states
        let v = createVector(keypoint.position.x, keypoint.position.y);
        historyMouth.push(v);
        // Limit the trails up to N
        if (historyMouth.length > 5) {
          historyMouth.splice(0, 1);
        }
        // Create trails
        for (let k = 0; k < historyMouth.length; k++) {
          let loc = historyMouth[k];
          image(imagesMouth[k], loc.x, loc.y + scaleDistance, scaleDistance * 1.15, scaleDistance * 0.5);
        }
        // The current image
        let random = Math.floor(Math.random() * imagesMouth.length);
        image(imagesMouth[random], keypoint.position.x, keypoint.position.y + scaleDistance, scaleDistance * 2.1, scaleDistance * 0.9);
      }
      // 👃 Nose 👃
      if (keypoint.part === 'nose' && keypoint.score > 0.2) {
        // The current image
        let random = Math.floor(Math.random() * imagesNose.length);
        image(imagesNose[random], keypoint.position.x, keypoint.position.y, scaleDistance, scaleDistance * 1.09);
      }
    }
  }
  pop();
}
