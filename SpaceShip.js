/*******************************************************/
// P5.play: SpaceShip Game
// Demo Game
// Written by Byron Thistoll
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
const SPACESHIPHEIGHT = 50;
const SPACESHIPWIDTH = 50;
const OBSTACLE_HEIGHT = SPACESHIPHEIGHT;
const OBSTACLE_WIDTH = SPACESHIPWIDTH/2;
var status = 'start';
var timer = 0;
var asteroids;
var nextSpawn = 0;
var spawnDist = 0+1;
var rNum1 = 20;
var rNum2 = 200;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    //setup func - sets up all sprites and groups
    console.log("setup: ");
    world.drag = 0.5;
    cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
    spaceShip = new Sprite(SCREENWIDTH/2, SCREENHEIGHT/2, SPACESHIPWIDTH, SPACESHIPHEIGHT, 'd');
    spaceShip.addImage(imgSpaceShip);
    imgSpaceShip.resize(100, 100);
    walls = new Group();
    wallLeft = new Sprite(0, SCREENHEIGHT/2, 5, SCREENHEIGHT, 's');
    walls.add(wallLeft)
    wallRight = new Sprite(SCREENWIDTH, SCREENHEIGHT/2, 5, SCREENHEIGHT, 's');
    walls.add(wallRight)
    wallTop = new Sprite(SCREENWIDTH/2, 0, SCREENWIDTH, 5, 's');
    walls.add(wallTop)
    wallBot = new Sprite(SCREENWIDTH/2, SCREENHEIGHT, SCREENWIDTH, 5, 's');
    walls.add(wallBot)
    document.addEventListener("keydown", function(event) {
        if (status == 'start'){
           status = 'game';
        }
        if (event.code === 'ArrowUp') {
            // Set sprite's velocity in the direction its looking
                spaceShip.direction = spaceShip.rotation - 90;
                spaceShip.speed = spaceShip.speed + 1;
                console.log("go up");
        }
        if (event.code === 'ArrowDown') {
            // Set sprite's velocity in the opposite direction
            if ((spaceShip.speed > 0) && (spaceShip.direction = spaceShip.rotation - 90)) {
                spaceShip.direction = spaceShip.rotation - 90;
                spaceShip.speed = spaceShip.speed - 1;
            }  else if (spaceShip.speed <= 0 && (spaceShip.direction = spaceShip.rotation + 90)) {
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
            }
        }
        if (event.code === 'ArrowRight') {
            // Rotate Sprite to the right
            if (spaceShip.rotationSpeed <= 6) {
                spaceShip.rotationSpeed = spaceShip.rotationSpeed + 2;
                console.log("rotate right");
            }
        }
    });
    asteroids = new Group();
    spaceShip.collides(asteroids, deathScreen());
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    //The draw loop
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
    imgAsteroid.resize(100, 200);
    asteroid.bounciness = 0;
    asteroid.friction = 0;
    asteroid.moveTowards(spaceShip, 0.01);
    asteroids.add(asteroid);
}

function resetTimer(){
    console.log("reset timer");
    timer = 0;
}

function startScreen(){
    //Start Screen - called from draw
    background('gray');
    allSprites.visible = false;
    resetTimer();
    textSize(32);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to Spaceship Game", SCREENWIDTH/2, 50);
    textSize(24);
    text("Press any key to start", SCREENWIDTH/2, 110);
    text("Press Up Arrow To Move Forward.\nPress Down Arrow To Move Backwards.\nPress Left/Right Arrows to rotate.", SCREENWIDTH/2, 150);
}

function gameScreen(){
    //The game screen - called from draw and startScreen
    background(imgBackground);
    console.log("Game");
    if (status == 'game'){
     timer++;
     timer = timer/60;
     timer = round(timer);
    }
    if(frameCount > nextSpawn){
        newAsteroid();
        nextSpawn = frameCount + random(rNum1, rNum2);
    }
    allSprites.visible = true;
    
    if (asteroids.collides(spaceShip) == true) {
        console.log('you died');
        status = 'death';
    }
    textAlign(LEFT);
    text("time: " + timer, 10, 25);
}

function deathScreen() {
    //The death screen - called from draw and game screen
    background("red");
    allSprites.visible = false;
    textAlign(CENTER);
    text("Haha you died", SCREENWIDTH/2, 50);
    text("get gud", SCREENWIDTH/2, 110);
    text("your time survived was: " + timer, SCREENWIDTH/2, 150);
}
/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
