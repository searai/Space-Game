import Phaser from "phaser"
import stars from "./assets/images/Stars_nebulae/Stars.png"

export default class PauseScene extends Phaser.Scene{
    constructor(){
        super("PauseScene")
    }
    preload(){
        this.load.image('stars', stars);
    }

    create(){
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'stars');
        
        this.pauseText = this.add.text(this.game.config.width/2, this.game.config.height/2, "GAME PAUSED", {fontSize: "40px"})
        this.pauseText
        .setOrigin(0.5, 0.5)

        const resumeText = this.add.text(this.game.config.width/2, this.game.config.height/2 + 60, "RESUME", {fontSize: "40px"})
        resumeText
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown",()=>{
            this.scene.wake("MainScene").stop()
        })
        
  
    }

}



