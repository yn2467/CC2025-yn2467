// ——— Wave Distortion (Full Canvas Version) ———
// Visual idea: smooth sine waves with noise distortion flow across the entire surface,
// creating a "melting" or "energy surface" illusion that fills the whole canvas.
// ynW stands for "yichen_Wave"

let ynW_canvasW = 400, ynW_canvasH = 400;

// Animation controls
let ynW_phase = 0;          // the same global time variable (phase)
let ynW_speed = 0.025;      // wave motion speed, slightly slower than the breathing animation

let ynW_bgCol;              // background color
let ynW_lineHue = 25;       // base hue (orange tone for Halloween)

let ynW_rowStep = 16;       // the distance between the horizontal wave lines
let ynW_colStep = 8;        // smaller step → smoother the curve vice versa

function setup(){
  createCanvas(ynW_canvasW, ynW_canvasH);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  ynW_bgCol = color(0, 0, 0); // black background for high contrast
}

function draw(){
  background(ynW_bgCol);

  // Pulse color brightness slightly over time
  let ynW_colorPulse = (sin(ynW_phase * 0.8) * 0.5 + 0.5); // pulses between 0 and 1, manipulated by sine wave
  let ynW_brightness = lerp(70, 95, ynW_colorPulse); // the brightness of the wave lines
  stroke(ynW_lineHue, 90, ynW_brightness, 100); 
  // other than using drawingContext for glow, I can also adjust stroke color brightness
  // thus even the animation is gone, the glow effect is still visible to the strokes
  strokeWeight(3);

  // Loop through horizontal wave rows
  // the for loop is used to control each individual wave line's vertical position
  // each wave is drawn from left to right using curveVertex inside beginShape() and endShape()
  for (let ynW_row = 0; ynW_row <= height; ynW_row += ynW_rowStep) { 

    beginShape();

    // Extend curve to cover canvas edges:
    // Add two extra points before 0 and after width
    let ynW_rowPhase = ynW_row * 0.05;

    // Draw one extra “virtual point” before 0
    // This is necessary to make sure the curve starts from the left edge smoothly
    // I started withought this point and found the left edge was not filled properly
    // I struggled for a day trying to figure out why, but I failed to do so.
    // I would have to admit I asked chatGPT for help and it suggested adding this extra point

    // Logic: the original code starts drawing from x=0, 
    // but curveVertex needs a previous point to define the curve properly.
    // By adding a point at -ynW_colStep, the curve can start smoothly from the left edge.
    let ynW_firstX = -ynW_colStep;
    let ynW_firstY = ynW_row + sin(ynW_firstX * 0.04 + ynW_phase + ynW_rowPhase) * 20;
    curveVertex(ynW_firstX, ynW_firstY);

    // Generating the main body fo the wave lines
    for (let ynW_col = 0; ynW_col <= width + ynW_colStep; ynW_col += ynW_colStep) {

      // Animated amplitude, the size of the wave goes up and down over time
      let ynW_amp = lerp(8, 28, (sin(ynW_phase * 0.7) * 0.5 + 0.5));

      // Vertical movement based on sine function, creating the wave effect
      let ynW_waveOffset = sin(ynW_col * 0.04 + ynW_phase + ynW_rowPhase) * ynW_amp;

      // Add subtle organic noise distortion, I really found this made a big difference visually
      // the meaning of 0.5 is to center the noise around zero, so it can go both positive and negative
      // the value 14 is the maximum offset distance caused by noise
      let ynW_noiseJitter = (noise(0.015 * ynW_col, 0.015 * ynW_row, ynW_phase) - 0.5) * 14;

      let ynW_x = ynW_col;
      let ynW_y = ynW_row + ynW_waveOffset + ynW_noiseJitter;

      curveVertex(ynW_x, ynW_y); // this step is to actually draw the curve point
    }

    // Same as above, adding one more “virtual point” beyond right edge to make sure it fills completely
    // this part is given by chatGPT as well. 
    let ynW_lastX = width + ynW_colStep;
    let ynW_lastY = ynW_row + sin(ynW_lastX * 0.04 + ynW_phase + ynW_rowPhase) * 20;
    curveVertex(ynW_lastX, ynW_lastY);

    endShape();
  }

  // An overlay of a layer of transparent rectangles
  // this creates a fading trail effect similar to motion blur, which I really enjoyed.
  noStroke();
  fill(ynW_lineHue, 100, 100, 8);
  rect(0, 0, width, height);

  // Advance animation phase
  ynW_phase += ynW_speed;
}
