class TopScoreItem {
	constructor (){
		let name;
		let score;
	}
}

let bird;
let leaders = [];
let lives = 3;
let pickup;
let pipes = [];
let score = 0;
let newTopScore = new TopScoreItem();
let pipeCount = 0;
let bg;
let bg2;
let ninja;
let slap;
let play = false;
let dashSpeed = 50;
let slap_action = false;

console.log(lives);


function setup() {
  	createCanvas(1000, 600);
  	pipes = [];
  	bird = new Bird();
  	bg = loadImage('../../media/backdrops/trees.jpg');
  	bg2 = loadImage('../../media/backdrops/trees2.jpg');
  	ninja = loadImage('../../media/ninja/ninja.png');
		slap = loadImage('../../media/ninja/hand_slap.png');
		pickup = [];
}

function draw() {
    if (!play) {
      	showTopScore();
    } else {
      	playGame();
    }
}

function playGame() {
	// clear canvas..
	clear();
    // TODO: reset loop and change back to bg for now.
    if (pipeCount <= 5) {
        background(bg);
    } else if (pipeCount >= 6 && pipeCount <= 11) {
        background(bg2);
    } else {
        pipeCount = 0;
    }

	if (frameCount === 1) {
		pipes.push(new Pipe());
	}

	if (frameCount % 100 === 0) {
		pipes.push(new Pipe());
	}

	if (frameCount % 200 === 0) {
		pickup.push(new Pickup());
	}

		for (let i = pickup.length - 1; i >= 0; i--) {
			pickup[i].update();
			pickup[i].show();


			if (pickup[i].offscreen()) {
				pickup.splice(i, 1);
			}
			// TODO: double check hit method
			if (pickup[i].hits(bird)) {
				pickup[i].action();
				if (pickup[i].gain === true){
					lives += 1;
				} else if (pickup[i].lose === true) {
					lives -= 1;
				} else if (pickup[i].reset === true) {
					lives = 3;
				}
				pickup.splice(i, 1);
			}
		}

	showScore();

	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].show();
		pipes[i].update();

		if (pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}

		if (pipes[i].passes(bird)) {
				score += 5;
        pipeCount += 1;

				let r = /[0-9][0][0]/;

            if (r.test(score)) {
                lives +=1;
            }

		} else if (pipes[i].hits(bird)) {
			lives -= 1;
			bird = new Bird();
			if (lives > 1) {
				alert('You Lose 1 life!  You have ' + lives + ' lives left');
			} else if (lives === 1) {
				alert('You Lose 1 life!  You have ' + lives + ' life left');
			} else {
				let answer = prompt('Game Over! Your score is ' + score + '! Do you want to play again?');
				if (answer.toUpperCase().trim() === 'YES') {
					reset();
				} else {
					newTopScore.name = prompt('Thanks for Playing! Enter your name: ');
					newTopScore.score = score;
					leaders.push(newTopScore);
					console.log(leaders);
					reinitializeVars();
					play = false;
				}
			}
		}
	}

	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].speed = 5;
	}


	bird.update();

	if (slap_action === true) {
		bird.enlarge(slap);

	} else {
		bird.show(ninja);
	}


}

function keyPressed() {
	if (key === ' ') {
		bird.up();
	} else if (key.toUpperCase() === 'P') {
		reset();
		play = true;
	} else if (keyCode === LEFT_ARROW) {
		for (let i = pipes.length - 1; i >= 0; i--) {
			pipes[i].speed = 1;
			pipes[i].update();
			pipes[i].show();
		}
	} else if (keyCode === RIGHT_ARROW) {
			for (let i = pipes.length - 1; i >= 0; i--) {
				pipes[i].speed = dashSpeed;
				pipes[i].update();
				pipes[i].show();
			}
	}

	if (keyIsDown(RIGHT_ARROW)) {
			slap_action = true;
			console.log("poop" + slap_action);
	} else if (!keyIsDown(RIGHT_ARROW)) {
			slap_action = false;
	}
	return false;
}


function showScore() {
	const scoreString = 'Your score: ' + score;
	const livesString = 'Lives: ' + lives;
	fill('red');
	textStyle(BOLD);
	text(scoreString, 30, 20, 55, 55);
	text(livesString, 30, 80, 55, 55);
	textSize(18);
}

function showTopScore() {
	background(35);
	image(ninja, 250, 30, width / 2, height);
	fill('#1199FF');
	textAlign(CENTER, TOP);
	textStyle(BOLD);
	textSize(20);
	let displayLeaders;


	if (leaders.length === 0) {
		displayLeaders = 'SLAPPY*NINJA Instructions:\n Keep your Ninja in the air by hitting <spacebar>. \n If you want to be a noob and lose a life, fall to the ground or hit a tree. \n (This will bring much dishonour to George of the Jungle clan).\n\nCan you make it onto the board?';
		text(displayLeaders, 20, 20, 990, 560);
	}

	for(let leadScore in leaders) {
		displayLeaders = leaders[leadScore].name + ": " + leaders[leadScore].score;
		text(displayLeaders, 20, 20, 990, 560);
	}
	fill('#e60000');
	textAlign(CENTER, TOP);
	text('Press "P" to play SLAPPY*NINJA!', 20, 570, 990, 590);
}

function reset() {
	setup();
	console.log(pipes);
	draw();
	reinitializeVars();
}

function reinitializeVars() {
	lives = 3;
	score = 0;
  	pipeCount = 0;
}
