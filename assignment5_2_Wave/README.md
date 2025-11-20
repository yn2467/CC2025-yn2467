### WEEK5 projection mapping notes
#### No.2 The sin wave

  I set canvas by size(400, 400), color by colorMode(HSB, …). Then I prepare a global phase for time. In draw(), I call background(0) and set stroke color with stroke(hue, 90, brightness, 100); brightness does small pulse using lerp(70, 95, sin(phase*0.8)*0.5+0.5). 

  The main shape is many horizontal lines. For each row (step like 16 px) I start beginShape(). I add virtual control points via curveVertex() a little outside left and right edges to avoid open gaps; this fixes border seam. 

  For each x column (step like 8–12 px), I calculate vertical offset using sin(x*0.04 + phase + rowPhase) * amp, where amp also breathes by lerp(8,28,sin(phase*0.7)*0.5+0.5). Then I place curveVertex(x, yBase + offset) to form a smooth wave; endShape() connects them. 
  
  Optionally I add soft overlay using fill(h,100,100,8); noStroke(); rect(0,0,width,height) to simulate glow without heavy cost. Functions used: beginShape()/curveVertex()/endShape() for continuous curves, sin() for motion, lerp() for amplitude and brightness, strokeWeight(3) for clear projection lines. The result looks like liquid surface or fabric melting across cube, fully auto-animated by phase += speed.
