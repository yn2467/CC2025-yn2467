

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

  for(let x = 50; x<width-50; x+=100){
    circle(x,50,100);
  
  push();
  //everthing within this push/pop block
  //will be centered, with 0,0 as the center
  translate(x,50);

  strokeWeight(3);
  fill("#c6f9f8ff");
  circle(0,0,100);
  circle(-10,-15,10);
  circle(15,-10,10);
  let happiness = map(x,0,width,-25,25);
  arc(0,0,50,50,radians(0-happiness),radians(180+happiness));
  pop();
  }
}
