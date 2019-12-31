export class DrawContext {
    ctx: CanvasRenderingContext2D;
    emptyFieldColor: string;
    squareWidth: number;
    colSize: number;
    rowSize: number;
    _width: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

        this._width = Math.min(window.innerWidth, window.innerHeight);
        this.emptyFieldColor = 'white';
        this.squareWidth = this._width / 2 / 10;
        this.colSize = this._width / this.squareWidth / 2;
        this.rowSize = (this._width / this.squareWidth) * 0.75;
    }

    drawSquare = (x: number, y: number, color: string) => {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = 'black';

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
