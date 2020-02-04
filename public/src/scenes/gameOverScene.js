import Phaser from "phaser"
import stars from "../assets/images/Stars_nebulae/Stars.png"
import store from "../store.js" 



export default class GameOverScene extends Phaser.Scene{
    constructor(){
        super("GameOverScene")
    }
    preload(){
        this.load.image('stars', stars);
    }

    create(){
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'stars');
        this.gameOverText = this.add.text(this.game.config.width/2, this.game.config.height/2, "GAME OVER", {fontSize: "40px"})
        this.gameOverText
        .setOrigin(0.5, 0.5)

        const restartText = this.add.text(this.game.config.width/2, this.game.config.height/2 + 60, "PLAY AGAIN", {fontSize: "40px"})
        restartText 
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown",()=>{
            store.level = 1
            this.scene.start("MainScene")
        })
      
  
    }

}



