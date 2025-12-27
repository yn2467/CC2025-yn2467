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

  if (poses.length > 0) {
    if (poses[0].left_wrist) {
      let leftWrist = poses[0].left_wrist;
      console.log(leftWrist);
      let currentX = leftWrist.x;
      let currentY = leftWrist.y;

      let D = dist(currentX, currentY, prevLeftWristX, prevLeftWristY);
      if (D > speedThreshold) {
        let newripple = new Ripple(currentX, currentY, D);
        ripples.push(newripple);
        console.log(
          "New ripple created at (" +
            currentX +
            ", " +
            currentY +
            ") with speed " +
            D
        );
      }

      prevLeftWristX = currentX;
      prevLeftWristY = currentY;
    }
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].display();
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }
}

class Ripple {
  constructor(x, y, initialSpeed) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.alpha = 255;

    this.rGrowSpeed = map(initialSpeed, 0, 20, 2, 10);
  }

  display() {
    if (this.alpha <= 0) {
      return;
    }
    noFill();
    stroke(255, this.alpha);
    strokeWeight(3);
    ellipse(this.x, this.y, this.r * 2);
    this.r += this.rGrowSpeed;
    this.alpha -= 1;
  }

  isFinished() {
    return this.alpha <= 0;
  }
}

function gotPoses(results) {
  poses = results;
}
