

function setup() {
 createCanvas(windowWidth, windowHeight);

 rectMode(CENTER);
}

function draw() {
  background("#130f20ff"); 
  noStroke();
  fill("#f6c100ff");

  for(let y = 0; y < height; y+=100){
    for(let x = 0; x < width; x+=80){

    //give stars some randomness
    let offsetX = random(-1, 1);
    let offsetY = random(-1, 1);

    push();
    translate(x+offsetX,y+offsetY);
    
    if(mouseIsPressed){
      fill("#7bfffdff")
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = color("#d3f2f3ff");
      circle(x+offsetX,y+offsetY,20);
  
    } else {
      
      //draw shape:sharp star
      //drawingContext tutorial on p5js: 
      //https://p5js.org/reference/#/p5/drawingContext
      //glow Effect tutorial on youtube by Kazuki Umeda: 
      //https://youtu.be/iIWH3IUYHzM?si=JAtReSQtqgGC4JjQ

      //glow effect
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color("#f1e59fff");
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
      pop();
      //end shape:sharp star
      }
    }
  }
}

