'use strict';

var state = {
    init: function() {

        var string = 'Welcome to the NoMainframeIsSafe!',
            style = { font: '24px Arial', fill: '#fff', align: 'center'},
            text = this.game.add.text(this.world.centerX, this.world.centerY, string, style);

        text.anchor.setTo(0.5, 0.5);

    },
    preload: function() {
        // STate preload logic goes here
    },
    create: function() {
        // State create logic goes here
    },
    update: function() {
        // State Update Logic goes here.
    }
};

module.exports = state;
