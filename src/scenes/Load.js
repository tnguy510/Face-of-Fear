class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        
    }

    create(){


        // go to Menu once loading is done
        this.scene.start('menuScene')
    }
}