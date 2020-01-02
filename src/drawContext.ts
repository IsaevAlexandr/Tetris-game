export class DrawContext {
    emptyFieldColor: string;
    squareWidth: number;

    constructor(private readonly ctx: CanvasRenderingContext2D) {
        this.ctx.canvas.width = window.innerWidth / 2;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.strokeStyle = 'grey';

        this.emptyFieldColor = 'white';
        this.squareWidth = 50;
    }

    drawSquare = (x: number, y: number, color: string) => {
        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            x * this.squareWidth,
            y * this.squareWidth,
            this.squareWidth,
            this.squareWidth,
        );
        this.ctx.strokeRect(
            x * this.squareWidth,
            y * this.squareWidth,
            this.squareWidth,
            this.squareWidth,
        );
    };
}
