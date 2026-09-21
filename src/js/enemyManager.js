import { UFO } from "./enemy.js";
import { graphics } from "./graphics.js";

export class EnemyManager {
	constructor(level) {
		this.level = level;
		this.count = 0;
		this.enemies = [];
		this.bombs = [];
		this.spawnInterval = Math.max(180 - level * 20, 90);
	}

	update() {
		this.count++;

		// Gera OVNIs periodicamente
		if (this.count % this.spawnInterval === 0) {
			const spawnY = Math.floor(Math.random() * 120) + 80;
			this.enemies.push(new UFO(graphics.canvas.width + 20, spawnY));
		}

		// Atualiza OVNIs
		for (let i = 0; i < this.enemies.length; i++) {
			const ufo = this.enemies[i];
			ufo.update();

			if (ufo.canShoot()) {
				this.bombs.push(ufo.dropBomb());
			}

			if (ufo.isDead) {
				this.enemies.splice(i, 1);
				i--;
			}
		}

		// Atualiza bombas
		for (let i = 0; i < this.bombs.length; i++) {
			const bomb = this.bombs[i];
			bomb.update();

			if (bomb.isDead) {
				this.bombs.splice(i, 1);
				i--;
			}
		}
	}

	draw() {
		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].draw();
		}

		for (let i = 0; i < this.bombs.length; i++) {
			this.bombs[i].draw();
		}
	}
}
