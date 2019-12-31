export class Shape {
    shapes: number[][][];
    color: string;
    activeShapeNumber: number;

    constructor() {
        [this.shapes, this.color] = getRandomTetromino();
        this.activeShapeNumber = 0;
    }

    private getNextShapeNumber() {
        return (this.activeShapeNumber + 1) % this.shapes.length;
    }

    getNextShape() {
        return this.shapes[this.getNextShapeNumber()];
    }

    get activeShape() {
        return this.shapes[this.activeShapeNumber];
    }

    switchShape() {
        this.activeShapeNumber = this.getNextShapeNumber();
    }

    forEachNonEmptyCell(cb: (args: { x: number; y: number }) => void) {
        for (let y = 0; y < this.activeShape.length; y++) {
            for (let x = 0; x < this.activeShape[y].length; x++) {
                if (this.activeShape[y][x]) {
                    cb({ x, y });
                }
            }
        }
    }
}

// https://tetris.fandom.com/wiki/Tetromino
function getRandomTetromino() {
    const I = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    ];

    const J = [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
    ];

    const L = [
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0],
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ],
    ];

    const O = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    ];

    const S = [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    ];

    const T = [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    ];

    const Z = [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
    ];

    const tetromines = [
        [Z, 'tomato'],
        [T, 'green'],
        [S, 'darkseagreen'],
        [O, 'teal'],
        [L, 'purple'],
        [J, 'blue'],
        [I, 'orange'],
    ];

    return tetromines[Math.floor(Math.random() * tetromines.length)] as [number[][][], string];
}
