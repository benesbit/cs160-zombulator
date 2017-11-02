// Zombulator by Benjamin Nesbit 
// CS 160 Exercise 19 - Polymorphism

var backgroundColor;

const MIN_SIZE = 10; 
const MAX_SIZE = 25;
const MAX_POPULATION = 50;
const LOWER_ZOMBIE_POP_BOUND = .35;
const UPPER_ZOMBIE_POP_BOUND = .6;
// Using these to create a percentage change based off max population. These are passed to
// the random function so we get between a 35% and 60% ratio, randomly.

const HUMAN_SPAWN_BOUND = 150;
const ZOMBIE_SPAWN_BOUND = 150;
// The distance from the respective boundaries that each human and zombie can spawn.

const NEG_HUMAN_X = -2;
const POS_HUMAN_X = 2;
const NEG_HUMAN_Y = 1.0;
const POS_HUMAN_Y = 2.0;
const HUMAN_SPEED_MAX = 3.0;
const HUMAN_SPEED_MIN = 0.75;
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

var NUMBER_OF_ZOMBIES = 0;
var NUMBER_OF_SUPER_ZOMBIES = 0;

var NUMBER_OF_HUMANS = 0;
var NUMBER_OF_SUPER_HUMANS = 0;

var populationTotal = [];

function setup() {

  	createCanvas(windowWidth, windowHeight);
  	backgroundColor = color('darkgray');
  	// createCanvas(720, 400);
  	// backgroundColor = loadImage("https://www.homoq.com/wp-content/uploads/2017/08/lesco-grass-seed-720x400.jpg");

  	initializePopulation();

}

function draw() {

  	background(backgroundColor);
  	noStroke();

  	drawPopulation();
  	movePopulation();
  	trapPopulation();

  	drawText();

  	collisionDetect();
}

function initializePopulation() {

	// NUMBER_OF_ZOMBIES = random((MAX_POPULATION * LOWER_ZOMBIE_POP_BOUND), (MAX_POPULATION * UPPER_ZOMBIE_POP_BOUND));  	
 //  	NUMBER_OF_ZOMBIES = Math.round(NUMBER_OF_ZOMBIES);
 //  	NUMBER_OF_HUMANS = MAX_POPULATION - NUMBER_OF_ZOMBIES;

 //  	for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
  		
 //  		populationTotal[i] = initializeZombie();

 //  	} // Zombies.

 //  	for (var i = NUMBER_OF_ZOMBIES; i < MAX_POPULATION; ++i) {
  		
 //  		populationTotal[i] = initializeHuman();

 //  	} // Humans.

  	for (var i = 0; i < MAX_POPULATION; ++i) {

  		var humanoid_type = random(0, 100);

  		if (humanoid_type <= 5) {

  			populationTotal[i] = initializeSuperZombie();

  			NUMBER_OF_ZOMBIES ++;
  			NUMBER_OF_SUPER_ZOMBIES ++;
  		}
  		else if (humanoid_type <= 50) {

  			populationTotal[i] = initializeZombie();

  			NUMBER_OF_ZOMBIES ++;
  		}
  		else if (humanoid_type <= 95) {

  			populationTotal[i] = initializeHuman();

  			NUMBER_OF_HUMANS ++;
  		}
  		else {

  			populationTotal[i] = initializeSuperHuman();

  			NUMBER_OF_HUMANS ++;
  			NUMBER_OF_SUPER_HUMANS ++;
  		}
  	}

}

function initializeZombie() {

	return {
		size: random(MIN_SIZE, MAX_SIZE),
		vector: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(MAX_SIZE / 2, ZOMBIE_SPAWN_BOUND))),
		color: color(random(200, 255), random(50, 100), random(50, 100), random(50, 150)),
		humanity: false,
		xSpeed: random(NEG_ZOMBIE_X, POS_ZOMBIE_X),
		ySpeed: random(ZOMBIE_SPEED_MIN, ZOMBIE_SPEED_MAX),
		draw: function() {
			fill(this.color);
			ellipse(this.vector.x, this.vector.y, this.size, this.size);
		},
		move: function() {
     		this.vector.add((random(-1 * (this.xSpeed), this.xSpeed)), (random(-0.2 * (this.ySpeed), this.ySpeed)));
		},
		trap: function() {
			if ((this.vector.x - this.size / 2) <= 0) {
 				this.vector.x = this.size / 2;
 			}
 			if ((this.vector.x + (this.size / 2)) >= windowWidth) {
 				this.vector.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.vector.y + (this.size / 2)) >= windowHeight) {
 				this.vector.y = (windowHeight - (this.size / 2));
 			} // Lower boundary
		}
	};

}

function initializeSuperZombie() {

	return {
		size: random(MAX_SIZE*1.5, MAX_SIZE*2), // BIGGER
		vector: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(MAX_SIZE / 2, ZOMBIE_SPAWN_BOUND))),
		color: color(random(200, 255), random(50, 100), random(50, 100), random(50, 150)),
		humanity: false,
		xSpeed: random(NEG_ZOMBIE_X, POS_ZOMBIE_X),
		ySpeed: random(ZOMBIE_SPEED_MIN * 5, ZOMBIE_SPEED_MAX * 2), // FASTER
		draw: function() {
			fill(this.color);
			ellipse(this.vector.x, this.vector.y, this.size, this.size);
		},
		move: function() {
     		this.vector.add((random(-0.2 * (this.xSpeed), this.xSpeed)), (random(-0.2 * (this.ySpeed), this.ySpeed)));
		},
		trap: function() {
			if ((this.vector.x - this.size / 2) <= 0) {
 				this.vector.x = this.size / 2;
 			}
 			if ((this.vector.x + (this.size / 2)) >= windowWidth) {
 				this.vector.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.vector.y + (this.size / 2)) >= windowHeight) {
 				this.vector.y = (windowHeight - (this.size / 2));
 			} // Lower boundary
		}
	};

}

