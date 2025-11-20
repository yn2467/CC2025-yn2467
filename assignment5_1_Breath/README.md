### WEEK5 projection mapping notes
#### No.1 Breathing cube

  First I call size(400, 400) to make canvas, then colorMode(HSB, 360, 100, 100, 100) for easy hue/brightness control, and noStroke() to keep shapes clean. I create a time variable phase, and every draw() I increase it a little. 

  I use a breathing value by sin(phase) * 0.5 + 0.5, so result is 0..1. I use lerp() between two sizes (like 110 and 150) to scale a square smoothly, and use lerpColor(orangeLight, orangeDark, breathe) to fade color at same rhythm. 

  With rectMode(CENTER) I draw multiple concentric rounded rectangles in a loop; each ring has small phase offset sin(phase + i*0.75) so rings don’t move totally same, more organic. The rectangle is drawn by rect(cx, cy, w, h, 18); the last parameter makes round corner, more friendly for projection. 
  
  I also add a center pulse using ellipse(cx, cy, glowSize, glowSize) where glowSize = lerp(22, 42, breathe), and its brightness uses fill(h, s, lerp(60,100,breathe), 90). background(0) each frame clears old image. The combination of sin(), lerp(), lerpColor(), and ring loop makes a cube feeling like inhale/exhale. No mouse input, only time-driven animation, very stable for mapping.