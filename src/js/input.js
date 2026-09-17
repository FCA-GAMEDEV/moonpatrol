export const input = {
	keys: {},
	previousKeys: {},

	isKeyDown(key) {
		return this.keys[key] === true;
	},

	// Retorna true apenas no frame em que a tecla começou a ser pressionada
	// Excelente para ações do tipo "toggle" (como transições de cenas via Enter/Escape ou pulo/tiro)
	isKeyJustPressed(key) {
		return this.keys[key] === true && !this.previousKeys[key];
	},

	// Copia o estado atual das teclas para o histórico (deve ser chamado no fim do loop)
	update() {
		this.previousKeys = { ...this.keys };
	}
};

window.addEventListener('keydown', (e) => {
	input.keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
	input.keys[e.key] = false;
});
