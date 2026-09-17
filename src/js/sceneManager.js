import { Opening } from "./opening.js";
import { Game } from "./game.js";
import { Congrats } from "./congratulations.js";
import { GameOver } from "./gameOver.js";

export class SceneManager {
	constructor() {
		this.currentScene = null;
		this.scene = null;
		this.currentLevel = 1;
		this.MAX_LEVEL = 5;
	}

	setup() {
		this.scene = new Opening();
		this.currentScene = "opening";
	}

	update() {
		this.scene.update();
	}

	draw() {
		this.scene.draw();
	}

	changeScene(option) {
		switch (this.currentScene) {
			case "opening":
				this.scene = new Game(this.currentLevel++);
				this.currentScene = "game";
				break;

			case "game":
				switch (option) {
					case 0:
						if (this.currentLevel <= this.MAX_LEVEL) {
							this.scene = new Game(this.currentLevel++);
							this.currentScene = "game";
						} else {
							this.currentLevel = 1;
							this.scene = new Congrats();
							this.currentScene = "congrats";
						}
						break;

					case 1:
						this.currentLevel = 1;
						this.scene = new GameOver();
						this.currentScene = "gameover";
						break;

					default:
						this.currentLevel = 1;
						this.scene = new GameOver();
						this.currentScene = "gameover";
						break;
				}
				break;

			case "congrats":
			case "gameover":
			default:
				this.scene = new Opening();
				this.currentScene = "opening";
				break;
		}
	}
}

export const sceneManager = new SceneManager();
sceneManager.setup();
