// ===================== Pixel Burger Factory (Random Float Version) =====================
// I decide to create a pixel art style burger generator since burgers are fun and they are easy to built!
// I call inspiration from the odl Zelda game I played where pixel art are used extensively
// to create various objects, characters, and food items.
// I wanted to create something fun and light-hearted for this assignment since
// the previous assignments were all about serious topics like space and planets.

// Each burger is randomly generated with different layers and sizes
// The burgers will float around the screen using Perlin noise for smooth motion
// Click anywhere to generate a new burger at that position

let burgers = []; // Array to store multiple burger objects

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER); // Changed to CORNER for easier pixel drawing
  noStroke();

  // I just feel like it would not feel like a factory without some initial products
  // So I added some initial burgers floating around!
  // Initial few burgers that floarts around
  for (let i = 0; i < 5; i++) {
    burgers.push(new Burger(random(width), random(height)));
  }
}

function draw() {
  background(18, 15, 32);

  // update and display all burgers within the array
  for (let i = 0; i < burgers.length; i++) { 
    burgers[i].update(); // update position and state
    burgers[i].display(); // draw the burgers!
  }

  // some instructions!
  fill(240);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Click for a new BURGERRRR!!", width / 2, height - 24);
}

function mousePressed() {
  burgers.push(new Burger(mouseX, mouseY)); // click to add a new burger at mouse position

}

// ============================ Burger Class =============================
// Each burger has random size, layers, and floats around using noise
// The burger is drawn using small rectangles to create a pixel art effect
// =======================================================================

class Burger {
  constructor(x, y) {
    // random initial position for each burger
    // this is the base position around which it will float
    // the actual position will be floated using noise within update()
    this.baseX = x;
    this.baseY = y;

    // pixel size and width of the burger
    this.pixel = int(random(6, 12)); // size of each single pixel block, int() is used to ensure whole number
    this.pxWidth = int(random(16, 22)); // the width of the burger in pixel blocks
    this.hasCheese = random() < 0.7; // given it a 70% chance to have cheese
    this.hasTomato = random() < 0.6; // given it a 60% chance to have tomato slices

    // the "floaty" noise parameters
    // initial x and y noise positions
    this.nx = random(1000); 
    this.ny = random(2000);
    // speed of how fast the noise is changing
    // controls the smoothness of the floating motion
    this.speedX = random(0.003, 0.006); 
    this.speedY = random(0.002, 0.005);
    // maximum float distance from base position
    // this creates a smooth floating effect
    this.floatX = random(15, 40); 
    this.floatY = random(10, 30);

    // floating effect parameters
    this.swingSeed = random(3000); // given a different seed for each burger to vary their swinging motion
    this.swingSpeed = random(0.01, 0.02); // the speed of swinging
    this.swingAmp = random(0.02, 0.05); // the amplitude of swinging

    // color for different ingredients
    this.colBunTop = color(227, 167, 71); 
    this.colBunBottom = color(214, 145, 54);
    this.colSesame = color(255, 238, 179);
    this.colLettuce = color(115, 196, 84);
    this.colCheese = color(255, 206, 84);
    this.colPatty = color(120, 66, 36);
    this.colTomato = color(227, 73, 66);
    this.sesameCount = int(random(10, 20)); 
    // number of sesame seeds on top bun
    // I decided to randomize this for more variety and interesting look!
    // I decide to have lettuce always present for a healthier burger!
  }

  update() {
    // updating the position using noise function for smooth floating motion
    // use noise to get smooth x and y offsets
    this.nx += this.speedX;
    this.ny += this.speedY;
    // calculating the actual position by a noise-based offset from base position
    this.x = this.baseX + map(noise(this.nx), 0, 1, -this.floatX, this.floatX);
    this.y = this.baseY + map(noise(this.ny), 0, 1, -this.floatY, this.floatY);
    // calculate swinging angle using sin() function for smooth swinging motion!
    // the sin() function allows the angle to swing between(-swingAmp, swingAmp)
    this.angle = sin((frameCount + this.swingSeed) * this.swingSpeed) * this.swingAmp;
  }

