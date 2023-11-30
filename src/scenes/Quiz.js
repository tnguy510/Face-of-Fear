class Quiz extends Phaser.SCene {
    constructor(){
        super('quizScene')
    }
    create(){
        this.bigPhobia = 0
        this.needlePhobia = 0
        this.holesPhobia = 0
    }

    update() {
        this.question1this.add.text()
        //move to Play Scene
        
    }
}

this.scene.start('playScene')
//check nat's dialouge thing, the visual novel
//will have to make text fade in and out on my own