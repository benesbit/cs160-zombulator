// Zombulator by Benjamin Nesbit 
// CS 160 Exercise 20 - Collisions

var backgroundColor;

const MIN_SIZE = 10; 
const MAX_SIZE = 25;
const MAX_POPULATION = 100;

const HUMAN_SPAWN_BOUND = 150;
const ZOMBIE_SPAWN_BOUND = 150;

const MIN_HUMAN_HORIZONTAL_VELOCITY = -2;
const MAX_HUMAN_HORIZONTAL_VELOCITY = 2;
const HUMAN_SPEED_MAX = 2.2;
const HUMAN_SPEED_MIN = 0.75;
const HUMAN_ACCEL_BOUND = 1.5;

const MIN_ZOMBIE_HORIZONTAL_VELOCITY = -1.75;
const MAX_ZOMBIE_HORIZONTAL_VELOCITY = 1.75;
const ZOMBIE_SPEED_MAX = 0.1;
const ZOMBIE_SPEED_MIN = 0.05
const ZOMBIE_ACCEL_BOUND = 1.4;

var numberOfZombies = 0;
var numberOfSuperZombies = 0;
var numberOfHumans = 0;
var numberOfSuperHumans = 0;
var currentPopulationCount = 0;

var population = [];

var soundID;
var myImage;

function loadSound () {
  createjs.Sound.registerSound("assets/thunder.mp3", soundID);
}

function preLoad() {
	myImage = loadImage("assets/Link.png");
	// new p5.Image(25, 25);
}

function setup() {
	preLoad();

  	createCanvas(windowWidth, windowHeight);
  	backgroundColor = color('darkgray');

  	initializePopulation();
}

function draw() {
	image(myImage, 0, 0);

  	background(backgroundColor);
  	noStroke();

  	drawPopulation();
  	movePopulation();
  	trapPopulation();

  	drawText();

  	handleCollision();
}

function initializePopulation() {
  	for (var i = 0; i < MAX_POPULATION; ++i) {
  		var humanoid_type = random(0, 100);
  		if (humanoid_type <= 5) {
  			population.push(initializeSuperZombie());
  			++numberOfZombies;
  			++numberOfSuperZombies;
  			++currentPopulationCount;
  		} else if (humanoid_type <= 50) {
  			population.push(initializeZombie());
  			++numberOfZombies;
  			++currentPopulationCount;
  		} else if (humanoid_type <= 95) {
  			population.push(initializeHuman());
  			++numberOfHumans;
  			++currentPopulationCount;
  		} else {
  			population.push(initializeSuperHuman());
  			++numberOfHumans;
  			++numberOfSuperHumans;
  			++currentPopulationCount;
  		}
  	}
}

function initializeZombie() {
	return {
		size: random(MIN_SIZE, MAX_SIZE),
		position: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(MAX_SIZE / 2, ZOMBIE_SPAWN_BOUND))),
		color: color(random(200, 255), random(50, 100), random(50, 100), random(50, 150)),
		humanoid_type: 'zombie',
		health_points: random(100, 150),
		velocity: createVector(random(MIN_ZOMBIE_HORIZONTAL_VELOCITY, MAX_ZOMBIE_HORIZONTAL_VELOCITY), random(ZOMBIE_SPEED_MIN, ZOMBIE_SPEED_MAX)),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
     		this.position.add(this.velocity);
     		var acceleration = createVector(random(MIN_ZOMBIE_HORIZONTAL_VELOCITY, MAX_ZOMBIE_HORIZONTAL_VELOCITY), random(0, 1));
     		this.velocity.add(acceleration);
     		this.velocity.limit(ZOMBIE_ACCEL_BOUND);
		},
		trap: function() {
			if ((this.position.x - this.size / 2) <= 0) {
 				this.position.x = this.size / 2;
 			}
 			if ((this.position.x + (this.size / 2)) >= windowWidth) {
 				this.position.x = windowWidth - (this.size / 2);
 			} // Side boundaries
 			if ((this.position.y + (this.size / 2)) >= windowHeight) {
 				this.position.y = (windowHeight - (this.size / 2));
 			} // Lower boundary
		},
		isZombie: function() {
			return this.humanoid_type == 'zombie' || this.humanoid_type == 'super zombie';
		},
		isHuman: function() {
			return this.humanoid_type == 'human' || this.humanoid_type == 'super human';
		},
		isTouching: function(target) {
			if ((this.isZombie() && target.isHuman()) || (target.isZombie() && this.isHuman())) {
				if (this.position.dist(target.position) <= this.size/2 + target.size/2) return true;
				else return false;
			}
			else return false;
		},
		fight: function(target) {
			if (this.health_points > target.health_points) {
				population.splice(population.indexOf(target), 1);
				--currentPopulationCount;
			}
		}
	};
}

