/*******************************************************/
// P5.play: GeoDash Demo Game
// Demo Game
// Written by Byron Thistoll
/*******************************************************/
console.log("%c t22_keyboard.js", "color: blue;");

//variables
const SCREENHEIGHT = 920;
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
    world.gravity.y = 274;
    //boxBox
    boxBoi = new Sprite(200, 350, 50, 50, 'd');
    boxBoi.color = 'yellow';
    boxBoi.bounciness = 0;
    document.addEventListener("keydown", function(event) {
        if (status == 'start'){
           status = 'game';
        }
        if (event.code === 'ArrowUp') {
            if (boxBoi.vel.y == 0){
                // Set sprite's velocity upwards
                boxBoi.vel.y = -50;
                console.log("go up");
            } 
        }
    });
    
    //Floor
    wallBot = new Sprite(width/2, height-8, width, 8, 'k');
    wallBot.color = 'green';
    wallBot.bounciness = 0;
    obstacles = new Group();
    boxBoi.collides(obstacles, deathScreen());
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
    spike = new Sprite((SCREENWIDTH -100),  (SCREENHEIGHT - OBSTACLE_HEIGHT + 10), OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    spike.color = 'black';
    spike.bounciness = 0;
    spike.friction = 0;
    spike.vel.x = -10;
    obstacles.add(spike);
}

function startScreen(){
    //Start Screen - called from draw
    background('gray');
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to GeoRunner", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);
    text("Press Arrow up to jump", 50, 150);
}

function gameScreen(){
    //The game screen - called from draw and startScreen
    background('blue');
    score++;
    if(frameCount> nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(20,200);
    }
    allSprites.visible = true;
    if (spike.x == 10){
        spike.x = SCREENWIDTH - 100;
    }
    if (obstacles.collides(boxBoi) == true) {
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
