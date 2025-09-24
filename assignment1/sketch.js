function setup() {
  createCanvas(615, 750);
  background("rgba(190, 173, 140, 1)"); // background color
}

function canvasResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //drawing the biggest triangle
  noStroke();
  fill("rgba(153, 244, 229, 0.5)");
  beginShape();
  vertex(width/2-145, height/2-230);
  vertex(width/2+200, height/2);
  vertex(width/2-140, height/2+200);
  endShape(CLOSE);

  //drawing the main circle
  noStroke();
  fill("rgba(0, 93, 235,1)");
  circle(width/2+130, height/2+100, 180);

  //drawing bottom left shapes
  //bottom left orange shape
  noStroke();
  beginShape();
  fill("rgba(232, 95, 31, 1)");
  vertex(width/2-170, height/2+110);//right bottom
  vertex(width/2-210,height/2+80);//left bottom
  vertex(width/2-190,height/2+60);//left top
  vertex(width/2-140,height/2+97);//right top
  endShape(CLOSE);

  //bottom left dark brown shape
  noStroke();
  fill("rgba(68, 37, 2, 1)");
  beginShape();
  vertex(width/2-220, height/2+80);//left bottom
  vertex(width/2-210,height/2+70);//left top
  vertex(width/2-110,height/2+150);//right top
  vertex(width/2-120,height/2+160);//right bottom
  endShape(CLOSE);

  //bottom left light brown shape
  noStroke();
  beginShape();
  fill("rgba(181,120,74, 1)");
  vertex(width/2-200, height/2+150);//left bottom
  vertex(width/2-210,height/2+140);//left top
  vertex(width/2-100,height/2+40);//right top
  vertex(width/2-90,height/2+50);//right bottom
  endShape(CLOSE);

  //drawing the top left shapes
  //top left green shape
  noStroke();
  fill("rgba(34, 85, 38, 1)");
  beginShape();
  vertex(width/2-240, height/2-50);//left top
  vertex(width/2+25, height/2-160);//right bottom
  vertex(width/2+50, height/2-90);//right top
  vertex(width/2-210, height/2+20);//left bottom
  endShape(CLOSE);

  //I learned to use rotate and translate functions to roatate the shapes.
  //rotate funciton link: https://p5js.org/reference/p5/rotate/
  //translate function link: https://p5js.org/reference/#/p5/translate
  //pop" and "push" function link: https://p5js.org/reference/#/p5/push
  //tutorial on rotate and translate: https://www.youtube.com/watch?v=o9sgjuh-CBM

  //top left dark blue shape
  noStroke();
  fill("rgba(2, 30, 56, 1)");
  let bx = width/2-250; //center position X
  let by = height/2-150; //center position Y
  let bw = 100;//width of shape
  let bh = 100;//height of shape
  let bAngle = -30;//rotate angle

  push(); // Start a new drawing state
  translate(bx, by);//making the center of shape the origin
  rotate(radians(bAngle));//rotate the shape
  rect(0, 0, bw, bh);//draw the shape
  pop(); // Restore original state
  
  //top left red small rectangle
  noStroke();
  fill("rgba(163, 34, 27, 1)");
  let bx1 = width/2-100; //center position X
  let by1 = height/2-70; //center position Y
  let bw1 = 50;//width of shape
  let bh1 = 60;//height of shape
  let bAngle1 = -25;//rotate angle
  push(); // Start a new drawing state
  translate(bx1, by1);//making the center of shape the origin
  rotate(radians(bAngle1));//rotate the shape
  rect(0,0,bw1,bh1);//draw the shape
  pop(); // Restore original state

  //drawing the top right shapes
  //drawing the top right brown long rectangle
  noStroke();
  fill("rgba(50, 25, 20, 1)");
  let bx2 = width/3+300; 
  let by2 = height/2-250; 
  let bw2 = 35;
  let bh2 = 300;
  let bAngle2 = 40;

  push();
  translate(bx2, by2);
  rotate(radians(bAngle2));
  rect(0,0,bw2,bh2);
  pop();
  
  //drawing the top right orange rectangle
  noStroke();
  fill("rgba(229, 162, 28, 1)");
  let bx4 = width/3+280; 
  let by4 = height/2-200; 
  let bw4 = 55;
  let bh4 = 80;
  let bAngle4 = 40;
  push();
  translate(bx4, by4);
  rotate(radians(bAngle4));
  rect(0,0,bw4,bh4);
  pop();

  //drawing the top right small black rectangle
  noStroke();
  fill("rgba(0, 0, 0, 1)");
  let bx3 = width/3+240; 
  let by3 = height/2-140; 
  let bw3 = 25;
  let bh3 = 200;
  let bAngle3 = 40;
  push();
  translate(bx3, by3);
  rotate(radians(bAngle3));
  rect(0,0,bw3,bh3);
  pop();
  

  //drawing the lower right bottom shapes
  //drawing the lower right bottom red rectangle
  noStroke();
  fill("rgba(176, 11, 11, 1)");
  let bx5 = width/3+50; 
  let by5= height/2+230; 
  let bw5 = 15;
  let bh5 = 80;
  let bAngle5 = -60;
  push();
  translate(bx5, by5);
  rotate(radians(bAngle5));
  rect(0,0,bw5,bh5);
  pop();

  //drawing the lower right bottom shapes
  noStroke();
  fill("rgba(0, 0, 0, 1)");
  let bx6 = width/3+80; 
  let by6= height/2+260; 
  let bw6 = 15;
  let bh6 = 200;
  let bAngle6 = -60;
  push();
  translate(bx6, by6);
  rotate(radians(bAngle6));
  rect(0,0,bw6,bh6);
  pop();
  
  //drawing the small black square at the bottom
  noStroke();
  fill("black");
  rect(width/2-275, height/2+200, 30, 30);

}
