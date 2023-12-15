class End extends Phaser.Scene {
    constructor() {
        super('endingScene')
    }
    create(){
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        //tilemap info
        const map = this.add.tilemap('room_tilemapJSON')
        const tileset = map.addTilesetImage('tilemap', 'tilesetImage')
        
        const bgLayer = map.createLayer('background', tileset, 0, 0)
        const wallsLayer = map.createLayer('walls', tileset, 0, 0)
        const furnitureLayer = map.createLayer('furniture', tileset, 0, 0)

        const playerSpawn = map.findObject('Events', obj => obj.name === 'playerSpawn')
        if(!playerSpawn){
            console.log("somethings wrong")
        }
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 1, 'up')

        this.keys = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)


        //wall collision
        wallsLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.collider(this.player, wallsLayer)
    }
    update(){
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
        this.playerFSM.step()
    }
}