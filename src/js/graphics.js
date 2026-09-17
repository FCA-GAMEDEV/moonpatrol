export class Graphics {
	constructor() {
		this.canvas = document.getElementById("myCanvas");
		this.ctx    = this.canvas.getContext("2d");
	}
	
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "white";
	}

	drawText(text, x, y, font, color) {
		this.ctx.fillStyle = color;
		this.ctx.font = font;
		this.ctx.fillText(text, x, y);	
	}
	
	drawCircle(x, y, r, color) {
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2);
		this.ctx.fill();
	}
	
	drawRect(x, y, w, h, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);	
	}

	drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = lineWidth;
		this.ctx.stroke();
	}
}

export const graphics = new Graphics();
