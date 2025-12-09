let video; //store camera input
let poseML5; //store ml5 pose model
let poses=[]; //store detected poses

// in order to calculate velocity, we need to store previous positions
let prevLeftWristX = 0; //previous x position of left wrist
let prevLeftWristY = 0; //previous y position of left wrist

let width = windowWidth;
let height = windowHeight;

let ripples = []; //array to store ripple objects(from the Ripple class)
let speedThreshold = 10; //threshold, only create ripple if wrist speed exceeds this value

function preload() { //load bodypose model
  poseML5 = ml5.bodyPose();
}

function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size (width, height);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  console.log("PoseNet initialized. Waiting for detection.");
}

function draw() {
  image(video, 0, 0, width, height);

  if (poses.length > 0) {
    let leftWrist = poses[0].keypoints[9].position; //getting left wrist position
    // I first used poses[0] itself, which is not a position.
    // poses[0] is the first detected person，keypoints[9] is the left wrist keypoint.
    // .position gets the position object with x and y properties.
    let currentX = leftWrist.x;
    let currentY = leftWrist.y;

    //update previous wrist positions for next frame
    let D = dist(currentX, currentY, prevLeftWristX, prevLeftWristY); //calculate distance moved since last frame
    if (D > speedThreshold) { //if distance moved is greater than threshold
      let newripple = new Ripple(currentX, currentY, D); //create new ripple at current wrist position
      ripples.push(newripple); //adding ripple to array
    }
    prevLeftWristX = currentX;
    prevLeftWristY = currentY;
    //this two line of code ensure that in the next frame, we can calculate the distance moved again
  }
  //
  for (let i = ripples.length -1; i >=0; i--){
    ripples[i].display(); 
    if (ripples[i].isFinished()){
      // splice function is used to remove elements from an array.
      // p5js reference: https://p5js.org/reference/#/p5.Array/splice
      // in this case, when a ripple is finished (alpha <=0), will remove it from the array
      // this is used to prevent the array from growing indefinitely and consuming more memory
      ripples.splice(i, 1); //remove finished ripples from array
    }
  }
}

function gotPoses(results){ //storing the detected poses
  poses = results;
  console.log("Pose Detected!");
}

//creating the Ripple class. 
class Ripple {
  //Identifying the properties of a ripple.
  constructor(x, y, initialSpeed) { //the center posistion x,y, and the force of the ripple (speed)
    this.x = x;
    this.y = y;
    this.r = 0; //the radius starts from 0
    this.alpha = 255; //initial alpha value, from 0-255
    
    this.rGrowSpeed = map(initialSpeed, 0, 50, 2, 10); 
    //the growth speed of the radius, mapped from the initialSpeed,
    //faster the initial speed, faster the growth speed
  }
  
  display() {
    if (this.alpha <= 0) {
      return; //if alpha is 0 or less, do not display the ripple
    }
    noFill();
    stroke(255, this.alpha); //a white stroke with the current alpha value
    strokeWeight(3);
    ellipse(this.x, this.y, this.r * 2);
    this.r += this.rGrowSpeed; //increase the radius by the growth speed
    this.alpha -= 1; //gradually decrease the alpha value to make sure the ripple fades out
  }

  isFinished() {
    return this.alpha <= 0; //check if the ripple is dead (alpha is 0 or less)
  }
}

