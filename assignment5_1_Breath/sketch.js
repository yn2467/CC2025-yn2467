// Var1 ——— Breathing Cube ———
// Visual idea: concentric rounded rectangles expand and contractz smoothly,
// simulating a cube "breathing" with color and scale changes
// I choose an pumpkin color since its almost Halloween :)
// ynB stands for "yichen_Breath"

// define canvas size
let ynB_canvasW = 400;
let ynB_canvasH = 400;

// define variables for breathing animation
let ynB_phase = 0;          // defines current phase of breathing
let ynB_speed = 0.03;       // the speed of breathing animation

// defining colors 
// its kinda weird to define colors since I can just wrote red/green/blue.
let ynB_orange1, ynB_orange2, ynB_green, ynB_bg;

// Setup runs once
function setup(){
  createCanvas(ynB_canvasW, ynB_canvasH);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  ynB_bg       = color(0, 0, 0);       // a black background (projection friendly)
  ynB_orange1  = color(25, 90, 95);    // light orange
  ynB_orange2  = color(15, 95, 75);    // darker orange
  ynB_green    = color(113, 70, 70);   // pumpkin stem green
}

function draw(){
  background(ynB_bg);

  // defining the center of the canvas
  let ynB_centerH = width / 2;
  let ynB_centerV = height / 2;

  // A Sin wave moves back and forth between -1 and 1.
  // It works as a breathing value control, controls the size and color fo the cube
  // I remaped it for smoother interpolation, since 1 and -1 is too extreme
  let ynB_breathe = (sin(ynB_phase) * 0.4 + 0.4);

  // Maximum and minimum rectangle size during breathing
  let ynB_minR = 110; // the minimum size of the cube
  let ynB_maxR = 150; // the maximum size of the cube

  // using lerp function to interpolate size
  // the lerp will go between minR and maxR based on breathing value
  let ynB_currentR = lerp(ynB_minR, ynB_maxR, ynB_breathe); 

  // a lerpColor function to modify color between light and dark orange using breathing value
  // for lerpColor function, I referenced this tutorial online:
  // https://www.youtube.com/watch?v=YjC6DAy6kK4
  // also, on p5js official website:
  // https://p5js.org/reference/#/p5/lerpColor
  // just like lerp(), lerpColor function takes 3 parameters: color1, color2, and amount
  // it returns a color that lerps between color1 and color2 base on a value between 0 and 1.
  // so I use breathing value as the amount parameter to create a smooth color transition effect!
  let ynB_currentFill = lerpColor(ynB_orange1, ynB_orange2, ynB_breathe);

  // I used a for loop to draw multiple cubes with varying sizes and colors
  // this creates a layered effect that enhances the breathing effect
  // the loop loops 8 times to draw 8 cubes
  // each cube size and color is slightly different based on its index in the loop i * 0.75  
  let ynB_ringCount = 8;
  for (let ynB_i = 0; ynB_i < ynB_ringCount; ynB_i++){ // for each ring index from 0 to 7
    let ynB_t = ynB_i / (ynB_ringCount - 1); // a normalized value between 0 and 1 for interpolation
    let ynB_r = ynB_currentR * (0.2 + 0.85 * ynB_t); // the size of each ring

    // Each ring slightly offseted in phase to create a rippled breathing effect
    let ynB_local = (sin(ynB_phase * 1.0 + ynB_i * 0.75) * 0.5 + 0.5); // a separted breathing value for each ring
    let ynB_ringFill = lerpColor(ynB_orange1, ynB_orange2, ynB_local); // color setup for each ring

    fill(ynB_ringFill);
    rectMode(CENTER);
    rect(ynB_centerH, ynB_centerV, ynB_r * 1.12, ynB_r * 1.12, 18);
  }

  // Draw a small inner glowing ellipse (adds heartbeat-like focus)
  let ynB_glowSize = lerp(22, 42, ynB_breathe);
  fill(45, 80, lerp(60, 100, ynB_breathe), 90);
  ellipse(ynB_centerH, ynB_centerV, ynB_glowSize, ynB_glowSize);

  // Kept the entire animation running by adding up each fram within the phase
  ynB_phase += ynB_speed;
}
