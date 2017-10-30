// Zombulator by Ben Nesbit

// Excercise 16

// Zombulator by Benjamin Nesbit (worked with Kayla in class)
// CS 160 Exercise 15: Zombie Objects vs Human Objects
// Challenge 1 : Complete!
// All Challenges completed through previous self-challenges or code clean up!

var backgroundColor;

const MIN_SIZE = 10; 
const MAX_SIZE = 25;
const MAX_POPULATION = 250;
const LOWER_ZOMBIE_POP_BOUND = .3;
const UPPER_ZOMBIE_POP_BOUND = .6;
// Using these to create a percentage change based off max population. These are passed to
// the random function so we get between a 30% and 60% ratio, randomly.

const HUMAN_SPAWN_BOUND = 150;
const ZOMBIE_SPAWN_BOUND = 150;
// The distance from the respective boundaries that each human and zombie can spawn.

const NEG_HUMAN_X = -2;
const POS_HUMAN_X = 2;
const NEG_HUMAN_Y = 1.0;
const POS_HUMAN_Y = 2.0;
const HUMAN_SPEED_MAX = 3.0;
const HUMAN_SPEED_MIN = 0.5;
// These are the constants that control the "Brownian motion" of the humans.
// Note that POS in the y category indicates the main direction we want the object moving.

const NEG_ZOMBIE_X = -2.25;
const POS_ZOMBIE_X = 2.25;
const NEG_ZOMBIE_Y = 0.5;
const POS_ZOMBIE_Y = 1.75;
const ZOMBIE_SPEED_MAX = 2.0;
const ZOMBIE_SPEED_MIN = 0.5;
// These are the constants that control the "Brownian motion" of the zombies.
// Note that POS in the y category indicates the main direction we want the object moving.

var NUMBER_OF_ZOMBIES;
var NUMBER_OF_HUMANS;

var populationTotal;

var counter;
var determine;

function setup() {

  	createCanvas(windowWidth, windowHeight);
  	backgroundColor = color('darkgray');

  	initializePopulation();

}

function draw() {

  	background(backgroundColor);
  	noStroke();

  	drawPopulation();
  	movePopulation();
  	trapPopulation();
}

function initializePopulation() {

	// for (var i = 0; i < MAX_POPULATION; ++i) {

	// 	determine = random(1);

	// 	if (determine == 0) {

	// 		initializeBeing(i, false);

	// 	}

	// 	else {

	// 		initializeBeing(i, true);
	// 	}
	// }

	NUMBER_OF_ZOMBIES = random((MAX_POPULATION * LOWER_ZOMBIE_POP_BOUND), (MAX_POPULATION * UPPER_ZOMBIE_POP_BOUND));  	
  	NUMBER_OF_ZOMBIES = Math.round(NUMBER_OF_ZOMBIES);
  	NUMBER_OF_HUMANS = MAX_POPULATION - NUMBER_OF_ZOMBIES;

  	populationTotal = [];

  	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
  		
  		initializeBeing(i, false);

  	} // Zombies.

  	for (var i = NUMBER_OF_ZOMBIES; i < MAX_POPULATION; ++i) {
  		
  		initializeBeing(i, true);

  	} // Humans.

}

function trapPopulation() {

	 for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
 		
 		trapZombie(populationTotal[i]);

  	}

	for (var i = NUMBER_OF_ZOMBIES; i < MAX_POPULATION; ++i) {
 		
 		trapHuman(populationTotal[i]);

  	}
}

function initializeBeing(index, alive) {

	if (alive == false) {
		
		initializeZombie(index);

	} // Zombies.

	else {
		
		initializeHuman(index);

	} // Humans.

}

function initializeZombie(index) {

	populationTotal[index] = {
		size: random(MIN_SIZE, MAX_SIZE), 
		x: random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2)),
		y: random(MAX_SIZE / 2, ZOMBIE_SPAWN_BOUND),
		color: color(random(200, 255), random(50, 100), random(50, 100), random(50, 150)),
		humanity: false,
		xSpeed: random(NEG_ZOMBIE_X, POS_ZOMBIE_X),
		ySpeed: random(ZOMBIE_SPEED_MIN, ZOMBIE_SPEED_MAX)
	};

}

function initializeHuman(index) {

	populationTotal[index] = {
		size: random(MIN_SIZE, MAX_SIZE),
		x: random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2)),
		y: random(windowHeight - HUMAN_SPAWN_BOUND, windowHeight - (MAX_SIZE / 2)),
		color: color(random(0, 30), random(0, 200), random(250, 255), random(50, 150)),
		humanity: true,
		xSpeed: random(NEG_HUMAN_X, POS_HUMAN_X),
		ySpeed: random(HUMAN_SPEED_MIN, HUMAN_SPEED_MAX)
	};

}

function drawPopulation() {

 	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
 		
 		drawBeing(populationTotal[i]);

  	}

	for (var i = NUMBER_OF_ZOMBIES; i < MAX_POPULATION; ++i) {
 		
 		drawBeing(populationTotal[i]);

  	}

}

function movePopulation() {

	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
 		
 		moveZombie(populationTotal[i]);

  	}

	for (var i = NUMBER_OF_ZOMBIES; i < MAX_POPULATION; ++i) {
 		
 		moveHuman(populationTotal[i]);

  	}
}

function drawBeing(being) {

	if (being.humanity == false) {
		
		drawZombie(being);

	} // Zombie.

	if (being.humanity == true) {

		drawHuman(being);

	} // Human.

}

function drawZombie(zombie) {

	zombieText();

	fill(zombie.color);
	ellipse(zombie.x, zombie.y, zombie.size, zombie.size);
}

function zombieText() {

	fill(random(200, 255), random(50, 100), random(50, 100));
	text('Zombies: ' + NUMBER_OF_ZOMBIES, windowWidth / 2, 200);

} // Displays the amount of zombies on the screen

function trapZombie(zombie) {

	if ((zombie.x - zombie.size / 2) <= 0) {
 		zombie.x = zombie.size / 2;
 	}
 	if ((zombie.x + (zombie.size / 2)) >= windowWidth) {
 		zombie.x = windowWidth - (zombie.size / 2);
 	} // Side boundary

 	if ((zombie.y + (zombie.size / 2)) >= windowHeight) {
 		zombie.y = (windowHeight - (zombie.size / 2));
 	} // Lower boundary

}

function moveZombie(zombie) {

	zombie.x += random(-1 * (zombie.xSpeed), zombie.xSpeed);
    zombie.y += random(-0.2 * (zombie.ySpeed), zombie.ySpeed);

}

function drawHuman(human) {

	humanText();

	fill(human.color);
	ellipse(human.x, human.y, human.size, human.size);

}

function humanText() {

	fill(random(0, 30), random(0, 200), random(250, 255));
	text('Humans: ' + NUMBER_OF_HUMANS, windowWidth / 2, windowHeight - 200);

}

function trapHuman(human) {

	if ((human.x - (human.size / 2)) <= 0) {
 		human.x = human.size / 2;
 	}
 	if ((human.x + (human.size / 2)) >= windowWidth) {
 		human.x = windowWidth - (human.size / 2);
 	}
 	// Side boundaries

 	if ((human.y - (human.size / 2)) <= 0) {
 		human.y = (human.size / 2);
 	} // Upper boundary

}

function moveHuman(human) {

	human.x += random(-1 * (human.xSpeed), human.xSpeed);
    human.y -= random(-0.2 * (human.ySpeed), human.ySpeed);

}