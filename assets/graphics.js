console.log("graphics.js has loaded");

// Canvas preparation
var canvas = document.getElementById("mycanvas");
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext("2d");

// Creating the SpaceCraft Image Element // Does Not Work
// <img id="spacecraft" src="img/spacecraft.png" alt="spacecraft" />
// imgSpaceCraft = document.createElement('img');
// imgSpaceCraft.id = "spacecraft";
// imgSpaceCraft.src = "img/spacecraft.png";
// imgSpaceCraft.alt = "spacecraft";
// document.getElementsByTagName('main')[0].appendChild(imgSpaceCraft);
// We have to add it to the HTML and call it from here, like so:
imgSpaceCraft = document.getElementById('spacecraft');
imgSpaceInvader = document.getElementById('space-invader')

// Place the spacecraft at the bottom center
ctx.drawImage(imgSpaceCraft, 300, 540);

// Trying out different coordinates

// ctx.drawImage(imgSpaceCraft, 0, 120);
// ctx.drawImage(imgSpaceCraft, 0, 180);
// ctx.drawImage(imgSpaceCraft, 0, 240);
// ctx.drawImage(imgSpaceCraft, 0, 300);
// ctx.drawImage(imgSpaceCraft, 0, 360);
// ctx.drawImage(imgSpaceCraft, 0, 420);
// ctx.drawImage(imgSpaceCraft, 0, 480);
// ctx.drawImage(imgSpaceCraft, 0, 540);
// ctx.drawImage(imgSpaceCraft, 540, 540);

// ctx.drawImage(imgSpaceInvader, 60, 60);
// ctx.drawImage(imgSpaceInvader, 120, 120);
// ctx.drawImage(imgSpaceInvader, 180, 180);
// ctx.drawImage(imgSpaceInvader, 240, 240);
// ctx.drawImage(imgSpaceInvader, 300, 300);
// ctx.drawImage(imgSpaceInvader, 360, 360);
// ctx.drawImage(imgSpaceInvader, 420, 420);
// ctx.drawImage(imgSpaceInvader, 480, 480);
// ctx.drawImage(imgSpaceInvader, 540, 540);

// we could also use pre-defined arrays for coordinates:
var x = [0,60,120,180,240,300,360,420,480,540];
var y = [0,60,120,180,240,300,360,420,480,540];
// then we could use x[6] for the 6th grid location instead of 360

// Clearing the Canvas at the beginning of each frame
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// Trying out a Frame Timer
// var i = 0;
// var timerId = setInterval( function(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(imgSpaceInvader, 120, i);
//     if (i==540){
//         clearInterval(timerId)
//     } else {
//         i += 60;
//     }
// }, 1000 );

// TEXT on the Canvas
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Ready to Play? ", canvas.width/2, canvas.height/2); // center coordinates