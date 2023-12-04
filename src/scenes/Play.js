class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        this.background = this.add.image(0,0, 'dungeon').setOrigin(0)

        if(enemyType === "spider" || enemyType === "needle"){
            console.log("spider play")
            this.enemy1 = new Enemy(this, 200, 300, enemyType, 0, 'down')
            this.enemy1.body.collideWorldBounds = true
            this.enemy1.setScale(.3)
        }
        //else if(enemyType === "needle"){
        //    console.log("needle play")
        //}
        else if(enemyType === "hole"){
            console.log("hole play")
        }

        this.player = new Player(this, 200, 150, 'player', 1, 'down')

        //const spider = this.physics.add.sprite(0, 0, 'spider')
        //this.enemy1 = new Enemy(this, 200, 300, enemyType, 1, 'down')
        
        //this.enemy2 = new Enemy(this, this.world.randomX, this.world.randomX, enemyType, 1, 'down')
        //this.enemy2.body.collideWorldBounds = true
        //this.enemy3 = new Enemy(this, this.world.randomX, this.world.randomX, enemyType, 1, 'down')
        //this.enemy3.body.collideWorldBounds = true
        

        this.keys = this.input.keyboard.createCursorKeys()

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.playerFSM.step()
        //setTimeout(moveEnemy, 3000, this, this.enemy)
    }
}