import Phaser from "phaser"
import stars from "../assets/images/Stars_nebulae/Stars.png"
import store from "../store.js" 



export default class GameOverScene extends Phaser.Scene{
    constructor(){
        super("GameOverScene")
    }
    init(data){
        if(data.added){
            this.success = true
            this.failure = false
        }else{
            this.success = false
            this.failure = true
        }
    }
    preload(){
        this.load.image('stars', stars);
    }

    create(){
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'stars');

        this.add.text(this.game.config.width/2, this.game.config.height/2 - 150, ["CONGRATULATIONS YOU MADE", "THE LEADERBOARD"], {fontSize: "40px"})
        .setOrigin(0.5, 0.5)
        .setVisible(this.success)

        this.add.text(this.game.config.width/2, this.game.config.height/2 - 150, ["UNFORTUNATELY YOU DIDN'T", "MAKE THE LEADERBOARD"], {fontSize: "40px"})
        .setOrigin(0.5, 0.5)
        .setVisible(this.failure)

        this.add.text(this.game.config.width/2, this.game.config.height/2, "GAME OVER", {fontSize: "40px"})
        .setOrigin(0.5, 0.5)

        this.add.text(this.game.config.width/2, this.game.config.height/2 + 60, "PLAY AGAIN", {fontSize: "40px"})
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown",()=>{
            store.level = 1
            this.scene.start("MainScene")
        })
      
  
    }

}



