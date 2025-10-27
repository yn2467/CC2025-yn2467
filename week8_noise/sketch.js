let noisePosition = 0;
let noiseSpeed = 0.005;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

// when you resest the p5js window, a new noise graph
// will be generated based on a new seed value

function draw() {
  background(0);
  //translate(width/2, height/2);
  //circleD = noise(noisePosition)*width;
  //circle(width/2,height/2,circleD);
  //noisePosition = noisePosition + noiseSpeed;

  noisePosition = startingPoint;
  for(let i=0; i<width; i++){
    let y = noise(noisePositioni)*height;
    noisePosition = noisePosition + noiseSpeed;
    let d = map(i,0,width,10,100);
    circle(i,y,d);
  }
  startingPoint = startingPoint + noiseSpeed;
}

function mousePressed(){

}