class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) //call Sprite parent class
        scene.add.existing(this)
        scene.physics.add.existing(this)   //add physics body to scene

        this.body.setSize(this.width / 2, this.height)
        this.body.setCollideWorldBounds(true)

        //set custom Player properties
        this.direction = direction
        this.playerVelocity = 100     //in pixels
        this.hurtTimer = 250        //in ms

        scene.playerFSM = new StateMachine( 'idle', {
            idle: new IdleState(),
            move: new MoveState(),
            //dead: new DeadState(),
        }, [scene, this])

    }
}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play(`walk-${player.direction}`)
        player.anims.stop()
    }

    execute(scene, player) {
        const{left, right, up, down} = scene.keys
        if(left.isDown || right.isDown || up.isDown || down.isDown) {
            this.stateMachine.transition('move')
            return
        }

        //if(gameover === true){
         //   this.stateMachine.transition('dead')
        //}/

    }
}

class MoveState extends State {
    execute(scene, player) {
        const {left, right, up, down} = scene.keys

        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0,0)
        if(up.isDown) {
            moveDirection.y = -1
            player.direction = 'up'
        } else if(down.isDown) {
            moveDirection.y = 1
            player.direction = 'down'
        }
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }

        moveDirection.normalize()
        player.setVelocity(player.playerVelocity * moveDirection.x, player.playerVelocity * moveDirection.y)
        player.anims.play(`walk-${player.direction}`, true)

        
    }
}

//class DeadState extends State {
  //  execute(scene, player) {
        //player.setVelocity(0)
        //player.anims.play(`walk-${player.direction}`)
   //     if(!gameover === true){
            //player.destroy()
   //         this.stateMachine.transition('idle')
   //         return
  //      }
  //  }
//}