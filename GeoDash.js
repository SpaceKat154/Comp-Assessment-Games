/*******************************************************/
// P5.play: t22_keyboard
// Move sprite based on keyboard input
// Written by ???
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
  world.gravity.y = 10;
  //boxBox
  boxBoi = new Sprite(100, 350, 50, 50, 'd');
  boxBoi.color = 'yellow';
  boxBoi.bounciness = 0;
   document.addEventListener("keydown", function(event) {
      if (event.code === 'ArrowUp') {
          // Set sprite's velocity upwards
          boxBoi.vel.y = -5;
          console.log("go up");
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
