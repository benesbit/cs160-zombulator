// Zombulator by Ben Nesbit

/*
function setup() {
	createCanvas(displayWidth, displayHeight);
}*/

//CHALLENGE 1 AND 2
//draws several circles, in specific spots according to what code says
/*function draw() {
	fill(255, 0, 0);
	ellipse(50, 50, 80, 80);
	fill(150, 150, 200);
	ellipse(200, 100, 80, 80);
	fill(255, 0, 168);
	ellipse(345, 210, 110, 110);
	fill(150, 201, 75);
	ellipse(450, 450, 50, 50);
}*/

//Spawns circles that follow the mouse, and are a different color when the mouse button is pressed.
/*function draw() {
if (mouseIsPressed) {
		fill(67, 0, 168);
	} else {
		fill(102, 200, 212);
	}
	//If the mouse button is pressed, the cirlce will be one color, if the mouse button is not
	//being pressed, the circle will be a differnt color.
	//NOTE: Did not realize that the syntax of the loop causes circles to be constantly drawn. 
	//If the mouse is pressed, we get one color. The else means that when the mouse is not 
	//being pressed (which is at all other times) to keep drawing circles of the other color.
	ellipse(mouseX, mouseY, 90, 90);
}*/

//CHALLENGE 3
//Spawns a small red circle that is stuck on the mouse inside the window display
/*function draw(){
	background(0);

  	fill('red');
  	ellipse(mouseX, mouseY, 20, 20);
}*/

//CHALLENGE 4
//Spawns a small circle that moves around on its own.
//After several attempts, I found a template on p5js.org
//I was unable to get this to work until I declared the variables outside 
//of the functions, and I am not really sure why. This one also has a unique
//'function setup()' from the other functions.
/*
var x, y;

function setup(){
	createCanvas(720, 400);

	x = width/2;
	y = height/2;
	//Sets original position of circle to the center of the display.
}

function draw(){
	background('gray');

	fill(random(255),random(255),random(255));
	ellipse(x, y, 20, 20);
	strokeWeight(5);
	stroke(random(255),random(255),random(255));

	x += random(-15, 15);
	//From reading the help on p5js.org, this function 'jiggles' the circles on the x-axis,
	//adding -[value1] or +[value2] for x each time.
	//y += random(-5, 5); //This moves y randomly.
	y += 3.14; //This moves y constantly
	//NOTE: I am not sure why these statements do not need to be in loops.

	if(y>height){
		y = 0;
	}
	//Resets y to the top of window when it crosses outside of the boundry.
	
	
	// if(y<0 || y>400){
	// 	y = height/2;
	// }
	//Resets y to the center of window when it crosses outside of the boundry.
	//Was trying to get it so hat if the circle hit a y-boundry, it would change directions. I think
	//I need to put a 'do/while' (with a booleen value !=) loop inside of an 'if' conditional.


	if(x < 0){
		x = width;
	}
	if(x > width){
		x = 0;
	}
	//Allows x to screen wrap in both directions
}
*/

//CHALLENGE 5 attempt 1 (ugly, see below for attempt 2)
//Spawns hunderds of circles, using a few lines of code. But only in a line. No good pattern, need two seperate loops
//in order to better control my (x,y) coordinates in the canvas.
/*function draw() {
	for(var n = 25; n <= 250; n++)
	{
		fill(n, 250-n, 250/n);
		ellipse(n, 2*n, 20, 20);
	}
}*/

//CHALLENGE 5, attempt 2 (MUCH better, but could still use some work)
//Spawns circles in a better pattern, with a gradual color change. There is a solid red background.
/*function draw(){
	background('red');

	for(var y=0; y <= height; y += 25){
		//This first 'for' loop will create a single column of cirlces, 25 pxl apart until the bounds of canvas,
		//starting from the top of the canvas.
		//IN SHORT: Controls the y-position of the cricles.
		for(var x=0; x <=width; x += 25){
			//This second for loop creates a single row of of circles, with a spacing of 25 pxls. This loops
			//continues creating circles until they would be outside the bounds of the canvas.
			//IN SHORT: Controls the x-position of the circles.
			//if((x < 250) || (y < 250)){
			//	fill(x/(y+1), 250-x, 250-y);
			//}
			//else{
				fill((x/4)/((y/4)+1), 300-(x/4), 300-(y/4));
			//}
			//This is a mathematically (shitty) way to have the colors change gradually. The if/else was a quick
			//fix to give an interesting "windowed" look to the slow color change. Got rid of if/else loop, 
			//I like this look better, but..
			//Could be down better with an additional var?
				ellipse(x, y, 25, 25);
		}
	}
}*/

