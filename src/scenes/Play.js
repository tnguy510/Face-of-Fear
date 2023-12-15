class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        //pause menu config
        var pauseConfig = {
            fontFamily: 'Ariel',
            fontSize: '28px',
            backgroundColor: '#ff2c2c',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
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
                this["enemy"+i] = new Enemy(this, Phaser.Math.Between(0, game.config.width), 
                Phaser.Math.Between(0, game.config.height), enemyType, 0, 'down')
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
            this.physics.add.collider(this["enemy"+i], this.player)
        }

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.isPause = !this.isPause
        }
        if(this.isPause === true){
            this.physics.pause()

        }
        else{
            this.cameras.main.fadeOut([100])
            this.physics.resume()
        }

        if(ending === false){
            for(let i = 1; i <= difficulty; i++){
                moveEnemy(this, this["enemy"+i])
            }
        }

        if (this.physics.overlap(this.player, this.door)) {
            difficulty += 1
            if(difficulty <= 5){
                ending = true
                console.log(ending)
                this.scene.start('endingScene')
            }
            else{
                this.scene.restart();
            }
        }

        this.playerFSM.step()

    }

}