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
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize -
            borderPadding, 'Enter to Go to Quiz, Left for Spiders', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'Right for Needles, Up for Holes', menuConfig).setOrigin(0.5)
        //menu keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){
            console.log("regular menu")
            this.scene.start('quizScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            enemyType = "spider"
            console.log("spidertime")
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            enemyType = "needle"
            console.log("needletime")
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            enemyType = "hole"
            console.log("hole check")
            this.scene.start('playScene')
        }
        
    }
}