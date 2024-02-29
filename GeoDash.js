/*******************************************************/
// P5.play: GeoDash Demo Game
// Demo Game
// Written by Byron Thistoll
/*******************************************************/
console.log("%c t22_keyboard.js", "color: blue;");

//variables
const SCREENHEIGHT = 920;
const SCREENWIDTH = 1920;
var status = 'start';

/*******************************************************/
// setup()
/*******************************************************/
//copy paste code from tech website
function setup() {
  console.log("setup: ");
  cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
  world.gravity.y = 274;
  //boxBox
  boxBoi = new Sprite(200, 350, 50, 50, 'd');
  boxBoi.color = 'yellow';
  boxBoi.bounciness = 0;
   document.addEventListener("keydown", function(event) {
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
  
  //obstacles
  spike = new Sprite(SCREENWIDTH - 100, 350, 20, 30, 'd');
  spike.color = 'black';
  spike.bounciness = 0;
  spike.friction = 0;
  spike.vel.x = -10;
  if (spike.x == 10){
      spike.x = SCREENWIDTH - 100;
  }
  
  boxBoi.collides(spike, deathScreen());
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  if (status == 'start'){
      startScreen();
  } else if (status == 'game') {
      gameScreen();
  } else if (status == 'death'){
      deathScreen();
  }
}

function startScreen(){
    background('gray');
    status = 'game';
}

function gameScreen(){
    background('blue');
    if (spike.x == 10){
      spike.x = SCREENWIDTH - 100;
    }
    if (spike.collides(boxBoi) == true) {
        status = 'death';
    }
}

function deathScreen() {
    console.log('you died');
    background("red");
}
/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
