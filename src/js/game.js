import { Scene } from "./scene.js";
import { Player } from "./player.js";
import { ObstacleManager } from "./obstacleManager.js";
import { EnemyManager } from "./enemyManager.js";
import { collisionManager } from "./collisionManager.js";
import { sceneManager } from "./sceneManager.js";
import { graphics } from "./graphics.js";
import { input } from "./input.js";

export class Game extends Scene {
	constructor(level) {
		super();
		this.level = level;
		this.groundY = 480;

		this.player = new Player(120, this.groundY);
		this.obstacleManager = new ObstacleManager(this.groundY, level);
		this.enemyManager = new EnemyManager(level);
		this.isPaused = false;
	}

	update() {
		// Pausar / Despausar com P
		if (input.isKeyJustPressed("p") || input.isKeyJustPressed("P")) {
			this.isPaused = !this.isPaused;
		}

		if (this.isPaused) {
			return;
		}

		// Se completou todos os obstáculos do nível, avança de fase
		if (this.obstacleManager.isCompleted()) {
			sceneManager.changeScene(0);
			return;
		}

		this.player.update();
		this.obstacleManager.update();
		this.enemyManager.update();

		// Colisões
		collisionManager.player_vs_obstacles(this.player, this.obstacleManager.obstacles);
		collisionManager.player_vs_bombs(this.player, this.enemyManager.bombs);
		collisionManager.bullets_vs_obstacles(this.player.bullets, this.obstacleManager.obstacles);
		collisionManager.bullets_vs_enemies(this.player.bullets, this.enemyManager.enemies);
	}

	draw() {
		// Céu espacial escuro
		graphics.drawRect(0, 0, graphics.canvas.width, graphics.canvas.height, "black");

		// Letreiro do nível no fundo (estilo Plumet)
		graphics.drawText("LEVEL 0" + this.level, 175, 260, "100px Arial", "#222222");

		// Superfície lunar simples (retângulo cinza e linha branca)
		graphics.drawRect(0, this.groundY, graphics.canvas.width, graphics.canvas.height - this.groundY, "#444444");
		graphics.drawLine(0, this.groundY, graphics.canvas.width, this.groundY, "white", 2);

		// Entidades
		this.obstacleManager.draw();
		this.player.draw();
		this.enemyManager.draw();

		// Informações simples de topo
		graphics.drawText("LEVEL 0" + this.level, 20, 35, "20px Arial", "white");
		graphics.drawText("ALVO: " + this.obstacleManager.num_obstacles + " / " + this.obstacleManager.NUM_MAX, 620, 35, "20px Arial", "white");

		// Tela de Pause semitransparente
		if (this.isPaused) {
			graphics.drawRect(0, 0, graphics.canvas.width, graphics.canvas.height, "rgba(0, 0, 0, 0.5)");
			graphics.drawText("PAUSE", 350, 60, "30px Arial", "yellow");
		}
	}
}
