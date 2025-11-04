### WEEK5 projection mapping notes
#### No.3 Gradient  

  I create canvas size(400, 400) and enable HSB mode. I keep a phase and increase it each frame. To make a vertical gradient that moves downward with no seam, I scan each row for y in range(height). 

  I compute t = (y/height) - scroll, where scroll = phase * 0.15. I wrap t into [0,1) and then use cosine cycle: cyc0 = 0.5 - 0.5*cos(TWO_PI * t) and cyc1 = 0.5 - 0.5*cos(TWO_PI * (t + 0.2)). Because cos(0) == cos(2π), values at top and bottom match, so no break line. 
  
  I blend hue inside orange family by h = lerp(22, 35, cyc0) and brightness for the moving band by b = lerp(60, 100, cyc1). Then I draw a 1-pixel strip rect(0, y, width, 1) with fill(h, 90, b, 100). background(0) clears before drawing new frame. 
  
  Key functions: cos(), lerp(), fill(), rect(), and the modulo wrap for t. This makes a warm, pumpkin-tone ribbon sliding from top to bottom forever, very clean and projection-friendly.
