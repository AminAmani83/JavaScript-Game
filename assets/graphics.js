console.log("graphics.js has loaded");

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

// SpaceCraft + SpaceInvaders Image
imgSpaceCraft = document.getElementById('spacecraft');
imgSpaceInvader = document.getElementById('space-invader')

// Trying out different coordinates
ctx.drawImage(imgSpaceCraft, 0, 0);

var i = 0;
var timerId = setInterval( function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgSpaceInvader, 120, i);
    if (i==540){
        clearInterval(timerId)
    } else {
        i += 60;
    }
}, 1000 );


ctx.drawImage(imgSpaceCraft, 0, 120);
ctx.drawImage(imgSpaceCraft, 0, 180);
ctx.drawImage(imgSpaceCraft, 0, 240);
ctx.drawImage(imgSpaceCraft, 0, 300);
ctx.drawImage(imgSpaceCraft, 0, 360);
ctx.drawImage(imgSpaceCraft, 0, 420);
ctx.drawImage(imgSpaceCraft, 0, 480);
ctx.drawImage(imgSpaceCraft, 0, 540);
ctx.drawImage(imgSpaceCraft, 540, 540);

ctx.drawImage(imgSpaceInvader, 60, 60);
ctx.drawImage(imgSpaceInvader, 120, 120);
ctx.drawImage(imgSpaceInvader, 180, 180);
ctx.drawImage(imgSpaceInvader, 240, 240);
ctx.drawImage(imgSpaceInvader, 300, 300);
ctx.drawImage(imgSpaceInvader, 360, 360);
ctx.drawImage(imgSpaceInvader, 420, 420);
ctx.drawImage(imgSpaceInvader, 480, 480);
ctx.drawImage(imgSpaceInvader, 540, 540);

// Clearing the Canvas at the beginning of each frame
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// TEXT
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Ready to Play? ", canvas.width/2, canvas.height/2); // center coordinates