function initializeHuman() {

	return {
		size: random(MIN_SIZE, MAX_SIZE),
		vector: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(windowHeight - HUMAN_SPAWN_BOUND, windowHeight - (MAX_SIZE / 2)))),
		color: color(random(0, 30), random(0, 200), random(250, 255), random(50, 150)),
		humanity: true,
		xSpeed: random(NEG_HUMAN_X, POS_HUMAN_X),
		ySpeed: random(HUMAN_SPEED_MIN, HUMAN_SPEED_MAX),
		draw: function() {
			fill(this.color);
			ellipse(this.vector.x, this.vector.y, this.size, this.size);
		},
		move: function() {
			this.vector.add((random(-1 * (this.xSpeed), this.xSpeed)), (-1 *random(-0.2 * (this.ySpeed), this.ySpeed)));
		},
		trap: function() {
			if ((this.vector.x - (this.size / 2)) <= 0) {
 				this.vector.x = this.size / 2;
 			}
 			if ((this.vector.x + (this.size / 2)) >= windowWidth) {
 				this.vector.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.vector.y - (this.size / 2)) <= 0) {
 				this.vector.y = (this.size / 2);
 			} // Upper boundary
		}
	};

}

function initializeSuperHuman() {

	return {
		size: random(MAX_SIZE * 1.5, MAX_SIZE * 2), // BIGGER
		vector: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(windowHeight - HUMAN_SPAWN_BOUND, windowHeight - (MAX_SIZE / 2)))),
		color: color(random(0, 30), random(0, 200), random(250, 255), random(50, 150)),
		humanity: true,
		xSpeed: random(NEG_HUMAN_X, POS_HUMAN_X),
		ySpeed: random(HUMAN_SPEED_MIN * 5, HUMAN_SPEED_MAX * 2), // FASTER
		draw: function() {
			fill(this.color);
			ellipse(this.vector.x, this.vector.y, this.size, this.size);
		},
		move: function() {
			this.vector.add((random(-1 * (this.xSpeed), this.xSpeed)), (-1 *random(-0.1 * (this.ySpeed), this.ySpeed)));
		},
		trap: function() {
			if ((this.vector.x - (this.size / 2)) <= 0) {
 				this.vector.x = this.size / 2;
 			}
 			if ((this.vector.x + (this.size / 2)) >= windowWidth) {
 				this.vector.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.vector.y - (this.size / 2)) <= 0) {
 				this.vector.y = (this.size / 2);
 			} // Upper boundary
		}
	};

}

function drawPopulation() {

 	for (var i = 0; i < MAX_POPULATION; ++i) {
 		
 		populationTotal[i].draw();

  	}
}

function movePopulation() {

	for (var i = 0; i < MAX_POPULATION; ++i) {
 		
 		populationTotal[i].move();

  	}
}

function trapPopulation() {

	 for (var i = 0; i < MAX_POPULATION; ++i) {
 		
 		populationTotal[i].trap();

  	}
}

function drawText() {

	zombieText();
	humanText();
}

function zombieText() {

	fill(random(200, 255), random(50, 100), random(50, 100));
	text('Zombies: ' + NUMBER_OF_ZOMBIES, windowWidth / 2, windowHeight / 4);
	text('Percentage of Hulk Zombies: ' + Math.round((NUMBER_OF_SUPER_ZOMBIES/NUMBER_OF_ZOMBIES) * 100) + '%', windowWidth / 2, (windowHeight / 4) + 11);

} // Displays the amount of zombies on the screen

function humanText() {

	fill(random(0, 30), random(0, 200), random(250, 255));
	text('Humans: ' + NUMBER_OF_HUMANS, windowWidth / 2, windowHeight / 1.5);
	text('Percentage of Super Humans: ' + Math.round((NUMBER_OF_SUPER_HUMANS/NUMBER_OF_HUMANS) * 100) + '%', windowWidth / 2, (windowHeight / 1.5) + 11);

} // Displays the amount of humans on the screen

function collisionDetect() {

	for (var i = 0; i < (MAX_POPULATION - 1); ++i) {

		var body1 = populationTotal[i];
		var body2 = populationTotal[i+1];

		if ((body1.humanity == false && body2.humanity == true) || (body1.humanity == true && body2.humanity == false)) {

			// for (var k = i + 1; k < MAX_POPULATION; ++i) {

				// var body2 = populationTotal[k];

				// if (body2.humanity == true) {

					var dx = body1.vector.x - body2.vector.x;
					var dy = body1.vector.y - body2.vector.y;
					var distance = Math.sqrt((dx * dx) + (dy *dy));

					if (distance < ((body1.size)) + ((body2.size))) {
						print("FIGHT!!");
					}
				// }
			// }
		}
	}
}