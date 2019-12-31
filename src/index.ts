import { Game } from './game';
import { DrawContext } from './drawContext';

const ctx = document.getElementById('game').getContext('2d');

const game = new Game(new DrawContext(ctx));

game.start();
