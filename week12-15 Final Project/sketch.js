// This project uses ml5.js BodyPose model to detect 
// the left wrist position from a camera input.
// THe basic Idea is when the left wrist moves quickly, 
// a ripple effect is created at the wrist position.
// The ripple will expands and fades out over time.

//After completeting the basic Ripple effect,
//I tuned some parameters to make the effect more visually appealing.
//1. For example, I adjusted the speed threshold to 10,
//1. so that ripples are created only when the wrist moves faster than this value.
//2. I also mapped the ripple growth speed to the initial wrist speed,
//2. so that faster wrist movements create faster expanding ripples.
//3. I also feel like there is too much ripples generating
//3. I set a CD time of 200 ms, which mean 5 ripples per second at most.
//4. Add in both hands.

let video; //store camera input
let poseML5; //store ml5 pose model
let poses = []; //store detected poses

// in order to calculate velocity, we need to store previous positions
let prevLeftWristX = 0; 
let prevLeftWristY = 0; 
let prevRightWristX = 0; 
let prevRightWristY = 0; 

let ripples = []; //array to store ripple objects(from the Ripple class)
let speedThreshold = 10; //threshold, only create ripple if wrist speed exceeds this value

let lastLeftRippleTime = 0; //the time when the last left ripple was created
let lastRightRippleTime = 0; //the time when the last right ripple was created
let rippleCD = 100; //minimum time (in milliseconds) between a ripple creations

function preload() {
  //load bodypose model
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
  background(0);
  translate(width, 0); //mirror the video
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (poses.length > 0) {
   // console.log(poses[0]);
    let leftWrist = poses[0].left_wrist; //getting left wrist position
    if (poses[0].left_wrist && // check if left wrist is detected
        poses[0].left_wrist.confidence > 0.05) { // condition to check confidence level
      // I first used poses[0] itself, which is not a position.
      // poses[0] is the first detected person，keypoints[9] is the left wrist keypoint.
      // .position gets the position object with x and y properties.
      let currentX = leftWrist.x;
      let currentY = leftWrist.y;
      //updatse previous left wrist positions for next frame
      let D = dist(currentX, currentY, prevLeftWristX, prevLeftWristY); //calculate distance moved since last frame
      //console.log("Wrist moved distance: " + D);
      if (D > speedThreshold && //if distance moved is greater than threshold and cooldown time has passed
          millis() > lastLeftRippleTime + rippleCD) {  // doesn current time - last ripple time > cooldown time
        let newripple = new Ripple(currentX, currentY, D); //create new ripple at current wrist position
        ripples.push(newripple); //adding ripple to array
        lastLeftRippleTime = millis(); //update last left ripple creation time
      }
      prevLeftWristX = currentX;
      prevLeftWristY = currentY;
      //this two line of code ensure that in the next frame, we can calculate the distance moved again
    }
    
    //Same for the right hand
    let rightWrist = poses[0].right_wrist; //getting right wrist position
    if (poses[0].right_wrist && 
        poses[0].right_wrist.confidence > 0.05) { // *add && condition for confidence
      let currentX = rightWrist.x;
      let currentY = rightWrist.y;
      //updatse previous right wrist positions for next frame
      let D = dist(currentX, currentY, prevRightWristX, prevRightWristY); //calculate distance moved since last frame
      if (D > speedThreshold && 
          millis() > lastRightRippleTime + rippleCD) {
        //if distance moved is greater than threshold and cooldown time has passed
        let newripple = new Ripple(currentX, currentY, D); //create new ripple at current wrist position
        ripples.push(newripple); 
        lastRightRippleTime = millis(); 
      }
      prevRightWristX = currentX;
      prevRightWristY = currentY;
    }
  }

  // this loop goes backwards, controlling the display and removal of ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    //the loop means start from the last element of the array to the first element
    ripples[i].display();
    if (ripples[i].isFinished()) {
      // splice function is used to remove elements from an array.
      // p5js reference: https://p5js.org/reference/#/p5.Array/splice
      // in this case, when a ripple is finished (alpha <=0), will remove it from the array
      // this is used to prevent the array from growing indefinitely and consuming more memory
      ripples.splice(i, 1); //remove finished ripples from array
    }
  }
}

//creating the Ripple class.
class Ripple {
  //Identifying the properties of a ripple.
  constructor(x, y, initialSpeed) {
    //the center posistion x,y, and the force of the ripple (speed)
    this.x = x;
    this.y = y;
    this.r = 0; //the radius starts from 0
    this.alpha = 255; //initial alpha value, from 0-255

    this.rGrowSpeed = map(initialSpeed, 0, 20, 1, 4);
    //the growth speed of the radius, mapped from the initialSpeed,
    //faster the initial speed, faster the growth speed
  }

  display() {
    if (this.alpha <= 0) {
      return; //if alpha is 0 or less, do not display the ripple
    }
    noFill();
    stroke(255, this.alpha); //a white stroke with the current alpha value
    
    //the water ripple stokr should fade out as it expand.
    //Alpha is used to determine the stroke weight here. Since farther it go less the alpha.
    let currentWeight = map(this.alpha, 0, 255, 1, 20);
    strokeWeight(currentWeight); 
    ellipse(this.x, this.y, this.r * 2);
    this.r += this.rGrowSpeed; //increase the radius by the growth speed
    this.alpha -= 2; //gradually decrease the alpha value to make sure the ripple fades out
  }

  isFinished() {
    return this.alpha <= 0; //check if the ripple is dead (alpha is 0 or less)
  }
}

function gotPoses(results) {
  //storing the detected poses
  poses = results;
}
