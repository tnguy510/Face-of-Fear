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
                this["enemy"+i] = new Enemy(this, Phaser.Math.Between(0, game.config.width), 
                Phaser.Math.Between(0, game.config.height), enemyType, 0, 'down')
                this["enemy"+i].setScale(0.3)
                moveEnemy(this, this["enemy"+i])
            }
        }
        else if(enemyType === "hole"){
            //for(let i = 0; i <= difficulty * 5; i++){
            //    this.physics.add.image(Phaser.Math.Between(0, map.widthInPixels), 
           //     Phaser.Math.Between(0, map.heightInPixels),'hole').setScale(Phaser.Math.Between(0.01, 0.3))
            //    console.log("hole made")
            //}
        }

        const playerSpawn = map.findObject('Events', obj => obj.name === 'playerSpawn')
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 1, 'down')

        this.keys = this.input.keyboard.createCursorKeys()

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        //background noise
        this.backgroundNoise = this.sound.add('spidercrawl')
        this.backgroundNoise.loop = true
        this.backgroundNoise.play()

        //camera logic
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)


        //wall collision
        wallsLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.collider(this.player, wallsLayer)

        if(enemyType === "spider" || enemyType === "needle"){
            for(let i = 1; i <= difficulty; i++){
                this.physics.add.collider(this["enemy"+i], wallsLayer)
            }
        }

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
        this.pauseText = this.add.text(0, 0, 'Game Paused', pauseConfig).setOrigin(0.5).setVisible(false)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.isPause = !this.isPause
        }
        if(this.isPause === true){
            this.pauseText.setVisible(true)
            this.physics.pause()

        }
        else{
            this.pauseText.x = game.config.width / 2
            this.pauseText.y = this.player.y
            this.pauseText.setVisible(false)
            this.physics.resume()
        }

        if (this.physics.overlap(this.player, this.door)) {
            difficulty += 1
            if(difficulty >= 5){
                ending = true
                this.scene.start('endingScene')
            }
            else{
                this.scene.restart();
            }
        }

        this.playerFSM.step()

    }

}