//This is test code to try and get the ball to bounce back and forth between the y-bounds.
//Basically, as the ball travels in the -y direction, when it hit the lower y-boundry it will
//siwtch directions and start moving in the +y direction.
//Update! Made the ball change directions whenever it comes in contact with a wall! Looks like 
//the old Windows screen-savers haha
//Update 2! Made the ball change colors at random. SIEZURE TIME!!
/*
var x, y, zY, zX;
//I wanted to call 'zX' and 'zY' switchX and switchY, but I think 'switch' is a function, and I did 
//not want to screw anything up. On the bright side, 'z' is much faster to type than 'switch.'

function setup(){
	createCanvas(720, 400);
	x = width/2;
	y = height/2;
	zY = 0;
	zX = 0; 
	// fill('orange'); Realized this is unnecessary as zX and zY both start at 0, and I have a
	//condition for this already.
}

function draw(){
	background('gray');

	// fill(random(255),random(255),random(255)); //HAHA IT WORKS!!!
	ellipse(x, y, 20, 20);

	//x += random(-5, 5);
	// if (zX == 0 && zY == 0) {
	// 	fill('red');
	// }
	// if (zX == 0 && zY == 1) {
	// 	fill('blue');
	// }
	// if (zX == 1 && zY == 0) {
	// 	fill('purple');
	// }
	// if (zX == 1 && zY == 1) {
	// 	fill('yellow');
	// }

	fill(random(255), random(255), random(255));
	strokeWeight(5);
	stroke(random(255), random(255), random(255));


	// if(x < 0){
	// 	x = width;
	// }
	// if(x > width){
	// 	x = 0;
	// }
	//Allows the x-position to screen wrap. Took this out to make the x-position do what
	//the y-position is doing.

	if (zY == 0) {
		y += 3.14;
	}
	if (zY == 0 && y > height) {
		zY = 1;
	}

	if (zY == 1) {
		y -= 3.14;
	}
	if (zY == 1 && y < 0) {
		zY = 0;
	}
	//Attempt at making the y-position "bounce" between the boundaries.
	//Holy cow! My first idea actually worked!

	if (zX == 0) {
		x += 3.14;
	}
	if (zX == 0 && x > width) {
		zX = 1;
	}

	if (zX == 1) {
		x -= 3.14;
	}
	if (zX == 1 && x < 0) {
		zX = 0;
	}
	//Same 'boundry bouncing' as the y-position, but for the x-position
}
*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// START EXCERCISE 8
// This will be a constantly changing piece of code as I try and work my way
// towards the final challenge in this excersize. This ends at the second to
// last challenge, I am going to attempt branching for the final challenge.
// NOTE: the way I have these accelerate causes them to move so fast that they
// are outside the range and can no longer be drawn. LuL.
/*
var x, t, n, y, zY, zX, zT, zN;
var xSpeed, tSpeed, nSpeed;

function setup(){
	createCanvas(700, 420);
	x = 0;
	t = 0;
	n = 0;
	y = 0;
	zY = 0;
	zT = 0;
	zN = 0;
	zX = 0;
	xSpeed = 3;
	tSpeed = 5;
	nSpeed = 7;
}

function draw(){

	background('gray');

	// 'x' ball
	fill(random(255), random(255), random(255));
	strokeWeight(5);
	stroke(random(255), random(255), random(255));
	ellipse(x, 50, 20, 20);

	// 't' ball
	fill(random(255), random(255), random(255));
	strokeWeight(5);
	stroke(random(255), random(255), random(255));
	ellipse(t, 100, 20, 20);

	// 'n' ball
	fill(random(255), random(255), random(255));
	strokeWeight(5);
	stroke(random(255), random(255), random(255));
	ellipse(n, 250, 20, 20);


	// FOR x
	if (zX == 0) {
		x += xSpeed;
	}
	if (zX == 0 && x > width) {
		zX = 1;
		xSpeed += 2;
	}

	if (zX == 1) {
		x -= xSpeed;
	}
	if (zX == 1 && x < 0) {
		zX = 0;
		xSpeed += 2;
	}

	//FOR t
	if (zT == 0) {
		t += tSpeed;
	}
	if (zT == 0 && t > width) {
		zT = 1;
		tSpeed += xSpeed;
	}

	if (zT == 1) {
		t -= tSpeed;
	}
	if (zT == 1 && t < 0) {
		zT = 0;
		tSpeed -= xSpeed;
	}

	//FOR n
	if (zN == 0) {
		n += nSpeed;
	}
	if (zN == 0 && n > width) {
		zN = 1;
		nSpeed *= 3;
	}

	if (zN == 1) {
		n -= nSpeed;
	}
	if (zN == 1 && n < 0) {
		zN = 0;
		nSpeed /= 2;
	}
}
*/

