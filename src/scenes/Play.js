class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        this.background = this.add.image(0,0, 'dungeon').setOrigin(0)

        if(spiderVer === 1){
            console.log("spider play")
        }
        else if(needleVer === 1){
            console.log("needle play")
        }
        else if(holesVer === 1){
            console.log("hole play")
        }

        this.player = new Player(this, 200, 150, 'player', 1, 'down')
        this.keys = this.input.keyboard.createCursorKeys()

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.playerFSM.step()
    }
}