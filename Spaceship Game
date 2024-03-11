/*******************************************************/
// P5.play: GeoDash Demo Game
// Demo Game
// Written by Byron Thistoll
/*******************************************************/
console.log("%c SpaceShip.js", "color: blue;");

//variables
const SCREENHEIGHT = 900;
const SCREENWIDTH = 1920;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;
const OBSTACLE_HEIGHT = PLAYER_HEIGHT*2;
const OBSTACLE_WIDTH = PLAYER_WIDTH;
var status = 'start';
var score = 0;
var obstacles;
var nextSpawn = 0;
var spawnDist = 0+1;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    //setup func - sets up all sprites and groups
    console.log("setup: ");
    cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
    spaceShip = new Sprite(SCREENWIDTH/2, SCREENHEIGHT/2, 50, 50, 'd');
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
            spaceShip.vel.y = (spaceShip.vel.y - 1);
            console.log("go up");
        }
        if (event.code === 'ArrowDown') {
            // Set sprite's velocity upwards
            spaceShip.vel.y = (spaceShip.vel.y + 1);
            console.log("go down");
        }
        if (event.code === 'ArrowLeft') {
            // Set sprite's velocity upwards
            spaceShip.vel.x = (spaceShip.vel.x - 1);
            console.log("go left");
        }
        if (event.code === 'ArrowRight') {
            // Set sprite's velocity upwards
            spaceShip.vel.x = (spaceShip.vel.x + 1);
            console.log("go right");
        }
    });
    obstacles = new Group();
    spaceShip.collides(obstacles, deathScreen());
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

function newObstacle(){
    //Making obstacles - Called from GameScreen
    astroid = new Sprite(random(SCREENWIDTH), random(SCREENHEIGHT), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    astroid.color = 'black';
    astroid.bounciness = 0;
    astroid.friction = 0;
    astroid.moveTowards(spaceShip, 0.01);
    obstacles.add(astroid);
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
        newObstacle();
        nextSpawn = frameCount + random(20,200);
    }
    allSprites.visible = true;
    
    if (obstacles.collides(walls) == true) {
        console.log('remove astroid');
        
    }
    
    if (obstacles.collides(spaceShip) == true) {
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