// FINAL CHALLENGE FOR EXCERSIZE 8!
// Make a ball bounce, and have "gravity" effect it
// NOTE! Still needs work as something very weird happens when the ball "stops" bouncing
// When it should come to rest, it startis bouncing in the y-cord very erratically.

/*
var x, y, zX, zY, k, h, b, ySpeed, c, yS, yB;

function setup(){
	createCanvas(800,420);
	x = 0; //x position
	y = 0; //y position
	zX = 0; //x directional modifier
	zY = 0; //y directional modifier 
	// k = 5;
	// h = height/2;
	b = 0; //slow down increment for x-axis
	c = 0; //deterines if ball was just trown or has started bouncing
	ySpeed = 0; //the change in how fast y moves
	yS = .075; //the change in ySpeed
	yB = 6; //the speed y is moving at
	fill(random(255), random(255), random(255));
	strokeWeight(5);
	stroke(random(255), random(255), random(255));
}

function draw(){

	background('gray');

	// fill('red');
	// strokeWeight(5);
	// stroke('blue');
	ellipse(x, y, 20, 20);

	if (c == 0) {
		if (zY == 0) {
			y += yB;
		}
	}

	if (c == 1) {
		if (zY == 0) {
			y += (yB - ySpeed);
			ySpeed -= yS;
		}
	}

	if (zY == 0 && y >= height) {
		zY = 1;
		// h = h + k;
		// k += 10; //I had to use 2 variables to accomplish the y-bounce. 'h' is the 
		// 		 //height boundary each time. 'k' is the variable adjusting 'h.'
		// 		 //I needed 2 variables because I use 'h' later, and I cannot have 
		// 		 //it change to 'k' until I am finished using 'h.'
		b += .5; //This is slowing down the "x-speed" w/ every bounce.
		// fill(random(255), random(255), random(255));
		// stroke(random(255), random(255), random(255));
		c = 1;
		ySpeed = 0;
		yB -= .5;
	}
	if (y >= height) {
		fill(random(255), random(255), random(255));
		stroke(random(255), random(255), random(255));
	} //Need to move the ball color change into this loop because 
	  //it would change forever after ball stopped bouncing.
	  //Now the ball remains the color it was after its final bounce.
	
	
	if (zY == 1 && yB >= 0) {
		y -= (yB - ySpeed);
		ySpeed += yS;
	}
	if (zY == 1 && ySpeed >= yB) {
		zY = 0;
	}
	//Attempt at making the y-position "bounce" like a ball


	if (zX == 0 && b < 5) {
		x += 5 - b;
	}
	if (zX == 0 && x > width) {
		zX = 1;
	}
	if (zX == 1 && b < 5) {
		x -= 5 - b;
	}
	if (zX == 1 && x < 0) {
		zX = 0;
	}
	//Constant x-boundary bouncing, with the "x-speed" decellerating
	//and evenetaully coming to a stop. Done matemataically, And it stops
	//because 'b' eventaully becomes greater than 5, so the loops that move
	//x no longer are entered.
}
*/


// Web development excercise 9. Need to make 2 seperate balls bounce
// independentally of eachother. Do not need to change the x-position
// (which) is unfortunate because this is the easy part!

