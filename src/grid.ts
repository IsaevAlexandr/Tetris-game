import { DrawContext } from './drawContext';

export class Grid {
    table: string[][];

    constructor(private readonly ctx: DrawContext) {
        this.generateTable();
    }

    private generateTable() {
        this.table = [];
        for (let y = 0; y < this.ctx.rowSize; y++) {
            this.table[y] = [];

            this.addEmptyLine(y);
        }
    }

    private addEmptyLine(y: number) {
        for (let x = 0; x < this.ctx.colSize; x++) {
            this.setCellColor(x, y, this.ctx.emptyFieldColor);
        }
    }

    private shiftLinesTo(yPosition: number) {
        for (let y = yPosition; y > 1; y--) {
            for (let x = 0; x < this.ctx.colSize; x++) {
                this.table[y][x] = this.table[y - 1][x];
            }
        }
    }

    forEachCell(cb: (x: number, y: number, color: string) => void) {
        for (let y = 0; y < this.table.length; y++) {
            for (let x = 0; x < this.table[y].length; x++) {
                cb(x, y, this.table[y][x]);
            }
        }
    }

    removeFulfilledLines() {
        for (let y = 0; y < this.table.length; y++) {
            let hasNoEmptyCell = true;

            for (let x = 0; x < this.ctx.colSize; x++) {
                hasNoEmptyCell = hasNoEmptyCell && this.table[y][x] !== this.ctx.emptyFieldColor;
            }

            if (hasNoEmptyCell) {
                this.shiftLinesTo(y);
                this.addEmptyLine(0);
            }
        }
    }

    checkCollision(nextOfsetX: number, nextOffsetY: number, matrix: number[][]) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (!matrix[y][x]) {
                    continue;
                }

                let offsetX = nextOfsetX + x;
                let offsetY = nextOffsetY + y;

                if (offsetY < 0) {
                    continue;
                }

                if (offsetX < 0 || offsetX >= this.ctx.colSize || offsetY >= this.ctx.rowSize) {
                    return true;
                }

                if (this.table[offsetY][offsetX] !== this.ctx.emptyFieldColor) {
                    return true;
                }
            }
        }

        return false;
    }

    setCellColor(x: number, y: number, color: string) {
        this.table[y][x] = color;
    }
}
