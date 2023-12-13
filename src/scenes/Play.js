class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.background = this.add.image(0,0, 'dungeon').setOrigin(0)

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
        //else if(enemyType === "needle"){
        //    console.log("needle play")
        //}
        else if(enemyType === "hole"){
            console.log("hole play")
        }

        this.door = this.add.image(game.config.width / 2, 0,'door').setOrigin(0)

        this.player = new Player(this, 200, 150, 'player', 1, 'down')

        //const spider = this.physics.add.sprite(0, 0, 'spider')
        
        //this.enemy2 = new Enemy(this, this.world.randomX, this.world.randomX, enemyType, 1, 'down')
        //this.enemy2.body.collideWorldBounds = true
        //this.enemy3 = new Enemy(this, this.world.randomX, this.world.randomX, enemyType, 1, 'down')
        //this.enemy3.body.collideWorldBounds = true
        

        this.keys = this.input.keyboard.createCursorKeys()

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        moveEnemy(this, this.enemy1)

        this.backgroundNoise = this.sound.add('spidercrawl')
        this.backgroundNoise.loop = true
        this.backgroundNoise.play()

        this.player.body.onOverlap = true
        this.physics.add.overlap(this.enemy1, this.player)
        this.physics.world.on('overlap', () =>
        {
            this.gameover = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu').setOrigin(0.5);
            this.player.setVelocity(0)
            //this.player.destroy()

        }, null, this)

    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if(this.gameOver === true){
            console.log("gameover true")
        }
        else{
            this.playerFSM.step()
        }
        //setTimeout(moveEnemy, 3000, this, this.enemy)
        //if(enemyCollide) {
          //  gameover = true;
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu').setOrigin(0.5);
            //this.player.setVelocity(0)
            //this.player.destroy()
            
        //}

        if(this.checkCollision(this.player, this.door)) {
            this.scene.restart();
        }
    }

    checkCollision(player, object){
        //simple AABB checking
        if (player.x < object.x + object.width &&
            player.x + player.width > object.x &&
            player.y < object.y + object.height &&
            player.height + player.y > object.y){
                return true;
            } else {
                return false;
            }
    }
}