class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Ariel',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.background
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize -
        borderPadding, 'Face of Fear', menuConfig).setOrigin(0.5)
        //menu keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start('quizScene')
        }
    }
}