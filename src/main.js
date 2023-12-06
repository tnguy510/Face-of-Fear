'use strict'

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        },
    },
    width: 640,
    height: 960,
    scene: [ Load, Menu, Quiz, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
//set UI sizes
let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 15;

let gameover = false;
let keyENTER, keyLEFT, keyRIGHT, keyUP;
var enemyType;