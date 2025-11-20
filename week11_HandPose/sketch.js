/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose; //variable to store the model
let video; // variable to store the webcam video
let hands = []; // array to store hand poses
let pinch = 10000;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  // for (let i = 0; i < hands.length; i++) {
    // let hand = hands[i];
    // for (let j = 0; j < hand.keypoints.length; j++) {
      // let keypoint = hand.keypoints[j];
      // fill(0, 255, 0);
      // noStroke();
      // textSize(20);  
      // fill(0,255, 0);

      // text(j, keypoint.x + 5, keypoint.y - 5);
      // circle(keypoint.x, keypoint.y, 10);
    // }
 //  }

  if(hands.length > 0){ // are there hands being tracked?
    let indexTip = hands[0].keypoints[8]; // stores the index finger tip keypoint
    let thumbTip = hands[0].keypoints[4]; // stores the thumb tip keypoint
    let centerX = lerp(indexTip.x, thumbTip.x, 0.5); // calculate center x position
    let centerY = lerp(indexTip.y, thumbTip.y, 0.5); // calculate center y position

    pinch = dist(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y);
    if(pinch < 20){
      fill("red");
      strokeWeight(10);
    } else {
      noFill();
      strokeWeight(1);
    }
    fill(255, 0, 0);
    noStroke();
    circle(centerX, centerY, pinch); // draw a circle at the center position
  
  }

  // let tint = map(pinch,100,0,0,255);
  // fill(255,tint);
  // rect(0,0,width,height);
}


// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
