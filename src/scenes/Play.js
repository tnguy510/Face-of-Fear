class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.doorOverlay = false
        
        //tilemap info
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilemap', 'tilesetImage')

        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const wallsLayer = map.createLayer('walls', tileset, 0, 0)
        
        const doorEvent = map.findObject('Events', obj=> obj.name === 'doorEvent')
        this.door = this.physics.add.image(doorEvent.x, doorEvent.y,'door')

        //enemy spawning
        this.enemy = [1,2,3]

        if(enemyType === "spider" || enemyType === "needle"){
            //console.log("spider play")
            //for(let i = 1; difficulty <= 3; i++){
            //    this.enemy[i] = new Enemy(this, Phaser.Math.Between(0, game.config.width), 
            ///    Phaser.Math.Between(0, game.config.height), enemyType, 0, 'down')
                //scene, x, y, texture, frame, direction
                //this.physics.add.existing(this)
            //}
            this.enemy1 = new Enemy(this, 200, 300, enemyType, 0, 'down')
            this.enemy1.body.collideWorldBounds = true
            this.enemy1.setScale(.3)
        }
        else if(enemyType === "hole"){
            console.log("hole play")
        }

        const playerSpawn = map.findObject('Events', obj => obj.name === 'playerSpawn')
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 1, 'down')

        this.keys = this.input.keyboard.createCursorKeys()

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        moveEnemy(this, this.enemy1)

        this.backgroundNoise = this.sound.add('spidercrawl')
        this.backgroundNoise.loop = true
        this.backgroundNoise.play()

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)


        //wall collision
        wallsLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.collider(this.player, wallsLayer)
        this.physics.add.collider(this.enemy1, wallsLayer)

    }

    update() {
        if (this.physics.overlap(this.player, this.door)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if(this.gameOver === true){
            console.log("gameover true")
        }
        this.playerFSM.step()
    }

}