let buttonX = 100;
let buttonY = 100;
let buttonZ = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);
  fill(0,255,0);
  text("x: "+mouseX + " y:"+ mouseY,20,20);
  strokeWeight(1);
  
  //distance is a function tells the distance between 2 points
  let distance = dist(mouseX,mouseY,100,100);
  text("dist: " + distance,20,35);

  stroke(255); //white stroke
  noFill(); // resets fill to none

  if(distance<buttonZ/2){ 
    //is the distance between the mouse and
    //the center of the button LESS THAN the radius?
    fill("#ed1b1bff");
    strokeWeight(3);
  }
  circle(buttonX,buttonY,buttonZ);
}