function initializeSuperZombie() {
	return {
		size: random(MAX_SIZE*1.5, MAX_SIZE*2), // BIGGER
		position: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(MAX_SIZE / 2, ZOMBIE_SPAWN_BOUND))),
		color: color(random(200, 255), random(50, 100), random(50, 100), random(50, 150)),
		humanoid_type: 'super zombie',
		health_points: random(150, 200), // HEALTHIER
		velocity: createVector(random(MIN_ZOMBIE_HORIZONTAL_VELOCITY, MAX_ZOMBIE_HORIZONTAL_VELOCITY), random(ZOMBIE_SPEED_MIN * 5, ZOMBIE_SPEED_MAX * 2)),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.add(this.velocity);
     		var acceleration = createVector(random(-3, 3), random(0, 2));
     		this.velocity.add(acceleration);
     		this.velocity.limit(ZOMBIE_ACCEL_BOUND * 1.5);
		},
		trap: function() {
			if ((this.position.x - this.size / 2) <= 0) {
 				this.position.x = this.size / 2;
 			}
 			if ((this.position.x + (this.size / 2)) >= windowWidth) {
 				this.position.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.position.y + (this.size / 2)) >= windowHeight) {
 				this.position.y = (windowHeight - (this.size / 2));
 			} // Lower boundary
		},
		isZombie: function() {
			return this.humanoid_type == 'zombie' || this.humanoid_type == 'super zombie';
		},
		isHuman: function() {
			return this.humanoid_type == 'human' || this.humanoid_type == 'super human';
		},
		isTouching: function(target) {
			if ((this.isZombie() && target.isHuman()) || (target.isZombie() && this.isHuman())) {
				if (this.position.dist(target.position) <= this.size/2 + target.size/2) return true;
				else return false;
			}
			else return false;
		},
		fight: function(target) {
			if (this.health_points > target.health_points) {
				population.splice(population.indexOf(target), 1);
				--currentPopulationCount;
			}
		}
	};
}

function initializeHuman() {
	return {
		size: random(MIN_SIZE, MAX_SIZE),
		position: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(windowHeight - HUMAN_SPAWN_BOUND, windowHeight - (MAX_SIZE / 2)))),
		color: color(random(0, 30), random(0, 200), random(250, 255), random(50, 150)),
		humanoid_type: 'human',
		health_points: random(100, 150),
		velocity: createVector(random(MIN_HUMAN_HORIZONTAL_VELOCITY, MAX_HUMAN_HORIZONTAL_VELOCITY), random(HUMAN_SPEED_MIN, HUMAN_SPEED_MAX),),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.add(this.velocity);
			var acceleration = createVector(random(MIN_HUMAN_HORIZONTAL_VELOCITY, MAX_HUMAN_HORIZONTAL_VELOCITY), random(-1, 0));
			this.velocity.add(acceleration);
			this.velocity.limit(HUMAN_ACCEL_BOUND);
		},
		trap: function() {
			if ((this.position.x - (this.size / 2)) <= 0) {
 				this.position.x = this.size / 2;
 			}
 			if ((this.position.x + (this.size / 2)) >= windowWidth) {
 				this.position.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.position.y - (this.size / 2)) <= 0) {
 				this.position.y = (this.size / 2);
 			} // Upper boundary
		},
		isZombie: function() {
			return this.humanoid_type == 'zombie' || this.humanoid_type == 'super zombie';
		},
		isHuman: function() {
			return this.humanoid_type == 'human' || this.humanoid_type == 'super human';
		},
		isTouching: function(target) {
			if ((this.isZombie() && target.isHuman()) || (target.isZombie() && this.isHuman())) {
				if (this.position.dist(target.position) <= this.size/2 + target.size/2) return true;
				else return false;
			}
			else return false;
		},
		fight: function(target) {
			if (this.health_points > target.health_points) {
				population.splice(population.indexOf(target), 1);
				--currentPopulationCount;
			}
		}
	};
}

