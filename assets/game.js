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
        clearInterval(interval); // Stop Frame Refresh
        clearInterval(intervalGen); 
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
    xLocation : 240,
    yLocation : 540,
    height : 60, // added height and width for our objects
    width : 60, // added height and width for our objects
    // Methods
    update : function(){ // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceCraft, this.xLocation, this.yLocation);
    }
}

// Constructor Function(SpaceInvaders):
function SpaceInvader(xLocation, yLocation) {
    // Vars
    this.imgSpaceInvader = document.getElementById('space-invader');
    this.height = 60; // added height and width for our objects
    this.width = 60; // added height and width for our objects
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    // Methods
    this.update = function(){ // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceInvader, this.xLocation, this.yLocation);
    };
}

// Refresh the Frame / Redraw everything on the Canvas
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
    for (i in spaceInvaders){
        if (spaceInvaders[i].yLocation == 540){
            gameArea.gameOver();     // Show message on the Screen
        }
    }
}

let spaceInvaders = []; // array to store spaceinvaders
function generateInvaders(){ // generating invaders
    let randPos = Math.floor(Math.random() * 11)*60; // random X position
    let si = new SpaceInvader(randPos , 0);
    spaceInvaders.push(si); // add spaceinvader to array
    console.log(randPos);
}    
    


// SpaceCraft Movement Controllers
function moveleft() {
    spacecraft.xLocation -= 60;
    if(spacecraft.xLocation < 0){
        spacecraft.xLocation = 0;
    }
   
    updateFrame();
  }
  
function moveright() {
    spacecraft.xLocation += 60;
    if(spacecraft.xLocation > gameArea.canvas.width - spacecraft.width){
        spacecraft.xLocation = gameArea.canvas.width - spacecraft.width;
    }
    updateFrame();
  }

///////////////////////////////////////////////////////////////////
// The Action Happens Here ///////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Canvas Setup
gameArea.init();

/* Daniil: I commented this part since spaceinvader object are created inside
generateInvaders()

Creating 2 SpaceInvader objects from above constructor
let si1 = new SpaceInvader(0 , 0);
si1.update();
let si2 = new SpaceInvader(480 , 120);
si2.update();

//Put all SpaceInvaders in an array so that we can loop through them later

spaceInvaders.push(si1);
spaceInvaders.push(si2); */

// Add the Spacecraft
spacecraft.update();

// Shoot function
function shoot(){
    for (var i = 0;  i < spaceInvaders.length; i++){
        if(spacecraft.xLocation == spaceInvaders[i].xLocation){
            console.log("Hit");
            spaceInvaders.splice(i, 1);
            }
        }
}

// Timer for Changing SpaceInvader Positions Every X sec.
interval = setInterval(updateSpaceInvaderPositions, 1000);
intervalGen = setInterval(generateInvaders, 1000);
