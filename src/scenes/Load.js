class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }


    preload() {
        this.load.path = './assets/'
        this.load.image('dungeon', 'concrete.jpg')
        this.load.spritesheet('player', 'Actor1.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('spider', 'spider.png', {
            frameWidth: 450,
            frameHeight: 360
        })
        this.load.spritesheet('spider2', 'spider2.png', {
            frameWidth: 380,
            frameHeight: 440
        })
        this.load.image('needle', 'needle.png')
        this.load.audio('spidercrawl', 'critters-creeping.wav');
        
    }

    create(){

        // player animations (walking)
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 4 }),
        })

        
        // spider animations (walking)
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spider2', { start: 1, end: 1 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spider', { start: 1, end: 1 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spider2', { start: 0, end: 0 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spider', { start: 0, end: 0 }),
        })
        // go to Menu once loading is done
        this.scene.start('menuScene')
    }
}