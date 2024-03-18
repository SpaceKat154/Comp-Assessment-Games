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
}

//variables
const SCREENHEIGHT = 900;
const SCREENWIDTH = 1920;
const spaceShip_HEIGHT = 25;
const spaceShip_WIDTH = 25;
const OBSTACLE_HEIGHT = spaceShip_HEIGHT*2;
const OBSTACLE_WIDTH = spaceShip_WIDTH;
var status = 'start';
var score = 0;
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
    cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
    spaceShip = new Sprite(SCREENWIDTH/2, SCREENHEIGHT/2, 50, 50, 'd');
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
            // Set sprite's velocity upwards
            spaceShip.direction = spaceShip.rotation - 90;
            spaceShip.speed = spaceShip.speed + 1;
            console.log("go up");
        }
        if (event.code === 'ArrowDown') {
            // Set sprite's velocity upwards
            spaceShip.direction = spaceShip.rotation + 90;
            spaceShip.speed = spaceShip.speed + 1;
            console.log("go down");
        }
        if (event.code === 'ArrowLeft') {
            // Set sprite's velocity upwards
            spaceShip.rotationSpeed = -2;
            console.log("rotate left");
        }
        if (event.code === 'ArrowRight') {
            // Set sprite's velocity upwards
            spaceShip.rotationSpeed = 2;
            console.log("rotate right");
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
        startScreen();
    } else if (status == 'game') {
        gameScreen();
    } else if (status == 'death'){
        deathScreen();
    }
}

function newAsteroid(){
    //Making asteroids - Called from GameScreen
    asteroid = new Sprite(random(SCREENWIDTH), random(SCREENHEIGHT), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    asteroid.color = 'black';
    asteroid.bounciness = 0;
    asteroid.friction = 0;
    asteroid.moveTowards(spaceShip, 0.01);
    asteroids.add(asteroid);
}

function startScreen(){
    //Start Screen - called from draw
    background('gray');
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to Spaceship Game", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);
    text("Press Arrow up to jump", 50, 150);
}

function gameScreen(){
    //The game screen - called from draw and startScreen
    background('blue');
    score++;
    if(frameCount > nextSpawn){
        newAsteroid();
        nextSpawn = frameCount + random(rNum1, rNum2);
    }
    allSprites.visible = true;
    
    if (asteroids.collides(spaceShip) == true) {
        console.log('you died');
        status = 'death';
    }
    text("Score: " + score, 50, 50);
}

function deathScreen() {
    //The death screen - called from draw and game screen
    background("red");
    allSprites.visible = false;
    text("Haha you died", 50, 50);
    text("get gud", 50, 110);
    text("your score was: " + score, 50, 150);
}
/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
