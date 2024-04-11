/*******************************************************/
// P5.play: SpaceShip Game
// Assessment Game
// Written by Byron Thistoll
//hello
/*******************************************************/
console.log("%c SpaceShip.js", "color: blue;");

/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
  console.log("preload: ");
  imgSpaceShip = loadImage('/images/SpaceShip.png');
  imgAsteroid = loadImage('/images/Asteroid.png');
  imgBackground = loadImage('/images/SpaceBackground.png');
}

//variables
const SCREENHEIGHT = 913;
const SCREENWIDTH = 1920;
const SPACESHIPHEIGHT = 60;
const SPACESHIPWIDTH = 40;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_WIDTH = 60;
var status = 'start';
var gameTime = 0;
var displayTime = 0;
var asteroidsGroup;
var nextSpawn = 0;
var spawnDist = 0+1;
var rNum1 = 50;
var rNum2 = 200;
var asteroid;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    //setup func - sets up all sprites and groups
    console.log("setup: ");
    cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
    spaceShip = new Sprite(SCREENWIDTH/2, SCREENHEIGHT/2, SPACESHIPWIDTH, SPACESHIPHEIGHT, 'd');
    spaceShip.addImage(imgSpaceShip);
    imgSpaceShip.resize(100, 100);
    walls = new Group();
    wallLeft = new Sprite(0, SCREENHEIGHT/2, 5, SCREENHEIGHT, 's');
    walls.add(wallLeft);
    wallRight = new Sprite(SCREENWIDTH, SCREENHEIGHT/2, 5, SCREENHEIGHT, 's');
    walls.add(wallRight);
    wallTop = new Sprite(SCREENWIDTH/2, 0, SCREENWIDTH, 5, 's');
    walls.add(wallTop);
    wallBot = new Sprite(SCREENWIDTH/2, SCREENHEIGHT, SCREENWIDTH, 5, 's');
    walls.add(wallBot);
    document.addEventListener("keydown", function(event) {
        if (status == 'start'){
           status = 'game';
        }
        if (event.code === 'ArrowUp') {
            // Set sprite's velocity in the direction its looking
            if (spaceShip.direction == spaceShip.rotation + 90) {
                spaceShip.speed = spaceShip.speed - 1;
            }  else {
                spaceShip.direction = spaceShip.rotation - 90;
                spaceShip.speed = spaceShip.speed + 1;
            }
            console.log("go up");
        }
        if (event.code === 'ArrowDown') {
            // Set sprite's velocity in the opposite direction
            if (spaceShip.direction == spaceShip.rotation - 90) {
                spaceShip.speed = spaceShip.speed - 1;
            }  else {
                spaceShip.direction = spaceShip.rotation + 90;
                spaceShip.speed = spaceShip.speed + 1;
            }
            console.log("go down");
        }
        if (event.code === 'ArrowLeft') {
            // Rotate Sprite to the left
            if (spaceShip.rotationSpeed >= -6) {
                spaceShip.rotationSpeed = spaceShip.rotationSpeed - 2;
                console.log("rotate left");
            } else {
                spaceShip.rotationSpeed = -6;
                console.log("rotate left");
            }
        }
        if (event.code === 'ArrowRight') {
            // Rotate Sprite to the right
            if (spaceShip.rotationSpeed <= 6) {
                spaceShip.rotationSpeed = spaceShip.rotationSpeed + 2;
                console.log("rotate right");
            } else {
                spaceShip.rotationSpeed = 6;
                console.log("rotate right");
            }
        }
    });
    asteroidsGroup = new Group();
    spaceShip.collides(asteroidsGroup, deathScreen());
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    //The draw loop
    if (kb.pressing('p')) allSprites.debug = true;
    if (kb.pressing('l')) allSprites.debug = false;
    if (status == 'start'){
        resetTimer()
        startScreen();
    } else if (status == 'game') {
        gameScreen();
    } else if (status == 'death'){
        resetTimer()
        deathScreen();
    }
}

function newAsteroid(){
    //Making asteroids - Called from GameScreen
    asteroid = new Sprite(random(SCREENWIDTH), random(SCREENHEIGHT), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    asteroid.addImage(imgAsteroid);
    imgAsteroid.resize(60, 60);
    asteroid.bounciness = 0;
    asteroid.friction = 0;
    asteroid.moveTowards(spaceShip, 0.01);
    asteroid.rotationSpeed = random(-10, 10);
    asteroidsGroup.add(asteroid);
}

function resetTimer(){
    console.log("reset time");
    gameTime = 0;
}

function startScreen(){
    //Start Screen - called from draw
    background('gray');
    allSprites.visible = false;
    textSize(32);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to Spaceship Game", SCREENWIDTH/2, 50);
    textSize(24);
    text("Press any key to start", SCREENWIDTH/2, 110);
    text("Press Up Arrow To Move Forward.\nPress Down Arrow To Move Backwards.\nPress Left/Right Arrows to rotate.\nAvoid the asteroids and survive for as long as you can.", SCREENWIDTH/2, 150);
}

function gameScreen(){
    //The game screen - called from draw and startScreen
    background(imgBackground);
    //console.log("Game");
    if (status == 'game'){
        //console.log("time go up " + gameTime);
        gameTime ++;
        displayTime = gameTime/60;
        displayTime = round(displayTime);
    }
    if(gameTime >= 3600){
        rNum1 = 50;
        rNum2 = 150;
    }
    if(frameCount > nextSpawn){
        newAsteroid();
        nextSpawn = frameCount + random(rNum1, rNum2);
    }
    allSprites.visible = true;
    
    if (asteroidsGroup.collides(spaceShip) == true) {
        console.log('you died');
        status = 'death';
    }
    textAlign(LEFT);
    text("timer: " + displayTime, 10, 25);
}

function deathScreen() {
    //The death screen - called from draw and game screen
    background("red");
    allSprites.visible = false;
    textAlign(CENTER);
    text("Haha you died", SCREENWIDTH/2, 50);
    text("get gud", SCREENWIDTH/2, 110);
    text("your time survived was: " + displayTime + " Seconds", SCREENWIDTH/2, 150);
}
/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