function initializeSuperHuman() {
	return {
		size: random(MAX_SIZE * 1.5, MAX_SIZE * 2), // BIGGER
		position: createVector((random(MAX_SIZE / 2, windowWidth - (MAX_SIZE / 2))), (random(windowHeight - HUMAN_SPAWN_BOUND, windowHeight - (MAX_SIZE / 2)))),
		color: color(random(0, 30), random(0, 200), random(250, 255), random(50, 150)),
		humanoid_type: 'super human',
		health_points: random(150, 200), // HEALTHIER
		velocity: createVector(random(MIN_HUMAN_HORIZONTAL_VELOCITY, MAX_HUMAN_HORIZONTAL_VELOCITY), random(HUMAN_SPEED_MIN * 5, HUMAN_SPEED_MAX * 2)),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.add(this.velocity);
			var acceleration = createVector(random(-3, 3), random(-2, 0));
			this.velocity.add(acceleration);
			this.velocity.limit(HUMAN_ACCEL_BOUND * 1.25);
		},
		trap: function() {
			if ((this.position.x - (this.size / 2)) <= 0) {
 				this.position.x = this.size / 2;
 			}
 			if ((this.position.x + (this.size / 2)) >= windowWidth) {
 				this.position.x = windowWidth - (this.size / 2);
 			} // Side boundaries

 			if ((this.position.y - (this.size / 2)) <= 0) {
 				this.position.y = (this.size / 2);
 			} // Upper boundary
		},
		isZombie: function() {
			return this.humanoid_type == 'zombie' || this.humanoid_type == 'super zombie';
		},
		isHuman: function() {
			return this.humanoid_type == 'human' || this.humanoid_type == 'super human';
		},
		isTouching: function(target) {
			if ((this.isZombie() && target.isHuman()) || (target.isZombie() && this.isHuman())) {
				if (this.position.dist(target.position) <= this.size/2 + target.size/2) return true;
				else return false;
			}
			else return false;
		},
		fight: function(target) {
			if (this.health_points > target.health_points) {
				population.splice(population.indexOf(target), 1);
				--currentPopulationCount;
			}
		}
	};
}

function drawPopulation() {
 	for (var i = 0; i < currentPopulationCount; ++i) {		
 		population[i].draw();
  	}
}

function movePopulation() {
	for (var i = 0; i < currentPopulationCount; ++i) {	
 		population[i].move();
  	}
}

function trapPopulation() {
	 for (var i = 0; i < currentPopulationCount; ++i) { 		
 		population[i].trap();
  	}
}

function drawText() {
	zombieText();
	humanText();
	totalPopulationText();
}

function zombieText() {
	fill(random(200, 255), random(50, 100), random(50, 100));
	textSize(20);
	stroke(5);
	text('Zombies: ' + numberOfZombies, windowWidth / 2, windowHeight / 4);
	text('Percentage of Hulk Zombies: ' + Math.round((numberOfSuperZombies/numberOfZombies) * 100) + '%', (windowWidth / 2) - 80, (windowHeight / 4) + 20);
}

function humanText() {
	fill(random(0, 30), random(0, 200), random(250, 255));
	textSize(20);
	stroke(5);
	text('Humans: ' + numberOfHumans, windowWidth / 2, windowHeight / 1.5);
	text('Percentage of Super Humans: ' + Math.round((numberOfSuperHumans/numberOfHumans) * 100) + '%', (windowWidth / 2) - 80, (windowHeight / 1.5) + 20);
}

function totalPopulationText() {
	fill(000000);
	textSize(20);
	stroke(5);
	text('Total population count: ' + currentPopulationCount, (windowWidth / 2) - 80, windowHeight / 2);
	// text('Total Percentage of Supers: ' + Math.round((numberOfSuperHumans/numberOfHumans) * 100) + '%', (windowWidth / 2) - 80, (windowHeight / 1.5) + 20);
}

function handleCollision() {
	for (var i = 0; i < currentPopulationCount; ++i) {
		var attacker = population[i];
		if (attacker == undefined) continue;
		for (var k = (i + 1); k < currentPopulationCount; ++k) {
			var defender = population[k];
			if (defender == undefined) continue;
			else if (attacker.isTouching(defender)) {
				print("FIGHT");
				// playSound();
				attacker.fight(defender);
			}
		}
	}
}

function playSound() {
	createjs.Sound.play(soundID);
}