/*
var zombieY, zombieX, zombieV, zombieA, zombieDamping, zombieSize, zombieColor, backgroundColor;
var humanY, humanV, humanA, humanDamping, humanSize, humanColor, humanColor;
var humanX, humanXV, humanXA, humanSw;
var img, imgX, imgY, imgYA, imgDamping;


function preload() {
	img = loadImage("https://i.pinimg.com/736x/e9/56/42/e95642e70ec7b2494f176165e983a02c--the-minish-cap-link-zelda.jpg");

	loadImage("https://i.pinimg.com/736x/e9/56/42/e95642e70ec7b2494f176165e983a02c--the-minish-cap-link-zelda.jpg", function(img){
		image(img, 0, 0);
	});
}
*/
/*
function setup() {
	createCanvas(720, 400);

	zombieY = 100; // Zombie position, y-cord
	zombieX = height / 2; // Zombie position, x-cord
	zombieV = 0; // Zombie velocity
	zombieA = 0.2; // Zombie acceleration due to gravity
	zombieDamping = -0.5; // Zombie deceleration due to inertia lost per bounce (higher bounces more)
	zombieSize = 80; // Size of the zombie

	humanY = 100; // Human y-cord starting position
	humanX = 100; // Human x-cord starting position
	humanV = 0; // Human velocity in y-cord
	humanVX = 10; // Human velocity in x-cord
	humanA = 0.3; // Human acceleration due to gravity
	humanVA = 0.75 // Deceleration in x-cord
	humanDamping = -0.7; // Human deceleration due to inertia lost per bounce (higher number bounces more)
	humanSize = 80; // Size of the human
	humanSw = 0; // Switch x direction

	imgX = 400;
	imgY = 200;

	
	backgroundColor = color(114, 168, 255);


	zombieColor = color(242, 255, 0);
	humanColor = color(random(256), random(256), random(256));
}

function draw(){
	background(backgroundColor);
	noStroke();

	drawZombie();

	moveZombie();

	drawHuman();

  	moveHuman();
}


function drawZombie(){
	fill(zombieColor);
	rect(zombieX, zombieY, zombieSize, zombieSize, 20);
	fill(0);
	text("zombie", zombieX + (zombieSize / 4), zombieY + (zombieSize / 2));	
}

function moveZombie(){
	zombieY += zombieV;  // Position changing due to velocity
	zombieV += zombieA;  // Velocity changing due to acceleration

	if (zombieY + (zombieSize) >= height) {
	 	zombieY = height - (zombieSize);
    	zombieV *= zombieDamping;
    	zColor();
  	} //Won't allow zombie to go outside boundary, and dampens the bounce each time	
}

function zColor(){
	zombieColor = color(random(256), random(256), random(256));
}

function drawHuman(){
	fill(humanColor);
  	rect(humanX, humanY, humanSize, humanSize, 20);
  	fill(0);
  	text("human", humanX + (humanSize / 4), humanY + (humanSize / 2));
}

function moveHuman(){
	// humanY += humanV;
	// humanX += humanVX;

 	//humanV += humanA;
  	
  	// if (humanVA >= 0 && abs(humanVX) >=0){
  	
  	if (humanVX >= 0) {
  		humanY += humanV;
		humanX += humanVX;

  		humanV += humanA;
  	}
	else {
  		humanY += humanV;
		humanX -= humanVX;

  		humanV += humanA;
  	}
	

	if (humanY + (humanSize) >= height) {
		humanY = height - (humanSize);
 	  	humanV *= humanDamping;
   		humanVX -= humanVA;
   		// humanD = 1;
   	}

  	if (humanX + (humanSize) >= width) {
   		humanX = width - (humanSize);
   		humanVX *= -1;
   		humanVA -= 0.5;
    		// humandSw = 1;
	}

	if (humanX - (humanSize / 2) <= 0) {
   		humanX = 0 + (humanSize / 2);
   		humanVX *= -1;
   		// humanVA -= 0.5;
   		// humanSw = 0;
	}
	//}
}*/


// Zombulator by Ben and Hannah
// CS 160 Exercise 12: Function practice. Preamble to arrays.
// This is the paired programming that Hannah and myself worked on in class.

