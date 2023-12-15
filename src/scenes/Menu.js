class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Ultra',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/3 - borderUISize -
            borderPadding, 'Face of Fear', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'Choose Your Fear', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, 2*game.config.height/3 - borderUISize -
            borderPadding, '← for Spiders, → for Needles, ↑ for Holes', menuConfig).setOrigin(0.5)
        //menu keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            enemyType = "spider"
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            enemyType = "needle"
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            enemyType = "hole"
            this.scene.start('playScene')
        }
        
    }
}