  // drawing out the actual burgers now!
  display() {
    push();
    translate(this.x, this.y); // move to the "burger's" position
    rotate(this.angle); // apply the swinging rotation

    let p = this.pixel; // nidividual pixel size
    let w = this.pxWidth; // how many pixels are within one row of burger
    let pad = 2; // padding pixels on each side, creating the feeling of "layers" within the burger
    let yCursor = -6 * p; // drawing from top to bottom, adding current y position to each layer

    this.drawRow(w - pad * 2, yCursor, this.colBunTop, p); // top bun
    yCursor += p; // move down for next layer
    this.drawRow(w - (pad + 1) * 2, yCursor, this.colBunTop, p); // a another top bun layer slightly smaller for rounded effect
    yCursor += p;
    this.drawSesame(w - (pad + 1) * 2, yCursor - 2 * p, p, this.sesameCount); // draw sesame seeds on top bun
    this.drawRow(w - pad * 2, yCursor, this.colLettuce, p); // lettuce layer, its always good for some veggies in your burgers!
    yCursor += p;

    // conditional layers in below
    if (this.hasCheese) {
      this.drawRow(w - (pad - 1) * 2, yCursor, this.colCheese, p); // add a cheese layer if applicable
      yCursor += p;
    }

    this.drawRow(w - (pad - 1) * 2, yCursor, this.colPatty, p); // a patty layer
    yCursor += p;
    this.drawRow(w - (pad - 1) * 2, yCursor, this.colPatty, p); // another patty layer, since I feel like double patties are more attractive.
    yCursor += p;

    if (this.hasTomato) { // add tomato slices if applicable
      this.drawRow(w - pad * 2, yCursor, this.colTomato, p);
      yCursor += p;
    }

    this.drawRow(w - pad * 2, yCursor, this.colBunBottom, p); // bottom bun
    yCursor += p;
    this.drawRow(w - (pad + 1) * 2, yCursor, this.colBunBottom, p); // add a smaller layer of bottom bun for rounded effect

    pop();
  }

  // the function to draw a single row of pixels
  // pxCount: how many pixels in this row
  // yOffset: y position of this row relative to burger center
  // col: color of this row
  // p: size of each pixel block
  drawRow(pxCount, yOffset, col, p) { 
    push();
    fill(col); 
    let totalW = pxCount * p; // total width of this row
    let xStart = -totalW / 2; // starting x position to center the row
    for (let i = 0; i < pxCount; i++) { // draw each pixel block
      rect(xStart + i * p, yOffset, p, p, 2);
    }
    pop();
  }

  // the function to draw sesame seeds on top bun
  // pxCount: how many pixels in the top bun row
  // yOffset: y position of the top bun row
  // p: size of each pixel block 
  // count: number of sesame seeds to draw in this row
  drawSesame(pxCount, yOffset, p, count) {
    push();
    fill(this.colSesame); 
    let totalW = pxCount * p; // total width of the top bun row
    let xStart = -totalW / 2; // starting x position to center the row
    for (let i = 0; i < count; i++) { // draw each sesame seed, randomly positioned
      let idx = int(random(0, pxCount));
      let s = max(3, p * 0.5); // sesame seed size, at least 3 pixels or half of pixel size
      rect(xStart + idx * p + (p - s) / 2, yOffset + (p - s) / 2, s, s, 1);
    }
    pop();
  }
}
// ============================ End of Burger Class =============================
// Juet for myself to remember:
// push() and pop() are used to isolate transformations and styles
// let burgers = [] creates an array to hold multiple burger objects
// burgers.push(...) within mousePressed() adds a new burger to the array 
// within draw(), we loop through all burgers to update and display them
// ==============================================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
