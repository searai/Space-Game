import Phaser from "phaser"
import MainScene from "./mainScene.js"
import PauseScene from "./pauseScene.js"
import OpeningScene from "./openingScene.js"
import GameOverScene from "./gameOverScene.js"
import "./menu.js"
import "./highScore.js"


const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 800,
    parent: "game",
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
            }
       },
    scene:[
        OpeningScene,
        PauseScene,
        MainScene,
        GameOverScene,
    ]
}


new Phaser.Game(config);

//this the file changes branch