import {Scene} from "phaser"
import stars from "./assets/images/Stars_nebulae/Stars.png"
import StartButton from "./startButton.js"




export default class OpeningScene extends Scene{
    constructor(){
        super("OpeningScene")
    }
    preload(){
        this.load.image('stars', stars);
    }

    create(){
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'stars');
        new StartButton(this, this.game.config.width/2, this.game.config.height/2)
        // this.cameras.main
        // .setOrigin(0.5,0.5)
        // .setPosition(this.game.config.width/2, this.game.config.height/2)
        // .setSize(500)
    }

}



