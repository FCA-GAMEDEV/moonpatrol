import { sceneManager } from "./sceneManager.js";
import { input } from "./input.js";

let lastTime = 0;
const fpsInterval = 1000 / 60; // ~16.67ms por frame

function loop(currentTime) {
	requestAnimationFrame(loop);
	
	const elapsed = currentTime - lastTime;
	
	if (elapsed >= fpsInterval) {
		// Ajusta para o próximo frame considerando pequenas variações
		lastTime = currentTime - (elapsed % fpsInterval);
		
		sceneManager.update();
		sceneManager.draw();
		input.update();
	}
}

// Inicializa o game loop nativo com timestamp inicial
requestAnimationFrame((time) => {
	lastTime = time;
	loop(time);
});
