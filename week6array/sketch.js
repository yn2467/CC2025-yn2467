let drunks = [];
let drunkAmount = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  x = width/2;
  y = height/2;
  colorMode(HSB);

  for(i=0; i<drunkAmount; i++){
    let drunkD = random(10,100);
    let drunkSpeed = random(1,7);
    let drunkHue = random(0,60); 
    drunks[i] = new Drunk(width/2,height/2,drunkD,drunkAmount,drunkHue);
  }
}

function draw() {
  for(let i = 0; i<drunks.length; i++){
    drunks[i].move();
    drunks[i].drawDrunk();

  }
  // use customize function with ();
  // Its also using corresponding variable defined in our customize
  // function. Eg.: drunkSpeed = 9, drunkHue = 50, drunkDiameter =50)
}

// customized function
function drawDrunk(drunkSpeed,drunkHue,drunkDiameter){
  x = x + random(-drunkSpeed, drunkSpeed);
  y = y + random(-drunkSpeed, drunkSpeed);
  fill(drunkHue,70,100,opacity);
  circle(x,y,drunkDiameter);
}

// Notes:
// CLASS: factory for objects
// OBJECT: assenblage of variables + functions

class Drunk {
  constructor(x,y,diameter,speed,hue){
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.hue = hue;
    this.opacity = random(0,.4); //you can also initialize variables
  }

  move(){ // you can dclare functions or "methods" like this
    this.x = this.x+random(-this.speed,this.speed);
    this.y = this.y+random(-this.speed,this.speed);

  }

  drawDrunk(){
    fill(this.hue,70,100,this.opacity);
    circle(this.x,this.y,this.diameter);
  }
}