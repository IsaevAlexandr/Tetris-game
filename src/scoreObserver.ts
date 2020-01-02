export class ScoreObserver {
    constructor(
        private subscribers: Function[] = [],
        private score: number = 0,
        private scoreMultiplier: number = 10,
    ) {}

    subscribe = (cb: (x: number) => void) => {
        this.notify(cb);
        this.subscribers.push(cb);
    };

    listen = (value?: number) => {
        if (!value) return;

        this.score += value * this.scoreMultiplier;

        if (value % 4 === 0) {
            this.score += 100;
        }

        this.notifyAll();
    };

    reset() {
        this.score = 0;
        this.notifyAll();
    }

    notifyAll() {
        this.subscribers.forEach(this.notify);
    }

    notify = cb => cb(this.score);
}
