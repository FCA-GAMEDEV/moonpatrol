import { sceneManager } from "./sceneManager.js";

export class CollisionManager {
	// Buggy contra crateras e rochas
	player_vs_obstacles(player, obstacles) {
		for (let i = 0; i < obstacles.length; i++) {
			const obs = obstacles[i];

			if (obs.type === "crater") {
				// Só cai na cratera se estiver no chão
				if (player.isGrounded) {
					if (player.x + player.w > obs.x + 10 && player.x < obs.x + obs.w - 10) {
						sceneManager.changeScene(1);
						return;
					}
				}
			} else if (obs.type === "rock") {
				// Colisão AABB contra a rocha
				if (
					player.x < obs.x + obs.w &&
					player.x + player.w > obs.x &&
					player.y < obs.y + obs.h &&
					player.y + player.h > obs.y
				) {
					sceneManager.changeScene(1);
					return;
				}
			}
		}
	}

	// Buggy contra bombas alienígenas
	player_vs_bombs(player, bombs) {
		for (let i = 0; i < bombs.length; i++) {
			const bomb = bombs[i];
			if (
				player.x < bomb.x + bomb.w &&
				player.x + player.w > bomb.x &&
				player.y < bomb.y + bomb.h &&
				player.y + player.h > bomb.y
			) {
				sceneManager.changeScene(1);
				return;
			}
		}
	}

	// Tiro frontal contra rochas
	bullets_vs_obstacles(bullets, obstacles) {
		for (let i = 0; i < bullets.length; i++) {
			const b = bullets[i];
			if (b.type !== "forward") continue;

			for (let j = 0; j < obstacles.length; j++) {
				const obs = obstacles[j];
				if (obs.type !== "rock") continue;

				if (
					b.x < obs.x + obs.w &&
					b.x + b.w > obs.x &&
					b.y < obs.y + obs.h &&
					b.y + b.h > obs.y
				) {
					b.isDead = true;
					obs.isDead = true;
					break;
				}
			}
		}
	}

	// Tiro vertical contra OVNIs
	bullets_vs_enemies(bullets, enemies) {
		for (let i = 0; i < bullets.length; i++) {
			const b = bullets[i];
			if (b.type !== "upward") continue;

			for (let j = 0; j < enemies.length; j++) {
				const ufo = enemies[j];
				if (
					b.x < ufo.x + ufo.w &&
					b.x + b.w > ufo.x &&
					b.y < ufo.y + ufo.h &&
					b.y + b.h > ufo.y
				) {
					b.isDead = true;
					ufo.isDead = true;
					break;
				}
			}
		}
	}
}

export const collisionManager = new CollisionManager();
