'use strict';

var states = require('./states'),
    game;

game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    states.initialState
);
