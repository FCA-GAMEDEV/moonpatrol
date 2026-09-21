import { GameObject } from "./gameObject.js";
import { graphics } from "./graphics.js";
import { input } from "./input.js";
import { Bullet } from "./bullet.js";

export class Player extends GameObject {
	constructor(x, groundY) {
		const w = 50;
		const h = 24;
		super(x, groundY - h, w, h);

		this.groundY = groundY;
		this.baseY = groundY - h;

		this.speedx = 5;
		this.vy = 0;
		this.GRAVITY = 0.5;
		this.JUMP_FORCE = -10;
		this.isGrounded = true;

		this.bullets = [];
	}

	update() {
		// Movimento horizontal
		if (input.isKeyDown("ArrowLeft")) {
			this.x = Math.max(50, this.x - this.speedx);
		}
		if (input.isKeyDown("ArrowRight")) {
			this.x = Math.min(350, this.x + this.speedx);
		}

		// Pulo
		if ((input.isKeyJustPressed("ArrowUp") || input.isKeyJustPressed("w") || input.isKeyJustPressed("W")) && this.isGrounded) {
			this.vy = this.JUMP_FORCE;
			this.isGrounded = false;
		}

		// Gravidade
		if (!this.isGrounded) {
			this.y += this.vy;
			this.vy += this.GRAVITY;

			if (this.y >= this.baseY) {
				this.y = this.baseY;
				this.vy = 0;
				this.isGrounded = true;
			}
		}

		// Disparo de tiro duplo
		if (input.isKeyJustPressed(" ")) {
			this.bullets.push(new Bullet(this.x + this.w, this.y + 8, 10, 0, "forward"));
			this.bullets.push(new Bullet(this.x + this.w / 2 - 2, this.y - 12, 0, -10, "upward"));
		}

		// Atualização dos projéteis
		for (let i = 0; i < this.bullets.length; i++) {
			this.bullets[i].update();
			if (this.bullets[i].isDead) {
				this.bullets.splice(i, 1);
				i--;
			}
		}
	}

	draw() {
		// Desenha as balas
		for (const bullet of this.bullets) {
			bullet.draw();
		}

		// Chassi do buggy (retângulo azul)
		graphics.drawRect(this.x, this.y + 6, this.w, 12, "blue");

		// Cabine (retângulo amarelo)
		graphics.drawRect(this.x + 14, this.y, 18, 8, "yellow");

		// Canhão frontal (retângulo branco)
		graphics.drawRect(this.x + this.w, this.y + 8, 6, 4, "white");

		// 3 rodas simples
		graphics.drawCircle(this.x + 10, this.y + this.h, 6, "lightgray");
		graphics.drawCircle(this.x + 25, this.y + this.h, 6, "lightgray");
		graphics.drawCircle(this.x + 40, this.y + this.h, 6, "lightgray");
	}
}
