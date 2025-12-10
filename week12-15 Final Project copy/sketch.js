let video;
let poseML5;
let poses = [];

let prevLeftWristX = 0;
let prevLeftWristY = 0;

let ripples = [];
let speedThreshold = 10;

function preload() {
  poseML5 = ml5.bodyPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseML5.detectStart(video, gotPoses);
  console.log("PoseNet initialized. Waiting for detection.");
}

function draw() {
  image(video, 0, 0, width, height);
  loadPixels();

  if (poses.length > 0) {
    if (poses[0].left_wrist) {
      let leftWrist = poses[0].left_wrist;
      let currentX = leftWrist.x;
      let currentY = leftWrist.y;

      let D = dist(currentX, currentY, prevLeftWristX, prevLeftWristY);
      if (D > speedThreshold) {
        let newripple = new Ripple(currentX, currentY, D);
        ripples.push(newripple);
      }

      prevLeftWristX = currentX;
      prevLeftWristY = currentY;
    }
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].applyWaveDistortion(pixels, width, height);
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }

  updatePixels();
}

class Ripple {
  constructor(x, y, initialSpeed) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.alpha = 255;
    this.rGrowSpeed = map(initialSpeed, 0, 20, 2, 10);
  }

  applyWaveDistortion(pixels, w, h) {
    let originalPixels = pixels.slice();

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let dx = x - this.x;
        let dy = y - this.y;
        let distToWave = sqrt(dx * dx + dy * dy);

        let waveWidth = 60;
        let distFromWave = abs(distToWave - this.r);

        if (distFromWave < waveWidth && distToWave > 0) {
          let waveStrength = (1 - distFromWave / waveWidth) * (this.alpha / 255);
          let displacement = sin((distToWave - this.r) / waveWidth * PI) * waveStrength * 25;

          let angle = atan2(dy, dx);
          let newX = x + cos(angle) * displacement;
          let newY = y + sin(angle) * displacement;

          newX = constrain(newX, 0, w - 1);
          newY = constrain(newY, 0, h - 1);

          let sourceIndex = (floor(newY) * w + floor(newX)) * 4;
          let targetIndex = (y * w + x) * 4;

          if (sourceIndex >= 0 && sourceIndex < originalPixels.length - 3) {
            pixels[targetIndex] = lerp(originalPixels[targetIndex], originalPixels[sourceIndex], waveStrength * 0.8);
            pixels[targetIndex + 1] = lerp(originalPixels[targetIndex + 1], originalPixels[sourceIndex + 1], waveStrength * 0.8);
            pixels[targetIndex + 2] = lerp(originalPixels[targetIndex + 2], originalPixels[sourceIndex + 2], waveStrength * 0.8);
            pixels[targetIndex + 3] = originalPixels[targetIndex + 3];
          }
        }
      }
    }

    this.r += this.rGrowSpeed;
    this.alpha -= 2;
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

function gotPoses(results) {
  poses = results;
}
