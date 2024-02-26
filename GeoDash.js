/*******************************************************/
// P5.play: GeoDash Demo Game
// Demo Game
// Written by Byron Thistoll
/*******************************************************/
console.log("%c t22_keyboard.js", "color: blue;");

const SCREENHEIGHT = 920;
const SCREENWIDTH = 1920;

/*******************************************************/
// setup()
/*******************************************************/
//copy paste code from tech website
function setup() {
  console.log("setup: ");
  cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);
  world.gravity.y = 274;
  //boxBox
  boxBoi = new Sprite(100, 350, 50, 50, 'd');
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
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  background("blue");
}

/*******************************************************/
//  END OF APP
/*******************************************************/
//hehe
