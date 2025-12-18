### How it works (The Tech Part)
##### At first, I just want the camera to track my hand. I used the BodyPose model to get the X and Y of my wrists. But I don't want the ripples to show up all the time because it will look very messy. So I added a "Speed Threshold." This means only when my hand move very fast, the ripple will be created.

##### I also realized that if I move my hand once, the computer is too fast and it creates 50 ripples in one second. To fix this, I added a "Cooldown Time." I gave my left hand and right hand separate timers. So now, they don't fight with each other, and the ripples look much cleaner.

##### Another thing is the "Mirror" problem. Usually, the webcam is opposite, like a mirror. I used translate() and scale(-1, 1) to flip the video back so it feels more natural when I interact with the screen.

### The Story:
##### While I was debugging, I start to think about what these ripples represent. I think they are very like our memories.

##### The Camera is the "Now": The camera only sees what is happening at this moment. It doesn't remember what I did one second ago.

##### The Movement is the "Energy": In our life, only the things that give us strong feelings will stay in our mind. In my code, only the "Fast Movement" (big energy) can trigger a ripple. If I move slowly, nothing happens, just like the boring days we forget.

##### The Fading is "Time": I made the alpha value of the ripple decrease every frame. Also, the strokeWeight becomes thinner when the ripple grows. This is exactly how memory works—it is very vivid and "thick" at the beginning, but then it becomes blurry and "thin" until it totally disappears.