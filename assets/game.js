console.log("game.js has loaded");

let spaceInvaders = []; // array to store spaceinvaders
// HTML Elements
let levelPElement = document.getElementById("level");
let scorePElement = document.getElementById("score");
let hScoreElement = document.getElementById("highScore");
let allBtnElements = document.getElementsByTagName("button");
let retryBtnElement = document.getElementById("retry_btn");
let startBtnElement = document.getElementById("start_btn");
let nextLevelBtnElement = document.getElementById("nextLevel_btn");
let spaceInvaderHeight = 60;
let spaceInvaderWidth = 60;

// One Object (Game Area):
let gameArea = {
    // Vars
    canvas : document.getElementById("mycanvas"),
    score : 0,
    highscore: 0,
    // Methods
    init : function(){ // Initialize Canvas
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d");
        // Setup Font Size For On-Screen Messages
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.resetLevel();
    },
    resetLevel : function(){ // Difficulty Level Setup for Level 1
        this.level = 1;
        this.invaderGenerationSpeed = 2000; // Generate a new SpaceInvader every X milli second
        this.invaderMovementSpeed = 20; //  Every X millisec, move 1 pixel. (Higher is Slower, choose between 1 and 20.)
        this.NumberOfSpaceInvadersPerLevel = 5; // After Killing how many SpaceInvaders > Next Level Starts
    },
    clear : function(){ // Delete Everything from Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    nextLevel : function(){ // Show Message On Screen
        clearInterval(interval); // Stop Moving SpaceInvaders
        clearInterval(intervalGen); // Stop Generating new SpaceInvaders
        // allBtnElements & KeyPress
        for(let i = 0;  i < allBtnElements.length; i++) {
            allBtnElements[i].disabled = true;
        }
        this.disableKeyPress = true;
        // Show Message on Screen
        this.ctx.fillText("Congrats!", this.canvas.width/2, this.canvas.height/2); // center coordinates
        // Prepare Next Level Difficulty
        if (this.invaderGenerationSpeed > 200){
            this.invaderGenerationSpeed -= 200;
        }
        if (this.invaderMovementSpeed > 2){
            this.invaderMovementSpeed -= 2;
        }
        // Prepare Level Number
        this.level++;
        // NextLevel Button or GameFinished Message
        if (gameArea.level <= 10){ // Not The Final Level
            nextLevelBtnElement.setAttribute("class", "visible"); // Show the NextLevel Button
            nextLevelBtnElement.disabled = false; // Enable the NextLevel Button bcs all Button Elements were previously disabled
        } else { // The Final Level
            this.ctx.fillText("You Finished The Game", this.canvas.width/2, this.canvas.height/2+50); // center coordinates + 50 px (below the Congrats message)
        }
    },
    gameOver : function(){ // Show Message On Screen
        clearInterval(interval); // Stop Moving SpaceInvaders
        clearInterval(intervalGen); // Stop Generating new SpaceInvaders
        // Reset Level & Difficulty
        this.resetLevel();
        // SpaceCraft Explosion
        explosion.visible = true;
        explosion.xLocation = spacecraft.xLocation;
        explosion.yLocation = this.canvas.height - spacecraft.height; // 600 - 60 = 540
        updateFrame();
        // allBtnElements & KeyPress
        for(let i = 0;  i < allBtnElements.length; i++) {
            allBtnElements[i].disabled = true;
        }
        this.disableKeyPress = true;
        // Show Message on Screen
        this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2); // center coordinates
        // Show Retry Button
        retryBtnElement.setAttribute("class", "visible"); // Show the Retry Button
        retryBtnElement.disabled = false; // Enable the Retry Button bcs all button were previously disabled
        // highScore();
        /**
        //prompt for highScore username
        if (gameArea.highScore == gameArea.score){
            var username = prompt("New High Score! Enter username: ");
            hScoreElement.innerText = "Best Score: " + gameArea.highscore + username.val;
        }
        */
    }
}

// One Object (SpaceCraft):
let spacecraft = {
    // Vars
    imgSpaceCraft : document.getElementById('spacecraft'),
    xLocation : 240, // initial position on screen
    yLocation : 540,
    height : 60,
    width : 60,
    // Methods
    update : function() { // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceCraft, this.xLocation, this.yLocation);
    }
}

/**
 * Constructor Function (SpaceInvaders):
 * 
 * @param {number} xLocation 
 * @param {number} yLocation 
 */
