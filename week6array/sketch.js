let x = 0;
let y = 0;
let d = 20;
let speed = 5;
let hue = 20;
let opacity = 127;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  x = width/2;
  y = height/2;
  colorMode(HSB);

  
}

function draw() {
  x = x + random(-speed, speed);
  y = y + random(-speed, speed);
  fill(hue,70,100,opacity);
  circle(x,y,d);
}
