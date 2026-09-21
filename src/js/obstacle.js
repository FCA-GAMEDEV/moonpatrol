import { GameObject } from "./gameObject.js";
import { graphics } from "./graphics.js";

export class Obstacle extends GameObject {
	constructor(x, y, w, h, type) {
		super(x, y, w, h);
		this.type = type; // "crater" ou "rock"
		this.isDead = false;
	}

	update(speed) {
		this.x -= speed;
		if (this.x + this.w < 0) {
			this.isDead = true;
		}
	}
}

export class Crater extends Obstacle {
	constructor(x, groundY, w = 45) {
		super(x, groundY, w, 25, "crater");
	}

	draw() {
		// Buraco no chão desenhado como retângulo preto
		graphics.drawRect(this.x, this.y, this.w, this.h, "black");
	}
}

export class Rock extends Obstacle {
	constructor(x, groundY, w = 24, h = 24) {
		super(x, groundY - h, w, h, "rock");
	}

	draw() {
		// Rocha desenhada como retângulo cinza
		graphics.drawRect(this.x, this.y, this.w, this.h, "gray");
	}
}
