class Pickup {
	constructor() {
		this.y = Math.floor(Math.random() * (height - width)) + height;
		this.x = width;
		this.speed = 5;
		this.r = 26;
		this.gain = false;
		this.lose = false;
		this.invisible = false;
		this.heavy = false;
		this.reset = false;

		var colours = ['red', 'blue', 'green', 'black', 'white'];
		var randomColour = colours.sort(function(a, b){return 0.5 - Math.random()});
		var randomColour = randomColour[0];

		var actions = ['1UP', '1DOWN', 'invisible', 'heavy', 'reset']
		var randomAction = actions.sort(function(a, b){return 0.5 - Math.random()});
		var randomAction = randomAction[0];

		this.action = (lives) => {

			switch(randomAction) {
				case '1UP':
					console.log("+++");
					return this.gain = true;
					break;
				case '1DOWN':
					console.log("---");
					return this.lose = true;
					break;
				case 'invisible':
					console.log('invisible');
					return this.invisible = true;
					break;
				case 'heavy':
					console.log('heavy');
					return this.heavy = true;
					break;
				case 'flip':
					console.log('reset');
					return this.reset = true;
					break;
			}

			// if (randomAction === '1UP') {
			// 	console.log("+++");
			// 	return this.gain = true;
			// } else if (randomAction === '1DOWN') {
			// 	console.log("---");
			// 	return this.lose = true;
			// } else {
			// 	console.log('nothing');
			// }
		}


	//// TODO: double check hit method

		this.hits = (bird) => {
			var objectDist = dist(this.x, this.y, bird.x, bird.y);

			if (objectDist < this.r + bird.r) {
				console.log("hit" + randomColour);
				// this.highlight = true;
				return true;
			}
			return false;
		};


		this.show = () => {
			fill(randomColour);
			//image(sprite, 28, this.y - 40, 70, 70);
			ellipse(this.x, this.y, this.r * 2, this.r * 2);
			//// TODO: code pickup not to generate too close to pipe obj.
		};

		this.update = () => {
	      	this.x -= this.speed;
	    };

	  this.offscreen = () => {
				return this.x < -this.w;
	    };
	}
}