/*
var backgroundColor;

const MIN_SIZE = 25;
const MAX_SIZE = 100;

var zombieX;
var zombieY;
var zombieSize;
var zombieColor;

var humanX;
var humanY;
var humanSize;
var humanColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color('lightgray');
  initializeZombie();
  initializeHuman();
}

function draw() {
  background(backgroundColor);
  noStroke();

  drawZombie();
  drawHuman();
}

function initializeZombie() {
  // zombieX = random(0, windowWidth);
  // zombieY = random(0, 200);
  zombieSize = random(MIN_SIZE, MAX_SIZE);
  zombieX = random(zombieSize / 2, windowWidth - (zombieSize / 2));
  zombieY = random(zombieSize / 2, 200);
  zombieColor = color(random(50, 255), random(50, 255), random(50, 255), random(100, 150));
}

function initializeHuman() {
  // humanX = random(0, windowWidth);
  // humanY = random(windowHeight - 200, windowHeight);
  humanSize = random(MIN_SIZE, MAX_SIZE);
  humanX = random(humanSize / 2, windowWidth - (humanSize / 2));
  humanY = random(windowHeight - 200, windowHeight - (humanSize / 2));
  humanColor = color(random(256), random(256), random(256), random(100, 150));
}

function drawZombie() {
  fill(zombieColor);
  ellipse(zombieX, zombieY, zombieSize, zombieSize);
}

function drawHuman() {
  fill(humanColor);
  ellipse(humanX, humanY, humanSize, humanSize);
}

*/

// Zombulator by Ben (in class work with Hannah shown above)
// CS 160 Exercise 12: Function practice. Preamble to arrays.
// Below is myself working on the challenge code.

var backgroundColor;

const MIN_SIZE = 20; 
const MAX_SIZE = 50;
const HUMAN_LENGTH = 1000;

var zombieX;
var zombieY;
var zombieSize;
var zombieColor;

var humanX = new Array(HUMAN_LENGTH);
var humanY = new Array(HUMAN_LENGTH);
var humanSize = new Array(HUMAN_LENGTH);
var humanColor = new Array(HUMAN_LENGTH);

var penColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color('lightgray');
  // penColor = color(random(256), random(256), random(256));

  initializeZombie();
  initializeHuman();
}

function draw() {
  background(backgroundColor);
  noStroke();

  penColor = color(random(256), random(256), random(256));

  drawZombie();
  drawHuman();
}

function initializeZombie() {
  zombieSize = random(MIN_SIZE, MAX_SIZE);
  zombieX = random(zombieSize / 2, windowWidth - (zombieSize / 2));
  zombieY = random(zombieSize / 2, 150);
  zombieColor = color(random(50, 255), random(50, 255), random(50, 255), random(100, 150));
}

function initializeHuman() {
  for (c = 0; c < HUMAN_LENGTH; c++) {
  	humanSize[c] = random(MIN_SIZE, MAX_SIZE);
  	humanX[c] = random(humanSize[c] / 2, windowWidth - (humanSize[c] / 2));
  	humanColor[c] = color(random(256), random(256), random(256), random(100, 150));
  	humanY[c] = random(windowHeight - 50, windowHeight - (humanSize[c] / 2));
  }
}


function drawZombie() {
  fill(zombieColor);
  ellipse(zombieX, zombieY, zombieSize, zombieSize);
  fill(penColor);
  text('The Lonely' + '\n' + 'Zombie', zombieX, zombieY);
}

function drawHuman() {
  for (c = 0; c < HUMAN_LENGTH; c++) {
 	if ((humanX[c] - (humanSize[c] / 2)) <= 0) {
 		humanX[c] = humanSize[c] / 2;
 	}
 	if ((humanX[c] + (humanSize[c] / 2)) >= windowWidth){
 		humanX[c] = windowWidth - (humanSize[c] / 2);
 	}
 	//These two 'if' loops keep human from going outside vertical boundaries
 	//They basically check all of the humanX postions, and if it finds any part
 	//of them to outside the vertical boundaries, it adjust their position so that
 	//they are 100% within the boundary, and just sets them on the very edge of
 	//the boundary they tried to leave.

 	fill(humanColor[c]);
 	ellipse(humanX[c], humanY[c], humanSize[c], humanSize[c]); //These two lines are daring human number [c].

 	// text('Human', humanX[c], humanY[c], humanSize[c], humanSize[c]); //This was added for fun, pointless tho.
 	//^^ That crated even MORE lag than the 1000 humans already do.

 	humanX[c] += random(-4, 4);
  	humanY[c] -= random(-1, 3);
  }
  //This 'for' loop is is drawing the array of humans. It will go through all the code in 
  //in the loop 'HUMAN_LENGTH' amount of times.
  //The last two lines control the movement of the humans.
}