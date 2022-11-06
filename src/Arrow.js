export const ArrowTypes = {
    UP: "Up",
    DOWN: "Down",
    LEFT: "Left",
    RIGHT: "Right" 
}

export class Arrow { 
    constructor({ctx, x, y, color, arrowType}) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = color;
        this.arrowType = arrowType;
    }

    draw() { 
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

