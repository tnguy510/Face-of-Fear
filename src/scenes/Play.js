class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    create(){
        if(spiderVer === 1){
            console.log("spider play")
        }
        else if(needleVer === 1){
            console.log("needle play")
        }
        else if(holesVer === 1){
            console.log("hole play")
        }
    }
}