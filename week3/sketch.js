
let cricleSize = 125; // variable to store circle size

function setup() { // setup function, runs once
  createCanvas(400, 500);
  cricleSize = width/4; // set circle size to a quarter of canvas width

}

function draw() {
  // background(127);
  // background("rgba(0,0,0)"); for a color picker
  background("rgba(38, 61, 37, 1)"); // background color
  
  // creat checker background
  noStroke();
  fill("rgba(73, 143, 54, 0.88)");
  rect(0,0,width/2,height/2);
  
  rect(width/2,height/2,width,height);

  // stroke and fill change the color of drawn shapes
  fill("rgba(199, 233, 7, 0.88)"); // picking color for fill
  strokeWeight(5); // Storke weight by 5
  stroke("rgba(108, 45, 196, 1)"); // picking color for stoke

  // noStroke(); disable stroke
  // noFill(); disable fill

  // circle takes 3 parameters: x, y, diameter
  circle(250,250,cricleSize); 
  
  // setting a new fill for my rectangle
  fill("rgba(245, 10, 166, 0.88)"); // picking color for rectangle
  stroke("rgba(177, 245, 5, 1)"); // picking color for rectangle stroke
  strokeWeight(28); // Storke weight by 28
  // rect takes 4 parameters: x, y, width, height
  rect(100,300,40,120); 
  fill("rgba(14, 56, 223, 0.88)"); // picking color for ellipse
  stroke("rgba(192, 14, 37, 0.88)"); // picking color for ellipse stroke
  strokeWeight(2); // Storke weight by 2
  // ellipse takes 4 parameters: x, y, width, height
  ellipse(200,100,200,80); 
  // line connects two points (x1, y1) and (x2, y2)
  line(230,120,300,500);


  noFill();
  stroke("rgba(246, 119, 1, 0.88)");
  strokeWeight(10);
 
  //beginShape() and endShape() to create a custom shape
  //any vertices in between are connected by lines
  //will be rendered as points in a polygon
  beginShape();
  vertex(300, 200); //left top
  vertex(400, 320); //right top
  vertex(350, 450); //right bottom
  vertex(250, 450); //left bottom
  vertex(200, 320); //left middle
  endShape(CLOSE); //CLOSE connects the last and first vertex

  fill("rgba(18, 230, 120, 0.96)");
  circle(width/2,height*0.75,width/2.75);

  fill("rgba(19, 216, 241, 0.88)");
  stroke("rgba(244, 238, 162, 0.88)");
  strokeWeight(4);
  ellipse(mouseX,mouseY,mouseX/3,mouseY/3)

  // arc are like ellipses, except they have two extra parameters
  arc(width/2, height*0.75,75,100,100,radians(30),radians(330),PIE);

}