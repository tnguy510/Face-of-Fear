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

    }
}

function moveEnemy(scene, enemy) {
    if(enemy == null){
        console.log("undefined")
        return
    }

    var move = Math.floor(Math.random() * 5)

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
    else{
        
    }

    moveDirection.normalize()
    enemy.setVelocity(enemy.enemyVelocity * moveDirection.x, enemy.enemyVelocity * moveDirection.y)
    //if(ending === true){
    //    return
    //}
    //else{
    //    setTimeout(moveEnemy, 300, scene, enemy)
    //}
}