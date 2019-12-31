import { Shape } from './shape';
import { Grid } from './grid';
import { DrawContext } from './drawContext';

export class Game {
    shape: Shape;
    grid: Grid;
    shapeOffsetX: number;
    shapeOffsetY: number;
    isGameOver: boolean;
    tikTime: number;

    constructor(private readonly ctx: DrawContext) {
        this.shape = new Shape();
        this.grid = new Grid(ctx);

        this.isGameOver = false;
        this.tikTime = 1000;
        this.shapeOffsetX = Math.ceil(this.ctx.colSize / 2) - 2;
        this.shapeOffsetY = -3;
    }

    start() {
        document.addEventListener('keydown', this.handleKeypres);
        this.startGame();
        this.drawGrid();

        const tick = () => {
            this.moveShapeDown();

            setTimeout(
                () =>
                    !this.isGameOver
                        ? window.requestAnimationFrame(tick)
                        : document.removeEventListener('keydown', this.handleKeypres),
                this.tikTime,
            );
        };

        window.requestAnimationFrame(tick);
    }

    private gameOver() {
        this.isGameOver = true;
    }

    private startGame() {
        this.isGameOver = false;
    }

    private handleKeypres = ({ keyCode }) => {
        const keyMapToActions = {
            37: this.moveShapeLeft,
            38: this.rotateShape,
            39: this.moveShapeRight,
            40: this.moveShapeDown,
        };

        if (keyCode in keyMapToActions) {
            keyMapToActions[keyCode]();
        }
    };

    private drawGrid() {
        this.grid.forEachCell(this.ctx.drawSquare);
    }

    private drawShape(color?: string) {
        this.shape.forEachNonEmptyCell(({ x, y }) => {
            this.ctx.drawSquare(
                x + this.shapeOffsetX,
                y + this.shapeOffsetY,
                color || this.shape.color,
            );
        });
    }

    private fillGrid() {
        this.shape.forEachNonEmptyCell(({ x, y }) => {
            if (this.shapeOffsetY + y < 0) {
                this.gameOver();

                alert('GAME OVER');

                return;
            }

            this.grid.setCellColor(this.shapeOffsetX + x, this.shapeOffsetY + y, this.shape.color);
        });
    }

    private moveShapeDown = () => {
        if (
            !this.grid.checkCollision(
                this.shapeOffsetX,
                this.shapeOffsetY + 1,
                this.shape.activeShape,
            )
        ) {
            this.drawShape(this.ctx.emptyFieldColor);
            this.shapeOffsetY += 1;
            this.drawShape();
        } else {
            this.fillGrid();

            if (!this.isGameOver) {
                this.grid.removeFulfilledLines();
                this.drawGrid();
                this.shape = new Shape();
                this.shapeOffsetX = this.ctx.colSize / 2 - 2;
                this.shapeOffsetY = -3;
            }
        }
    };

    private moveShapeRight = () => {
        if (
            !this.grid.checkCollision(
                this.shapeOffsetX + 1,
                this.shapeOffsetY,
                this.shape.activeShape,
            )
        ) {
            this.drawShape(this.ctx.emptyFieldColor);
            this.shapeOffsetX += 1;
            this.drawShape();
        }
    };

    private moveShapeLeft = () => {
        if (
            !this.grid.checkCollision(
                this.shapeOffsetX - 1,
                this.shapeOffsetY,
                this.shape.activeShape,
            )
        ) {
            this.drawShape(this.ctx.emptyFieldColor);
            this.shapeOffsetX -= 1;
            this.drawShape();
        }
    };

    private rotateShape = () => {
        let nextX = this.shapeOffsetX;

        if (this.grid.checkCollision(nextX, this.shapeOffsetX, this.shape.getNextShape())) {
            if (this.shapeOffsetX > this.ctx.colSize / 2) {
                nextX -= 1;
            } else {
                nextX += 1;
            }
        }

        if (!this.grid.checkCollision(nextX, this.shapeOffsetY, this.shape.getNextShape())) {
            this.drawShape(this.ctx.emptyFieldColor);
            this.shapeOffsetX = nextX;
            this.shape.switchShape();
            this.drawShape();
        }
    };
}
