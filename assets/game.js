console.log("game.js has loaded");

// One Object (Game Area):
var gameArea = {
    // Vars
    canvas : document.getElementById("mycanvas"),
    // Methods
    init : function(){ // Initialize Canvas
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d");
    },
    clear : function(){ // Delete Everything from Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    gameOver : function(){ // Show Message On Screen
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2); // center coordinates
    }
}

// One Object (SpaceCraft):
var spacecraft = {
    // Vars
    imgSpaceCraft : document.getElementById('spacecraft'),
    xLocation : 300,
    yLocation : 540,
    // Methods
    update : function(){ // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceCraft, this.xLocation, this.yLocation);
    }
}

// Constructor Function(SpaceInvaders):
function SpaceInvader(xLocation, yLocation) {
    // Vars
    this.imgSpaceInvader = document.getElementById('space-invader');
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    // Methods
    this.update = function(){ // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceInvader, this.xLocation, this.yLocation);
    };
}

// A function to refresh the page every x milliseconds
function updateFrame(){
    // Clear the Canvas
    gameArea.clear();
    // Redraw the SpaceCraft
    spacecraft.update();
    // Redraw all SpaceInvaders
    for (i in spaceInvaders){
        spaceInvaders[i].update();
    }
}

// Change the Positions of All SpaceInvaders (At Every Interval)
function updateSpaceInvaderPositions(){
    for (i in spaceInvaders){
        spaceInvaders[i].yLocation += 60;
    }
    updateFrame(); // Something has changed, redraw the whole canvas
    // Check if a SpaceInvader has reached the ground
    if (spaceInvaders[i].yLocation == 540){
        clearInterval(interval); // Stop Frame Refresh
        gameArea.gameOver();     // Show message on the Screen
    }
}

// SpaceCraft Movement Controllers
function moveleft() {
    spacecraft.xLocation -= 60;
    updateFrame();
  }
  
function moveright() {
    spacecraft.xLocation += 60;
    updateFrame();
  }

///////////////////////////////////////////////////////////////////
// The Action Happens Here
///////////////////////////////////////////////////////////////////

// Canvas Setup
gameArea.init();

// Creating 2 SpaceInvader objects from above constructor
let si1 = new SpaceInvader(0 , 0);
si1.update();
let si2 = new SpaceInvader(120 , 120);
si2.update();

// Put all SpaceInvaders in an array so that we can loop through them
let spaceInvaders = [];
spaceInvaders.push(si1);
spaceInvaders.push(si2);

// Add the Spacecraft
spacecraft.update();

// Frame Refresh Timer
interval = setInterval(updateSpaceInvaderPositions, 1000);



