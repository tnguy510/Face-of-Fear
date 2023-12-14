class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        //tilemap info
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilemap', 'tilesetImage')

        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const wallsLayer = map.createLayer('walls', tileset, 0, 0)
        
        const doorEvent = map.findObject('Events', obj=> obj.name === 'doorEvent')
        this.door = this.physics.add.image(doorEvent.x, doorEvent.y,'door')

        //spawns # of class Enemies depending on difficulty
        if(enemyType === "spider" || enemyType === "needle"){
            for(let i = 1; i <= difficulty; i++){
                this["enemy"+i] = new Enemy(this, Phaser.Math.Between(0, map.widthInPixels), 
                Phaser.Math.Between(0, map.heightInPixels), enemyType, 0, 'down')
                moveEnemy(this, this["enemy"+i])
                console.log("spider")
                this["enemy"+i].setScale(.3)
            }
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

        for(let i = 1; i <= difficulty; i++){
            this.physics.add.collider(this["enemy"+i], wallsLayer)
        }

    }

    update() {
        if (this.physics.overlap(this.player, this.door)) {
            difficulty += 1
            this.scene.restart();
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            console.log("moving to pause")
            this.scene.launch('pauseScene')
            this.game.scene.pause()
        }

        this.playerFSM.step()
    }

}