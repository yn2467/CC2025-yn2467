

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  //ANY transofrmation are reset
  //at the beginning of draw()
  background("#000000");

  circle(100,100,100);
  circle(85,90,5);
  circle(115,90,5);
  arc(100,100,50,50,0,PI);

  //Translate is to move the origin point 
  // to another position
  // The new set of coordinates now become
  // (0,0) at the new position
  
  //push and pop isolates the transformation
  //Anything enclosed whitin push and pop
  //only affects the shapes within the enclosure
  push(); //push indicates the begging of an isolated block
  fill("yellow");
  translate(width/2, height/2);
  let agnle;
  //map is a function that scales
  //a number from one range to another range
  //1: input vairable to scale
  //2: min of input variable
  //3: MAX of input variable
  //4: min of output variable
  //5: MAX of output variable
  angle = map(mouseX,0,width,0,360);
  rotate(radians(angle));
  
  let scaleFactor;
  scaleFactor = map(mouseY,0,height,0.1,3);

  //scale ames the coordinate system larger or smaller
  //it takes a "factor" as a parameter
  //if you supply 2 parametersm it scales diffrently
  //in X and Y direction
  scale(scaleFactor);
  circle(0,0,100);
  circle(-15,-10,5);
  circle(15,-10,5);
  arc(0,0,60,60,0,PI);
  pop(); //pop indicates the end of an isolated block

  push();
  rotate(radians(mouseX));
  stroke("white");
  strokeWeight(4);
  line(0,0,100,0);
  pop();


  text(mouseX + "," + mouseY,5,15);
  textSize(15);
  fill(color = '#ffffff');
} 
