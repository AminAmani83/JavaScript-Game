console.log("game.js has loaded");
var spaceInvaders = []; // array to store spaceinvaders
var scorePElement;

// One Object (Game Area):
var gameArea = {
    // Vars
    canvas : document.getElementById("mycanvas"),
    score : 0,
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
        clearInterval(intervalGen); // Stop Generating new SpaceInvaders
        console.log("game over");
        // Show Message on Screen
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2); // center coordinates
        // Buttons
        let buttons = document.getElementsByTagName("button");
        for(let i = 0;  i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        document.getElementById("retry_btn").setAttribute("class", "visible"); // Hide the Retry Button
        document.getElementById("retry_btn").disabled = false; // Enable the Retry Button bcs all button were previously disabled
    }
}

// One Object (SpaceCraft):
var spacecraft = {
    // Vars
    imgSpaceCraft : document.getElementById('spacecraft'),
    xLocation : 240,
    yLocation : 540,
    height : 60,
    width : 60,
    // Methods
    update : function() { // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceCraft, this.xLocation, this.yLocation);
    }
}

// Constructor Function(SpaceInvaders):
function SpaceInvader(xLocation, yLocation) {
    // Vars
    this.imgSpaceInvader = document.getElementById('space-invader');
    this.height = 60;
    this.width = 60;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    // Methods
    this.update = function() { // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceInvader, this.xLocation, this.yLocation);
    };
}

function bullet(xLocation, yLocation) { // For Later...
    this.x = xLocation;
    this.y = yLocation;
    // Methods
    this.show = function(){ // Redraw the Object on the Screen
        fill(50, 0, 200);
        ellipse(this.x, this.y, 16, 16);
    }
    this.move = function(){
        this.y += 5;
    }
}

// Refresh the Frame / Redraw everything on the Canvas
function updateFrame() {
    // Clear the Canvas
    gameArea.clear();
    // Redraw the SpaceCraft
    spacecraft.update();
    // Redraw all SpaceInvaders
    for (i in spaceInvaders){
        spaceInvaders[i].update();
    }
    scorePElement.innerText = "Your score is " + gameArea.score;
}


// Change the Positions of All SpaceInvaders (At Every Interval)
function updateSpaceInvaderPositions() {
    for (i in spaceInvaders) {
        spaceInvaders[i].yLocation += 60;
    }
    updateFrame(); // Something has changed, redraw the whole canvas
    // Check for GameOver
    for (i in spaceInvaders) {
        if (spaceInvaders[i].yLocation >= 540) {
            gameArea.gameOver();  // Game Over
            break; // Don't check the rest of the spaceInvaders
        }
    }
}

function generateInvaders(){ // generating invaders
    let randPos = Math.floor(Math.random() * 10)*60; // random X position
    let si = new SpaceInvader(randPos , 0);
    spaceInvaders.push(si); // add spaceinvader to array
    updateFrame();
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

function startGame(){
    // Canvas Setup
    gameArea.init();
    spacecraft.update(); // Add the Spacecraft
    spaceInvaders = []; // Empty the array that stores spaceinvaders
    // Score Setup
    gameArea.score = 0; // Reset score to zero
    scorePElement = document.getElementById('score');
    // Buttons
    let buttons = document.getElementsByTagName("button");
    for(let i = 0;  i < buttons.length; i++){
        buttons[i].disabled = false;
    }
    document.getElementById("retry_btn").setAttribute("class", "hidden"); // Hide the Retry Button
    // Timer for Generating & Changing SpaceInvader Positions Every X sec.
    interval = setInterval(updateSpaceInvaderPositions, 1000);
    intervalGen = setInterval(generateInvaders, 3000);
}

// Shoot function
function shoot(){
    let indexes = []; // Array of Indexes of SpaceInvaders that are in front of the spaceCraft
    let indexesYLocation = []; // Array of the Y location of above spaceInvaders
    for (let i = 0;  i < spaceInvaders.length; i++){
        if(spacecraft.xLocation == spaceInvaders[i].xLocation) {
            indexes.push(i);
            indexesYLocation.push(spaceInvaders[i].yLocation); 
        }
    }
    if(indexes.length > 0) { // It's a Hit!
        let lowestIndex = indexesYLocation.indexOf( Math.max(...indexesYLocation) ); // In case of multiple spaceInvaders, hit the lowest one
        spaceInvaders.splice(indexes[lowestIndex], 1);
        gameArea.score++;
        // console.log("Score: " + gameArea.score);
        updateFrame();
    }
 }


startGame();

document.addEventListener('keydown', function(event){
    if(event.keyCode === 37){
        moveleft();
    }
    if(event.keyCode === 39){
        moveright();
    }
    if(event.keyCode === 32){
        shoot();
    }
});
