let harry; // THIS iS A VARIABLE to STORE my OBJECT
let samantha; //THIS WILL STORE ANOTHER OBJECT

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  x = width / 2;
  y = height / 2;
  colorMode(HSB);

  harry = new Drunk(width / 2, height / 2, 30, 3, 180);
  samantha = new Drunk(width / 2, height / 2, 30, 3, 210);
}

function draw() {
  harry.move();
  harry.drawDrunk();
  samantha.move();
  samantha.drawDrunk();
  // use customize function with ();
  // Its also using corresponding variable defined in our customize
  // function. Eg.: drunkSpeed = 9, drunkHue = 50, drunkDiameter =50)
}

// customized function
function drawDrunk(drunkSpeed, drunkHue, drunkDiameter) {
  x = x + random(-drunkSpeed, drunkSpeed);
  y = y + random(-drunkSpeed, drunkSpeed);
  fill(drunkHue, 70, 100, opacity);
  circle(x, y, drunkDiameter);
}

// Notes:
// CLASS: factory for objects
// OBJECT: assenblage of variables + functions

class Drunk {
  constructor(x, y, diameter, speed, hue) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.hue = hue;
    this.opacity = random(0, 0.4); //you can also initialize variables
  }

  move() {
    // you can dclare functions or "methods" like this
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }

  drawDrunk() {
    fill(this.hue, 70, 100, this.opacity);
    circle(this.x, this.y, this.diameter);
  }
}
