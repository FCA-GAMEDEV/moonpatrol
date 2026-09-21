import { GameObject } from "./gameObject.js";
import { graphics } from "./graphics.js";

export class Bullet extends GameObject {
	constructor(x, y, vx, vy, type = "forward") {
		const w = type === "forward" ? 12 : 4;
		const h = type === "forward" ? 4 : 12;
		super(x, y, w, h);

		this.vx = vx;
		this.vy = vy;
		this.type = type; // "forward" ou "upward"
		this.isDead = false;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x > graphics.canvas.width || this.y < 0 || this.x < 0) {
			this.isDead = true;
		}
	}

	draw() {
		const color = this.type === "forward" ? "yellow" : "cyan";
		graphics.drawRect(this.x, this.y, this.w, this.h, color);
	}
}
