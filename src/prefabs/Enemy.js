class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) //call Sprite parent class
        scene.add.existing(this)
        scene.physics.add.existing(this)   //add physics body to scene

        this.body.setSize(this.width, this.height/2)
        this.body.setCollideWorldBounds(true)

        //set custom Enemy  properties
        this.direction = direction
        this.texture =  texture
        this.enemyVelocity = 100     //in pixels

        //for (var i = 0; i < game.config.width; i++){
        //    let enemy = new Enemy(this, Phaser.Math.Between(0, game.config.width), 
        //        Phaser.Math.Between(0, game.config.height), this.texture, 0, 'down')
                //scene, x, y, texture, frame, direction
        //        this.physics.add.existing(enemy)
        //}
    }
}

function moveEnemy(scene, enemy) {
    //execute(scene, player) {
        var move = Math.floor(Math.random() * 4)
        console.log(move)

        let moveDirection = new Phaser.Math.Vector2(0,0)
        if(move === 1) {
            moveDirection.y = -1
            enemy.direction = 'up'
        } else if(move === 2) {
            moveDirection.y = 1
            enemy.direction = 'down'
        }
        if(move === 3) {
            moveDirection.x = -1
            enemy.direction = 'left'
        } else if(move === 4) {
            moveDirection.x = 1
            enemy.direction = 'right'
        }
        if(move === 0){
            
        }
        //this.time.delayedCall(10000)
        console.log("pass")

        moveDirection.normalize()
        enemy.setVelocity(enemy.enemyVelocity * moveDirection.x, enemy.enemyVelocity * moveDirection.y)
        //enemy.anims.play(`walk-${player.direction}`, true)
    //}
}