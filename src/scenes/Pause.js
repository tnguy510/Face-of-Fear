class Play extends Phaser.Scene {
    constructor() {
        super("pauseScene")
    }

    create(){
        console.log("inpause")
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            console.log("unpause")
        }
        
    }
}