function SpaceInvader(xLocation, yLocation) {
    // Vars
    this.imgSpaceInvader = document.getElementById('space-invader');
    this.height = spaceInvaderHeight;
    this.width = spaceInvaderWidth;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    // Methods
    this.update = function() { // Redraw the Object on the Screen
        gameArea.ctx.drawImage(this.imgSpaceInvader, this.xLocation, this.yLocation);
    };
}

// One Object (Explosion):
let explosion = {
    // Vars
    imgExplosion : document.getElementById('explosion'),
    xLocation : 0, // initial position on screen
    yLocation : 0,
    height : 60,
    width : 60,
    visible : false, // by default
    // Methods
    update : function() { // Redraw the Object on the Screen if Needed
        if (this.visible == true) {
            gameArea.ctx.drawImage(this.imgExplosion, this.xLocation, this.yLocation);
        }
    }
}

// One Object (Laser Beam):
let laserBeam = {
    // Vars
    imgLaserBeam : document.getElementById('laser-beam'),
    xLocation : 0, // initial position on screen
    yLocation : 0,
    height : 60, // initial value (will be different for each shot)
    width : 60,
    visible : false, // by default
    // Methods
    update : function() { // Redraw the Object on the Screen if Needed
        if (this.visible == true) {
            gameArea.ctx.drawImage(this.imgLaserBeam, this.xLocation, this.yLocation, this.width, this.height);
        }
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
    // Draw Explosion (If Needed)
    explosion.update();
    // Draw LaserBeam (If Needed)
    laserBeam.update();
}


// Change the Positions of All SpaceInvaders (At Every Interval)
function updateSpaceInvaderPositions() {
    for (i in spaceInvaders) {
        spaceInvaders[i].yLocation += 1; // pixel (default value: 60 per 1000 millisecond)
    }
    updateFrame(); // Something has changed, redraw the whole canvas
    // Check for GameOver
    for (i in spaceInvaders) {
        if (spaceInvaders[i].yLocation >= spacecraft.yLocation - spaceInvaderHeight &&
            spacecraft.xLocation == spaceInvaders[i].xLocation) { // SpaceInvader Hits SpaceCraft
                gameArea.gameOver();  // Game Over
                break; // Don't check the rest of the spaceInvaders
        }
        if (spaceInvaders[i].yLocation >= gameArea.canvas.height - spaceInvaderHeight) { // SpaceInvader Hits the Groud
            gameArea.gameOver();  // Game Over
            break; // Don't check the rest of the spaceInvaders
        }
    }
}

// Generating SpaceInvaders
function generateInvaders(){
    let randPos = Math.floor(Math.random() * 10) * 60; // random X position
    let si = new SpaceInvader(randPos , 0);
    spaceInvaders.push(si); // add spaceinvader to array
    updateFrame(); // Redraw Everything
}

// SpaceCraft Movement Controller
function moveLeft() {
    if (gameArea.disableKeyPress) {
        return; // do nothing
    }
    spacecraft.xLocation -= 60; // Moves spacecraft left
    if(spacecraft.xLocation < 0){
        spacecraft.xLocation = 0;
    }
    updateFrame(); // Redraw Everything
  }
    
// SpaceCraft Movement Controller
function moveRight() {
    if (gameArea.disableKeyPress) {
        return; // do nothing
    }
    spacecraft.xLocation += 60; // Moves spacecraft right
    if(spacecraft.xLocation > gameArea.canvas.width - spacecraft.width){
        spacecraft.xLocation = gameArea.canvas.width - spacecraft.width;
    }
    updateFrame(); // Redraw Everything
  }


// Shoot, draw Laser Beam, Calculate Hit or Miss, Draw Explosion if Hit
function shoot(){
    // Calculate Shooting Results & Kill
    let indexes = []; // Array of Indexes of SpaceInvaders that are in front of the spaceCraft
    let indexesYLocation = []; // Array of the Y location of above spaceInvaders
    for (let i = 0;  i < spaceInvaders.length; i++){ // Loop to determine if "shot" hits target
        if(spacecraft.xLocation == spaceInvaders[i].xLocation) {
            indexes.push(i);
            indexesYLocation.push(spaceInvaders[i].yLocation); 
        }
    }
    if(indexes.length > 0) { // It's a Hit!
        let lowestIndex = indexesYLocation.indexOf( Math.max(...indexesYLocation) ); // In case of multiple spaceInvaders, hit the lowest one
        // Prepare The Explosion
        explosion.visible = true;
        explosion.xLocation = spaceInvaders[indexes[lowestIndex]].xLocation; // xLocation of the spaceInvader that was shot
        explosion.yLocation = spaceInvaders[indexes[lowestIndex]].yLocation; // yLocation of the spaceInvader that was shot
        // Remove SpaceInvader object from Array
        spaceInvaders.splice(indexes[lowestIndex], 1);
        // Prepare the laser beam to be drawn from the Spacecraft to the SpaceInvader
        laserBeam.xLocation = spacecraft.xLocation;
        laserBeam.yLocation = explosion.yLocation + explosion.height;
        laserBeam.height = gameArea.canvas.height - spacecraft.height - explosion.height - explosion.yLocation;
        laserBeam.visible = true;
        updateFrame(); // Redraw Everything (Remove dead SpaceInvader & replace with Explosion + LaserBeam)
        // Hide Explosion after a short period
        setTimeout(function(){
            explosion.visible = false;
            updateFrame(); // Redraw Everything
        }, 300);
        // Update & Show Score and High Score
        gameArea.score++;
        if (gameArea.score > gameArea.highscore){
            gameArea.highscore = gameArea.score;
        }
        hScoreElement.innerText = "Best Score: " + gameArea.highscore; // Stores for session, can use localStorage for long term
        scorePElement.innerText = "Score: " + gameArea.score;
    } else { // It's a Miss...
        // Prepare the laser beam to be drawn from the spacecraft to the top of the canvas
        laserBeam.xLocation = spacecraft.xLocation;
        laserBeam.yLocation = 0; // top of canvas
        laserBeam.height = gameArea.canvas.height - spacecraft.height;
        laserBeam.visible = true;
        updateFrame(); // Redraw Everything
    }
    // Hide LaserBeam after a short period
    setTimeout(function(){
        laserBeam.visible = false;
        updateFrame(); // Redraw Everything
    }, 100);
 }

// Setup score, Start SpaceInvader Generation & Movements,  
function startGame(){ // Called directly from HTML (Start & Retry allBtnElements)
    // Canvas Setup
    explosion.visible = false; // If Spacecraft explosion leftover from previous gameplay
    spacecraft.xLocation = 240; // Back to its initial position
    spacecraft.update(); // Add the Spacecraft
    spaceInvaders = []; // Empty the array that stores spaceInvaders
    levelPElement.innerText = "Level: " + gameArea.level;
    // Score Setup
    if (gameArea.level == 1){
        gameArea.score = 0; // Reset score to zero
        scorePElement.innerText = "Score: " + gameArea.score; // Show score on screen
    }
    // allBtnElements & Controls
    for(let i in allBtnElements){
        allBtnElements[i].disabled = false;
    }
    retryBtnElement.setAttribute("class", "hidden"); // Hide the Retry Button
    startBtnElement.setAttribute("class", "hidden"); // Hide the Start Button
    nextLevelBtnElement.setAttribute("class", "hidden"); // Hide the NextLevel Button
    gameArea.disableKeyPress = false; // Re-Activate KeyBoard KeyPress
    // Timers for Generating & Changing SpaceInvader Positions Every X millisec.
    interval = setInterval(updateSpaceInvaderPositions, gameArea.invaderMovementSpeed);
    let invaderCounter = 0;
    intervalGen = setInterval(function(){
        invaderCounter++;
        if (gameArea.NumberOfSpaceInvadersPerLevel >= invaderCounter){ // Only generate a certain number of SpaceInvaders for each level
            generateInvaders();
        } else { // Do not generate any more SpaceInvaders and...
            if (spaceInvaders.length == 0){ // Array is Empty = All SpaceInvaders have been killed
                gameArea.nextLevel(); // Go to Next Level
            }
        }
    }, gameArea.invaderGenerationSpeed);
}

// Keyboard KeyPress Events (left/right/shoot)
document.addEventListener("keydown", function(event){
    if (gameArea.disableKeyPress) {
        return; // do nothing
    } // otherwise:
    if(event.keyCode === 37){
        moveLeft();
    }
    if(event.keyCode === 39){
        moveRight();
    }
    if(event.keyCode === 32){
        shoot();
    }
    event.preventDefault();
});


//////////////////////////////////////////////////////////////
                    /////// START ///////
//////////////////////////////////////////////////////////////

gameArea.init();
