import Phaser from "phaser"
import MainScene from "./scenes/mainScene.js"
import PauseScene from "./scenes/pauseScene.js"
import OpeningScene from "./scenes/openingScene.js"
import GameOverScene from "./scenes/gameOverScene.js"

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

