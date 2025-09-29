

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //iteration operators:
  //i++: adds 1 to i
  //i--: subtracts 1 from i
  //i+=2: adds 2 to i
  //i-=2: subtracts 2 from i

  for(let i = 0; i<10; i++){
    console.log(i);
  }
}

function draw() {
  background(220);

  push();
  //everthing within this push/pop block
  //will be centered, with 0,0 as the center
  translate(100,100);

  strokeWeight(3);
  fill("#c6f9f8ff");
  circle(0,0,100);
  circle(-10,-15,10);
  circle(15,-10,10);
  arc(0,0,50,50,0,PI);
  pop();
}
