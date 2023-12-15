class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        //tilemap info
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilemap', 'tilesetImage')

        //calling on tiled information
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const wallsLayer = map.createLayer('walls', tileset, 0, 0)
        
        const doorEvent = map.findObject('Events', obj=> obj.name === 'doorEvent')
        this.door = this.physics.add.image(doorEvent.x, doorEvent.y,'door')

        //spawns # of class Enemies depending on difficultys
        if(enemyType === "spider" || enemyType === "needle"){
            if(enemyType == "spider"){
                this.backgroundNoise = this.sound.add('spidercrawl')
                for(let j = 0; j < 5; j++){
                    var webs = this.add.image(Phaser.Math.Between(map.widthInPixels/ 10, map.widthInPixels * 9/ 10), 
                    Phaser.Math.Between(map.heightInPixels / 10, map.heightInPixels * 9/ 10),'web')
                }
            }
            if(enemyType == "needle"){
                this.backgroundNoise = this.sound.add('lights')
                for(let j = 0; j < 5; j++){
                    var gloves = this.add.image(Phaser.Math.Between(map.widthInPixels/ 10, map.widthInPixels * 8/ 10), 
                    Phaser.Math.Between(map.heightInPixels / 10, map.heightInPixels * 9/ 10),'gloves')
                    gloves.setScale(0.1)
                }
            }
            for(let i = 1; i <= difficulty; i++){
                this["enemy"+i] = new Enemy(this, Phaser.Math.Between(map.widthInPixels/ 10, map.widthInPixels * 9/ 10), 
                Phaser.Math.Between(map.heightInPixels / 10, map.heightInPixels * 9/ 10), enemyType, 0, 'down')
                this["enemy"+i].setScale(0.3)
                moveEnemy(this, this["enemy"+i])
            }
        }
        //special case for holes
        else if(enemyType === "hole"){
            this.backgroundNoise = this.sound.add('creaking')
            for(let i = 1; i <= difficulty * 100; i++){
                var hole = this.add.image(Phaser.Math.Between(map.widthInPixels/ 10, map.widthInPixels * 9/ 10), 
                Phaser.Math.Between(map.heightInPixels / 10, map.heightInPixels * 9/ 10),'hole')
                hole.setScale(0.1)
            }
        }

        //spawning in player
        const playerSpawn = map.findObject('Events', obj => obj.name === 'playerSpawn')
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 1, 'down')
        this.player.setScale(1.5)

        this.keys = this.input.keyboard.createCursorKeys()

        //background noise logic
        this.backgroundNoise.loop = true
        this.backgroundNoise.play()

        this.doorSound = this.sound.add('doorclose', {volume: 0.5})

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
            if(difficulty >= 6){
                ending = true
                this.game.sound.stopAll()
                this.doorSound.play()
                this.scene.start('endingScene')
            }
            else{
                this.doorSound.play()
                this.scene.restart();
            }
        }

        this.playerFSM.step()

    }

}