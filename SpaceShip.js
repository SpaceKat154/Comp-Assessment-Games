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
  imgBullet = loadImage('/images/Bullet.png');
}

//variables
const SCREENHEIGHT = 913;
const SCREENWIDTH = 1920;
const SPACESHIPHEIGHT = 50;
const SPACESHIPWIDTH = 50;
const OBSTACLE_HEIGHT = SPACESHIPHEIGHT;
const OBSTACLE_WIDTH = SPACESHIPWIDTH/2;
var status = 'start';
var gameTime = 0;
var displayTime = 0;
var asteroids;
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
    world.drag = 0.5;
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
    bullet = new Sprite(spaceShip.x, spaceShip.y, SPACESHIPWIDTH/4, SPACESHIPHEIGHT/2, 'd');
    bullet.visible = false;
    bullet.addImage(imgBullet);
    imgBullet.resize(25, 50);
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
        //Chat GPT helped me here
        if (key == ' ') {
            console.log("bullet go forwards");
            bullet.x = spaceShip.x;
            bullet.y = spaceShip.y;
            bullet.direction = spaceShip.direction;
            bullet.speed = spaceShip.speed + 5;

            // Convert spaceship rotation to radians
            let radians = spaceShip.rotation * Math.PI / 180;

            // Calculate velocity components
            bullet.vx = Math.cos(radians) * (bullet.speed);
            bullet.vy = Math.sin(radians) * (bullet.speed);
            
            // Set bullet rotation to match spaceship rotation
            bullet.rotation = spaceShip.rotation;
        }
        //End of Chat GPT's help

    });
    asteroids = new Group();
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    //The draw loop
    if (kb.pressing('p')) allSprites.debug = true;
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
    asteroid.rotationSpeed = random(-10, 10);
    asteroids.add(asteroid);
    
    asteroids.push(asteroid);
}

function resetTimer(){
    console.log("reset time");
    gameTime = 0;
}

function checkCollision(bullet, asteroid) {
    
}

function destroyAsteroids(_bullet, _asteroid){
    _asteroid.remove();
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
    spaceShip.collides(asteroids, deathScreen());
    bullet.collides(asteroids, destroyAsteroids());
    background(imgBackground);
    //console.log("Game");
    if (status == 'game'){
        //console.log("time go up " + gameTime);
        gameTime ++;
        displayTime = gameTime/60;
        displayTime = round(displayTime);
    }
    if(gameTime >= 60*60){
        rNum1 = 20;
        rNum2 = 150;
    }
    if(frameCount > nextSpawn){
        newAsteroid();
        nextSpawn = frameCount + random(rNum1, rNum2);
    }
    allSprites.visible = true;
    
    //Chat GPT Assisted
    if (checkCollision(bullet, asteroid)) {
        // Find the index of the asteroid in the array
        let index = asteroids.indexOf(asteroid);
    
        // Remove the asteroid from the array
        if (index !== -1) {
            asteroids.splice(index, 1);
        }
    }
    for (let i = asteroids.length - 1; i >= 0; i--) {
        let asteroid = asteroids[i];
        if (checkCollision(bullet, asteroid)) {
            // Remove the asteroid from the array and the scene
            asteroid.remove();
            asteroids.splice(i, 1);
        }
    }
    //End of Chat GPT Assistance
    
    if (asteroids.collides(spaceShip) == true) {
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
    text("your time survived was: " + displayTime, SCREENWIDTH/2, 150);
}
/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
