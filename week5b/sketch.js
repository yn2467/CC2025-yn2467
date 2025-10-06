let circleD = 25;

//x axis variable;

let circleX;
let thetaX = 0;
let radiusX = 100;

//y aixs variable:

let circleY;
let thetaY = 0;
let radiusY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width/2;
  circleY = height/2;
}

function draw() {
  background(0,30);
  stroke("white");
  strokeWeight(2);

  circleX = cos(radians(thetaX))*100;
  thetaX++;;

  //thetaX = thetaX +1
  translate(width/2,height/2);
  noFill();
  stroke("red");
  circle(circleX,0,25);

  stroke("green");
  circleY = sin(radians(thetaY))*radiusY;
  circle(0,circleY,25);
  thetaY++;;

  for(let i = 0; i < 12; i++){
    let theta = i*(360/12);
    let radius = 100;
    let x = cos(radians(theta))*radius;
    let y = sin(radians(theta))*radius;
    circle(x,y,circleD);
  }
}
