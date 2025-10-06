

function setup() {
 createCanvas(windowWidth, windowHeight);

 rectMode(CENTER);
}

function draw() {
  background("#130f20ff"); 
  noStroke();
  fill("#f6c100ff");

  //loop to form rows.
  for(let y = 0; y < height; y+=100){
    for(let x = 0; x < width; x+=80){

      //frameCount function tutorial on p5js:
      //https://p5js.org/reference/p5/frameCount/
      //noise function tutorial on p5js: 
      //https://p5js.org/reference/p5/noise/
    
    //give shapes some randomness, allow them to change with time
    let t = frameCount * 0.01; // time
    let offsetX = map(noise(x * 0.05, y * 0.05, t), 0, 1, -2, 2); //offset X
    let offsetY = map(noise(100 + x* 0.05, 100 + y * 0.05, t), 0, 1, -2, 2);//offset Y
    let s = map(noise(x * 0.05, y * 0.05, t + 1000), 0, 1, 0.5, 1.2);//scale randomness

    push();
    translate(x + offsetX, y + offsetY); //adding noise to shapes
    translate(50, 50); //move origin to star’s center
    scale(s);
    translate(-50, -50); //move back
    
      //drawingContext tutorial on p5js: 
      //https://p5js.org/reference/#/p5/drawingContext
      //glow Effect tutorial on youtube by Kazuki Umeda: 
      //https://youtu.be/iIWH3IUYHzM?si=JAtReSQtqgGC4JjQ

    if(mouseIsPressed){
      //if mouse is pressed, draw cricles
      fill("#7bfffdff")
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = color("#d3f2f3ff");
      circle(50,50,60);
  
    } else {

      //draw shape:sharp star

      //glow effect
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color("#f1e59fff");
      //if mouse is not pressed, draw stars
      beginShape();
        curveVertex(50,0); //top point
        curveVertex(50,0); //repeat first point to create a sharp corner
        curveVertex(60,40); //control point right top
        curveVertex(90,50); //right point
        curveVertex(60,60); //control point right bottom
        curveVertex(50,100); //bottom point
        curveVertex(40,60); //control point left bottom
        curveVertex(10,50); //left point
        curveVertex(40,40); //control point left top
        curveVertex(50,0); //repeat first point to create a sharp corner
      endShape();
  
      //end shape:sharp star
      }
      pop();
    }
  }
}

