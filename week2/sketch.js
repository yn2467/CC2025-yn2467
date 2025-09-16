

function setup() {
  createCanvas(600,600); // Create a canvas that fills the window
  background(185,242,78); // Set the background color
  
}

function draw() {
  strokeWeight(weight=3); // Set the stroke weight
  fill(255,73,33); // Set the fill color to red
  stroke(0,222,33); // Set the stroke color to green
  circle(150,100,40); // Draw a circle
  
  stroke(0,222,33); // Set the stroke color to green
  noFill(); // Disable fill for the next shape
  circle(50+150,100,40); // Draw a circle without fill

  stroke(0,223,233); // Set the stroke color to green
  noFill(); // Disable fill for the next shape
  circle(50+150,100+100,150); // Draw a circle without fill

  stroke(248,222,116); // Set the stroke color to yellow
  strokeWeight(weight=10); // Set the stroke weight
  fill(243,22,200); // Set the fill color to purple
  triangle(300,300,400,300,350,200); // Draw a triangle
  
  noStroke(); // Set the stroke color to yellow
  fill(23,0,200); // Set the fill color to purple
  triangle(300-100,300+200,400+300,300-200,350,200+100); // Draw a triangle

  strokeWeight(weight=1); // Set the stroke weight
  fill(33,150,243); // Set the fill color to blue
  stroke(248,30,22); // Set the stroke color to purple
  rect(200,250,100,150); // Draw a rectangle
  
  strokeWeight(weight=1); // Set the stroke weight
  noFill(); // Disable fill for the next shape
  stroke(20,200,3); // Set the stroke color to purple
  rect(200+30,250-90,150,70); // Draw a rectangle
}
