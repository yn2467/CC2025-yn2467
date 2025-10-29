// Var3 ——— Seamless Orange Flowing Gradient ———
// I want to create a smooth, continuously flowing vertical gradient
// that cycles through warm orange hues, with a bright band that moves
// downward over time. The gradient should loop seamlessly.
// ynGrad = "YichenNiu_Gradient"

let ynGrad_w = 400, ynGrad_h = 400;
let ynGrad_phase = 0;      // time
let ynGrad_speed = 0.02;   // scroll speed (the light band moving down)

function setup() {
  createCanvas(ynGrad_w, ynGrad_h);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  // Orange palette (pumpkin-ish range only)
  let hueA = 22;  // deeper orange
  let hueB = 35;  // golden orange

  // Convert phase to a vertical scroll fraction. Negative to move downward.
  let scroll = ynGrad_phase * 0.15; // smaller = slower travel

  for (let y = 0; y < height; y++) {
    
    // This part creates a seamless vertical gradient that scrolls.
    // In my previous version of code, I used:
    // t = (y / height) + (sin(phase) * 0.3);
    // t = t % 1;
    // to kept t within range 0 - 1.

    // However, that caused a jump when t goes from .9999 to 1.0001, returns to 0.0001.
    // Causing a cut, or a disconnection in the gradient flow.
    // I go back really deep to my high school math, where cos2πt is a seamless wave function.
    // It gives exact the same number on both ends of the cycle (t=0 and t=1).

    // Thus, when the value goes from .9999 to 1.0001, it wont cause a jump.
    
    // **I found this seamless function very similar to doing 
    // a walk cycle for my 3D character animation.
    // If the walk cycle is not seamless, 
    // the character will appear to stutter or jump at the loop point.**

    let t = (y / height) - scroll; // base vertical position minus scroll offset
    t = (t % 1 + 1) % 1; // to make sure t is always positive within 0-1

    let cyc0 = 0.5 - 0.5 * cos(2 * PI * t);       // for hue mixing
    let cyc1 = 0.5 - 0.5 * cos(2 * PI * (t+0.2)); // the bright band, phase-shifted

    // Hue stays within orange family, brightness carries the moving "band"
    let h = lerp(hueA, hueB, cyc0);         // warm hue breathing but seamless
    let s = 90;
    let b = lerp(60, 100, cyc1);            // brighter band that moves down

    fill(h, s, b, 100);
    rect(0, y, width, 1); // draw 1-pixel high horizontal strip
  }

  ynGrad_phase += ynGrad_speed; // add up time for each frame
}
