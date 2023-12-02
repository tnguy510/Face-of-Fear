class Quiz extends Phaser.Scene {
    constructor(){
        super('quizScene')
    }
    create(){
        this.bigPhobia = 0
        this.needlePhobia = 0
        this.holesPhobia = 0
    }

    update() {
        //NOTE: Maybe check if Left, RIght, OR Up are down and then just sort out in the if statement
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && !this.dialogTyping){
        //this.question1this.add.text()
        //move to Play Scene
        }
        
    }
    //this.scene.start('playScene')
}


//check nat's dialouge thing, the visual novel
//will have to make text fade in and out on my own