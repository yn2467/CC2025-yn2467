// I want to creat a solar clock, representing the speed and time cost
// for all planets whithin the solar system. 
// There are 2 key funtions that I implemented, one is how each planet moves
// according to hours,day,and years, another is the speed up and down function.
// Earth days are used as a standard unit

// Here I want to set up basic definitions of my codes, where moset of the 
// defs here will be used in later codes.

//FIELDS:
let cx, cy;                 // the center of canvas
let simDays = 0;            // time simulation, unit = days
let baseDaysPerFrame = 0.2; // time that past per each frame, unit = days
let speedMult = 1;          // speed multiplier
let paused = false;         // indicate paused or not
let showOrbits = true;      // show the orbit graph or not

// Even though we have not learned yet, but in order to control each planet
// individually, I have to use an array to store their data seperately. 
// I got this idea from my highschool AP Java course... I have to relearn it
// since its a old memory of mine.

// The youtube tutorial for array I watched 
// by The Coding Train: https://www.youtube.com/watch?v=VIQoUghHSxU

// In below are arrays of solar names, their size on canvas, and their revolve periods. 
// Revolve periods in days are given by chatGPT, reference to
// NASA Planetary Fact Sheet: https://science.nasa.gov/solar-system/planets/.
let names   = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"];
let radii   = [       60,     90,    120,   150,      200,     240,     280,     320 ];
let periodD = [   87.969,224.701,365.256,686.980,4332.589,10759.22, 30688.5,   60182 ];

function setup(){
  createCanvas(windowWidth, windowHeight);
  // calculating center of x and y axis
  cx = width / 2;
  cy = height / 2;
  // set up the fonts
  textFont("monospace");
  textSize(12);
}

function draw(){
  background(12);

  // 1. making the center of canvas the location of sun
  translate(cx, cy);

  // 2. draw the sun
  // The glow effect I had explained in my last assignment and
  // in class.
  noStroke();
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color("#ffae00ff");
  fill(255, 180, 40);
  ellipse(0, 0, 24, 24);

  // 3. draw out all orbits
  if (showOrbits){
    noFill();
    stroke(80);
    // drawing out each orbit for each planets. The diameter 
    // of each orbit will be limited by the preset radii.
    for (let i = 0; i < radii.length; i++){
      ellipse(0, 0, radii[i]*2, radii[i]*2);
      drawingContext.shadowBlur = 40;
      drawingContext.shadowColor = color("#5e82ebff");
    }
  }

  // 4. draw all the planets
  
  // ***KEY STEP***
  // This loop is the key, controlling the planet's movement. 
  // All notes below is for me myself to better remembering the code.
  //-----------------------------------------------------------------------------
  for (let i = 0; i < names.length; i++){
    // doing all following code for each planets within this array "names"
    // when i < the number of names, keep going until go through all of them
    
    let P = periodD[i];              
    // get the revolved period of each planet
    
    let R = radii[i];               
    // get the planet's radius
    
    let laps = simDays / P;          
    // *IMPORTANT* simdays is how many days have past. Where P is how many days
    // it take for the planet to rotate a full lap.
    // SO simDays/P = how many laps had it rotated.
    // eg.: simDays = 365 for earth is 1 lap in total
    
    let progress = laps % 1;      
    // %1 here means get the value after decimals, since I only care about the
    // pencentage. laps = 3.27 after % 1 gives me .27. Which indicates it
    // had passed 27% of this current lap.
    
    let ang = TWO_PI * progress;   
    // this is to calculate the angle of planet.
    // 2 PI indicates 360 degree, multiplied by progress, given its current angle

    let x = R * cos(ang);
    let y = R * sin(ang);
    // converting current angle and radius into specific coordinates.
    // I understand this like drawing a circle on paper, "R" is the size
    // of the circle, "ang" is a position on the circle, and 
    // "cos(ang)"/"sin(ang" calculates the current x and y coordinates.
    // with every frame, the coordinate is refreshed, therefore creating
    // the animation.

    // the ellipse circles
    noStroke();
    let size = (i >= 4) ? 10 : 8;
    fill(180 + i*8, 200 - i*10, 255 - i*12);
    ellipse(x, y, size, size);

    // info above all planets (year, day, hrs)
    let totalyears = simDays/365;
    let totaldays  = simDays;
    let totalhours = simDays * 24.0;
    let whole = int(laps);
    let pct   = nf(progress * 100, 1, 1) + "%";

    // label location, a little next to each planet
    let tx = x + 12 * cos(ang);
    let ty = y + 12 * sin(ang);

    fill(230);
    noStroke();
  
    let info1 = names[i] + "  " 
              + nf(totalyears,1,2) + "Y / " 
              + nf(totaldays,1,2)  + "D / " 
              + nf(totalhours,1,2) + "Hr";
    let info2 = "rotated " + whole + " laps; current lap: " + pct;

    // add label info next to the planets
    text(info1, tx + 6, ty - 8);
    text(info2, tx + 6, ty + 8);

    // draw thr strokes indicates each planet
    // making it more obvious which info belongs to which planet
    // I lost myself finding how to make the line perfectly 
    // pointing the label while the planet is rotating, I decide to 
    // go with this for now.
    stroke(300);
    line(x, y, tx, ty);
  }
  //-----------------------------------------------------------------------------
  
  // 5. drawing the status bar above
  // need to move the center back to left top corner
  push(); 
  translate(-cx, -cy); // translate
  fill(220);
  noStroke();
  textSize(16);
  text("THE Solar Clock", 16, 24);


  textSize(12);
  // Reference all info from prviouse definitions. 
  let stepInfo = paused ? "pause" : (baseDaysPerFrame * speedMult).toFixed(3) + " day/f";
  text("speed: " + nf(speedMult,1,2) + "x |  " + stepInfo, 16, 46);
  text("CONTROLS: ↑SPEED_UP  ↓SPEED_DOWN  SPACE:PAUSE  R:RESET", 16, 66);
  pop();
  

  // 6. time Continues (if the scene is not paused)
  if (!paused){
    simDays += baseDaysPerFrame * speedMult;
  }
}

// 7. Keyboard control
// I want to use Keyboard control my speedUP and speedDOWN function.
// I have a previous knowledge of key control function in Python,
// therefore I believe key control function must exist within p5js.
// I looked up keyPressed() function within p5js library. Link is down below
// keyCode function on p5js: https://p5js.org/reference/p5/keyCode/
function keyPressed(){
  if (keyCode === UP_ARROW){
    if (speedMult < 1024) speedMult *= 2; // I set a maximum of 1024x of speed
  } 
  else if (keyCode === DOWN_ARROW){
    if (speedMult > 0.125) speedMult /= 2; // Also, minimum of 0.125x
  } 
  else if (key === ' '){ // if space bar is pressed, then pause
    paused = !paused; 
  } 
  else if (key === 'R' || key === 'r'){ //reset the entire scene using R key
    // Never forget to reset everything into default after reset
    simDays = 0;
    speedMult = 1;
    paused = false;
  }
}
