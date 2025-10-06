let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  // initialize grid
  for (let y = 0; y < height; y += 100) {
    for (let x = 0; x < width; x += 80) {
      shapes.push({
        x: x + 50,   // center position of shape
        y: y + 50,
        active: false
      });
    }
  }
}

function draw() {
  background("#130f20ff");
  noStroke();

  for (let shape of shapes) {
    // smooth movement
    let t = frameCount * 0.01;
    let offsetX = map(noise(shape.x * 0.05, shape.y * 0.05, t), 0, 1, -2, 2);
    let offsetY = map(noise(100 + shape.x * 0.05, 100 + shape.y * 0.05, t), 0, 1, -2, 2);
    let s = map(noise(shape.x * 0.05, shape.y * 0.05, t + 1000), 0, 1, 0.5, 1.2);

    push();
    translate(shape.x + offsetX, shape.y + offsetY);
    scale(s);

    if (shape.active) {
      // if this shape is active, draw a circle
      fill("#7bfffdff");
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = color("#d3f2f3ff");
      circle(0, 0, 60);
    } else {
      // otherwise draw the star
      fill("#f6c100ff");
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color("#f1e59fff");

      beginShape();
      curveVertex(0, -50);
      curveVertex(0, -50);
      curveVertex(10, -10);
      curveVertex(40, 0);
      curveVertex(10, 10);
      curveVertex(0, 50);
      curveVertex(-10, 10);
      curveVertex(-40, 0);
      curveVertex(-10, -10);
      curveVertex(0, -50);
      curveVertex(0, -50);
      endShape();
    }

    pop();
  }
}

// detect click on individual shape
function mousePressed() {
  for (let shape of shapes) {
    let d = dist(mouseX, mouseY, shape.x, shape.y);
    if (d < 40) {  // radius ~ size of star/circle
      shape.active = !shape.active; // toggle state
      break; // optional: stop after first match
    }
  }
}
