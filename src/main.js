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
    height: 480,
    color: '#515966',
    scene: [ Load, Menu, Quiz, Play, End ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
//set UI sizes
let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 15;

let keyENTER, keyLEFT, keyRIGHT, keyUP, keyR, keyESC;
var enemyType;
let difficulty = 4
let ending = false