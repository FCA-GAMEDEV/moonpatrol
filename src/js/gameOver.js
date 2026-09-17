import { Scene } from "./scene.js";
import { sceneManager } from "./sceneManager.js";
import { graphics } from "./graphics.js";
import { input } from "./input.js";

export class GameOver extends Scene {
	constructor() {
		super();
	}

	update() {
		if (input.isKeyJustPressed("Escape")) {
			sceneManager.changeScene(0);
		}
	}

	draw() {
		graphics.clear();
		graphics.drawRect(0, 0, graphics.canvas.width, graphics.canvas.height, "red");
		graphics.drawText("GAME OVER", 100, 300, "100px Arial", "black");
		graphics.drawText("PRESSIONE ESC PARA RECOMEÇAR", 180, 400, "24px Arial", "black");
	}
}
