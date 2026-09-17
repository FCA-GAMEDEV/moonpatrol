export class GameObject {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	getInfo(object) {
		console.log(object + 
					" x: " + this.x + 
					" y: " + this.y +
					" w: " + this.w +
					" h: " + this.h);
	}

	update() {
		// Deixamos vazio na classe base
	}

	draw() {
		// Deixamos vazio na classe base
	}
}
