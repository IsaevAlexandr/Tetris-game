import { Game } from './game';
import { DrawContext } from './drawContext';

const ctx = document.getElementById('game').getContext('2d');
const scoreboard = document.getElementById('scoreboard');

const game = new Game(new DrawContext(ctx));

game.score.subscribe(value => (scoreboard.innerHTML = String(value)));

game.start();
