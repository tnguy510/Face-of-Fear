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
        this.load.image('web', 'spider web.png')
        this.load.image('needle', 'needle.png')
        this.load.image('gloves', 'medical_gloves.png')
        this.load.image('hole', 'hole.png')
        this.load.image('door', 'door.png')
        this.load.image('mirrorlight', 'mirrorEventImage.png')
        this.load.audio('spidercrawl', 'spider sound.wav');
        this.load.audio('doorclose', 'door close.wav');
        this.load.audio('lights', 'lights_flicker.wav');
        this.load.audio('creaking', 'creaking.wav');
        this.load.image('tilesetImage', 'tilemap.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tilemap.json')
        this.load.tilemapTiledJSON('room_tilemapJSON', 'room_tilemap.json')
        
        
    }

    create(){
        //game instructions
        document.getElementById('info').innerHTML = '<strong>Controls:</strong> Arrows: move | ESC: Pause Game | E: Interact'
        document.getElementById('info').style.color = "#ffffff"
        document.getElementById('info').style.textAlign = 'center'

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