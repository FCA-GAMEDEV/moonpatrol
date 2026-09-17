import { Crater, Rock } from "./obstacle.js";
import { graphics } from "./graphics.js";

export class ObstacleManager {
	constructor(groundY, level) {
		this.groundY = groundY;
		this.level = level;
		this.count = 0;
		this.obstacles = [];
		this.num_obstacles = 0;
		this.NUM_MAX = 8 * level + 8;
		this.speed = 4 + level;
		this.spawnInterval = Math.max(80 - level * 5, 45);
	}

	update() {
		this.count++;

		// Gera novos obstáculos até atingir o limite da fase
		if (this.num_obstacles < this.NUM_MAX && this.count % this.spawnInterval === 0) {
			const spawnX = graphics.canvas.width + 20;
			const isRock = Math.random() < 0.5;

			if (isRock) {
				this.obstacles.push(new Rock(spawnX, this.groundY));
			} else {
				this.obstacles.push(new Crater(spawnX, this.groundY));
			}
			this.num_obstacles++;
		}

		// Atualiza os obstáculos
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i].update(this.speed);
			if (this.obstacles[i].isDead) {
				this.obstacles.splice(i, 1);
				i--;
			}
		}
	}

	isCompleted() {
		return this.num_obstacles >= this.NUM_MAX && this.obstacles.length === 0;
	}

	draw() {
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i].draw();
		}
	}
}
