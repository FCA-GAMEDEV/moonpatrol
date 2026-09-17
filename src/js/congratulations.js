import { Scene } from "./scene.js";
import { sceneManager } from "./sceneManager.js";
import { graphics } from "./graphics.js";
import { input } from "./input.js";

export class Congrats extends Scene {
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
		graphics.drawRect(0, 0, graphics.canvas.width, graphics.canvas.height, "yellow");
		graphics.drawText("CONGRATULATIONS", 20, 300, "75px Arial", "black");
		graphics.drawText("PRESSIONE ESC PARA VOLTAR AO MENU", 160, 400, "24px Arial", "black");
	}
}
