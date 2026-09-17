import { Scene } from "./scene.js";
import { sceneManager } from "./sceneManager.js";
import { graphics } from "./graphics.js";
import { input } from "./input.js";

export class Opening extends Scene {
	constructor() {
		super();
	}

	update() {
		if (input.isKeyJustPressed("Enter")) {
			sceneManager.changeScene(0);
		}
	}

	draw() {
		graphics.clear();
		graphics.drawRect(0, 0, graphics.canvas.width, graphics.canvas.height, "white");
		graphics.drawText("MOON PATROL", 100, 280, "80px Arial", "black");
		graphics.drawText("PRESSIONE ENTER PARA INICIAR", 220, 360, "22px Arial", "gray");
	}
}
