class End extends Phaser.Scene {
    constructor() {
        super('endingScene')
    }
    create(){
        this.ending = false

        //tilemap info
        const map = this.add.tilemap('room_tilemapJSON')
        const tileset = map.addTilesetImage('tilemap', 'tilesetImage')
        
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const wallsLayer = map.createLayer('walls', tileset, 0, 0)
        const furnitureLayer = map.createLayer('furniture', tileset, 0, 0)

        const endingObj = map.findObject('Events', obj => obj.name === 'endingObj')
        this.mirror = this.physics.add.image(endingObj.x, endingObj.y,'mirrorlight')
        this.mirror.setSize(this.width, this.height / 2)

        const playerSpawn = map.findObject('Events', obj => obj.name === 'playerSpawn')
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 1, 'up')
        this.player.setScale(1.5)

        //keyboard keys 
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

        //camera logic
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //wall collision
        wallsLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.collider(this.player, wallsLayer)

        //pause menu config
        let pauseConfig = {
            fontFamily: 'Ariel',
            fontSize: '112px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'middle',
            padding: {
                top: map.heightInPixels / 2,
                bottom: map.heightInPixels / 2,
            }
        }
        //ending config
        let regularConfig = {
            fontFamily: 'Ariel',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'middle'
        }
        this.pauseText = this.add.text(0, 0, 'Game Paused', pauseConfig).setOrigin(0.5).setVisible(false)
        this.endingText = this.add.text(0, 0, 'You made it to the end!', regularConfig).setOrigin(0.5).setVisible(false)
        this.restartText = this.add.text(0, 0, 'Press E to Restart', regularConfig).setOrigin(0.5).setVisible(false)
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.isPause = !this.isPause
        }
        if(this.isPause === true){
            this.pauseText.setVisible(true)
            this.physics.pause()
        }
        else{
            this.pauseText.x = game.config.width / 2
            this.pauseText.y = game.config.height / 2
            this.pauseText.setVisible(false)
            this.physics.resume()
        }

        //checking if player has interacted with ending sequence
        if(this.ending == true && Phaser.Input.Keyboard.JustDown(this.keys.EKey)){
            difficulty = 0
            this.scene.start('menuScene')
        }

        //checking if player is in front of mirror
        if (this.physics.overlap(this.player, this.mirror) && Phaser.Input.Keyboard.JustDown(this.keys.EKey)) {
            this.endingText.x = game.config.width / 2
            this.endingText.y = game.config.height / 2
            this.restartText.x = game.config.width / 2
            this.restartText.y = game.config.height *2 /3
            this.endingText.setVisible(true)
            this.restartText.setVisible(true)
            this.ending = true
            console.log(this.ending)
        }

        this.playerFSM.step()
    }
}