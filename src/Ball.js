export class Ball { 
    constructor({ctx, x, y, color}) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = color;
    }

    draw() { 
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
