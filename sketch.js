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

	fill('red');
	ellipse(x, y, 20, 20);

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

var x, y, zY, zX;
//I wanted to call 'zX' and 'zY' switchX and switchY, but I think 'switch' is a function, and I did 
//not want to screw anything up. On the bright side, 'z' is much faster to type than 'switch.'

function setup(){
	createCanvas(720, 400);
	x = width/2;
	y = height/2;
	zY = 0;
	zX = 0; 
	fill('orange');
}

function draw(){
	background('gray');

	// fill(random(255),random(255),random(255)); //HAHA IT WORKS!!!
	ellipse(x, y, 20, 20);

	//x += random(-5, 5);
	if(zX == 0 && zY == 0){
		fill('red');
	}
	if(zX == 0 && zY == 1){
		fill('blue');
	}
	if(zX == 1 && zY == 0){
		fill('purple');
	}
	if(zX == 1 && zY == 1){
		fill('yellow');
	}


	// if(x < 0){
	// 	x = width;
	// }
	// if(x > width){
	// 	x = 0;
	// }
	//Allows the x-position to screen wrap. Took this out to make the x-position do what
	//the y-position is doing.

	if(zY == 0){
		y += 3.14;
	}
	if(zY == 0 && y > height){
		zY = 1;
	}

	if(zY == 1){
		y -= 3.14;
	}
	if(zY == 1 && y < 0){
		zY = 0;
	}
	//Attempt at making the y-position "bounce" between the boundaries.
	//Holy cow! My first idea actually worked!

	if(zX == 0){
		x += 3.14;
	}
	if(zX == 0 && x > width){
		zX = 1;
	}

	if(zX == 1){
		x -= 3.14;
	}
	if(zX == 1 && x < 0){
		zX = 0;
	}
}