class Bird {
	constructor() {
		this.y = height / 2;
		this.x = 65;
		this.gravity = 0.5;
		this.lift = -12;
		this.velocity = 0;
		this.width = 70;
		this.height = 70;
		this.r = 26;

		this.show = (sprite) => {
			fill(0);
			ellipse(this.x, this.y, this.r, this.r);
			image(sprite, 28, this.y - 40, this.width, this.height);
		};

		this.enlarge = (sprite) => {
			image(sprite, 28, this.y - 40, this.width * 2.5, this.height * 2.5);
		}

		this.up = () => {
			this.velocity += this.lift;
		};

		this.update = () => {
			this.velocity += this.gravity;
			this.y += this.velocity;
			if (this.y > height) {
				this.y = height;
				this.velocity = 0;
			}
			if (this.y < 0) {
				this.y = 0;
				this.velocity = 0;
			}
		};
	}
}
