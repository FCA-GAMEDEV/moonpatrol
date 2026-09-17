import { GameObject } from "./gameObject.js";
import { graphics } from "./graphics.js";

export class Bomb extends GameObject {
	constructor(x, y) {
		super(x, y, 6, 10);
		this.speedy = 3.5;
		this.isDead = false;
	}

	update() {
		this.y += this.speedy;
		if (this.y > graphics.canvas.height) {
			this.isDead = true;
		}
	}

	draw() {
		graphics.drawRect(this.x, this.y, this.w, this.h, "red");
	}
}

export class UFO extends GameObject {
	constructor(x, y) {
		super(x, y, 32, 16);
		this.speedx = 2;
		this.isDead = false;
		this.shootCooldown = Math.floor(Math.random() * 80) + 80;
	}

	update() {
		this.x -= this.speedx;
		if (this.x + this.w < 0) {
			this.isDead = true;
		}

		if (this.shootCooldown > 0) {
			this.shootCooldown--;
		}
	}

	canShoot() {
		return this.shootCooldown <= 0 && this.x > 50 && this.x < graphics.canvas.width - 50;
	}

	dropBomb() {
		this.shootCooldown = Math.floor(Math.random() * 100) + 100;
		return new Bomb(this.x + this.w / 2 - 3, this.y + this.h);
	}

	draw() {
		// Desenho simples do disco voador com elipse e cúpula
		graphics.drawCircle(this.x + this.w / 2, this.y + this.h / 2, this.h / 2 + 2, "magenta");
		graphics.drawRect(this.x, this.y + this.h / 2 - 2, this.w, 4, "yellow");
	}
}
