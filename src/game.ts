import { Shape } from './shape';
import { Grid } from './grid';
import { DrawContext } from './drawContext';
import { ScoreObserver } from './scoreObserver';

export class Game {
    shapeOffsetX: number;
    shapeOffsetY: number;

    constructor(
        private readonly ctx: DrawContext,
        private readonly grid: Grid = new Grid(ctx, 10, 15),
        private shape: Shape = new Shape(),
        private isGameOver: boolean = false,
        private tikTime: number = 1000,
        readonly score: ScoreObserver = new ScoreObserver(),
    ) {
        this.setinitialShapeOffsets();
    }

    private setinitialShapeOffsets() {
        [this.shapeOffsetX, this.shapeOffsetY] = [Math.ceil(this.grid.colSize / 2) - 2, -3];
    }

    start = () => {
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
    };

    notifyGameOver(value: number) {
        alert(`GAME OVER.\nYou score is: ${value}`);
    }

    private gameOver = () => {
        this.isGameOver = true;
    };

    private startGame = () => {
        this.isGameOver = false;
    };

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
        for (let y = 0; y < this.shape.activeShape.length; y++) {
            for (let x = 0; x < this.shape.activeShape[y].length; x++) {
                if (this.shape.activeShape[y][x]) {
                    this.ctx.drawSquare(
                        x + this.shapeOffsetX,
                        y + this.shapeOffsetY,
                        color || this.shape.color,
                    );
                }
            }
        }
    }

    private fillGrid() {
        for (let y = 0; y < this.shape.activeShape.length; y++) {
            for (let x = 0; x < this.shape.activeShape[y].length; x++) {
                if (this.shape.activeShape[y][x]) {
                    if (this.shapeOffsetY + y < 0) {
                        this.gameOver();
                        this.score.notify(this.notifyGameOver);
                        return;
                    }

                    this.grid.setCellColor(
                        this.shapeOffsetX + x,
                        this.shapeOffsetY + y,
                        this.shape.color,
                    );
                }
            }
        }
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
                this.score.listen(this.grid.removeFulfilledLines());
                this.drawGrid();
                this.shape = new Shape();
                this.setinitialShapeOffsets();
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
            if (this.shapeOffsetX > this.grid.colSize / 2) {
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
