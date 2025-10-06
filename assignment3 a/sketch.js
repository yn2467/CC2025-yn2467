// I want to creat a solar clock, representing the speed and time cost
// for all planets whithin the solar system. 
// There are 2 key funtions that I implemented, one is how each planet moves
// according to hours,day,and years, another is the speed up and down function.
// Earth days are used as a standard unit

let cx, cy;                 // the center of canvas
let simDays = 0;            // time simulation, unit = days
let baseDaysPerFrame = 0.2; // time that past per each frame, unit = days
let speedMult = 1;          // speed multiplier
let paused = false;         // indicate paused or not
let showOrbits = true;      // show the orbit graph or not

// Even though we have not learned yet, but in order to control each planet
// individually, I have to use an array to store their data seperately. 
// The youtube tutorial for array I watched 
// by The Coding Train: https://www.youtube.com/watch?v=VIQoUghHSxU

// In below are arrays of solar names, their size on canvas, and their revolve periods. 
// Revolve periods in days are given by chatGPT, reference to
// NASA Planetary Fact Sheet: https://science.nasa.gov/solar-system/planets/.
let names   = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"];
let radii   = [   60,       90,     120,     150,      200,       240,      280,       320 ];
let periodD = [ 87.969,  224.701, 365.256, 686.980, 4332.589, 10759.22, 30688.5,   60182 ];

function setup(){
  createCanvas(800, 800);
  // calculating center of x and y axis
  cx = width / 2;
  cy = height / 2;
  // set up the fonts
  textFont("monospace");
  textSize(12);
}

function draw(){
  background(12);

  // —— 1. 把坐标原点移到画布中心，让(0,0)是太阳位置 ——
  translate(cx, cy);

  // —— 2. 绘制太阳 ——
  noStroke();
  fill(255, 180, 40);
  ellipse(0, 0, 24, 24);

  // —— 3. 可选：绘制所有轨道圈 ——
  if (showOrbits){
    noFill();
    stroke(80);
    for (let i = 0; i < radii.length; i++){
      ellipse(0, 0, radii[i]*2, radii[i]*2);
    }
  }

  // —— 4. 绘制所有行星 ——
  for (let i = 0; i < names.length; i++){
    let P = periodD[i];              // 公转周期（天）
    let R = radii[i];                // 轨道半径
    let laps = simDays / P;          // 已经转了多少圈
    let progress = laps % 1;         // 当前圈进度 0~1
    let ang = TWO_PI * progress;     // 当前角度

    let x = R * cos(ang);
    let y = R * sin(ang);

    // 行星点
    noStroke();
    let size = (i >= 4) ? 10 : 8;
    fill(180 + i*8, 200 - i*10, 255 - i*12);
    ellipse(x, y, size, size);

    // 标签
    let years = P / 365.0;
    let days  = P;
    let hours = P * 24.0;
    let whole = int(laps);
    let pct   = nf(progress * 100, 1, 1) + "%";

    // 标签位置（行星外侧一点）
    let tx = x + 12 * cos(ang);
    let ty = y + 12 * sin(ang);

    fill(230);
    noStroke();
    textAlign(LEFT, CENTER);
    let info1 = names[i] + "  " 
              + nf(years,1,2) + "年 / " 
              + nf(days,1,2)  + "天 / " 
              + nf(hours,1,0) + "小时";
    let info2 = "已转 " + whole + " 圈   当前圈进度 " + pct;

    // 标签两行文字
    text(info1, tx + 6, ty - 8);
    text(info2, tx + 6, ty + 8);

    // 连线
    stroke(120);
    line(x, y, tx, ty);
  }

  // —— 5. 画顶部状态栏（要回到左上角坐标系） ——
  // 因为我们现在的原点在中心，要回到左上角就反向平移
  push(); // 保存当前中心坐标系
  translate(-cx, -cy); // 相当于回到左上角坐标
  fill(220);
  noStroke();
  textSize(16);
  text("THE Solar Clock", 16, 24);

  textSize(12);
  let stepInfo = paused ? "pause" : (baseDaysPerFrame * speedMult).toFixed(3) + " day/f";
  text("speed: " + nf(speedMult,1,2) + "x |  " + stepInfo, 16, 46);
  text("CONTROLS: ↑SPEED_UP  ↓SPEED_DOWN  SPACE:PAUSE  R:RESET", 16, 66);
  pop(); // 恢复回中心坐标
  

  // —— 6. 时间推进（如果没暂停） ——
  if (!paused){
    simDays += baseDaysPerFrame * speedMult;
  }
}

// —— 7. 键盘控制 ——
// ↑ 加速、↓ 减速、空格 暂停/继续、R 重置
function keyPressed(){
  if (keyCode === UP_ARROW){
    if (speedMult < 1024) speedMult *= 2;
  } 
  else if (keyCode === DOWN_ARROW){
    if (speedMult > 0.125) speedMult /= 2;
  } 
  else if (key === ' '){
    paused = !paused;
  } 
  else if (key === 'R' || key === 'r'){
    simDays = 0;
    speedMult = 1;
    paused = false;
  }
}
