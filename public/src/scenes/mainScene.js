import Phaser from "phaser"
import Player from "../sprites/player.js"
import Enemy from "../sprites/enemy.js"
import store from "../store.js"  
import stars from "../assets/images/Stars_nebulae/Stars.png"
import nebula from "../assets/images/Stars_nebulae/Nebula1.png"
import teleportIcon from "../assets/images/teleportIcon.png"
import playerBeam from "../assets/images/Muzzle_flashes/playerBeam.png"
import enemyBeam from "../assets/images/Muzzle_flashes/enemyBeam.png"
import playership from "../assets/images/alien_ships/playership.png"
import enemyship from "../assets/images/alien_ships/enemyship.png"
import barrier from "../assets/images/barrier.png"



export default class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene")
    }

    preload(){
        this.load.image('stars', stars);
        this.load.image('nebula', nebula);
        this.load.image('playership', playership);
        this.load.image('enemyship', enemyship);
        this.load.image('playerBeam', playerBeam);
        this.load.image('enemyBeam', enemyBeam);
        this.load.image('teleportIcon', teleportIcon);
        this.load.image('barrier', barrier);


    }

    create(){
   
        this.input.keyboard.on("keydown-P",()=>{
            this.scene.switch("PauseScene")
        })

        this.add.image(this.game.config.width/2, this.game.config.height/2, 'stars')
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'nebula')

        this.barrier = this.physics.add.staticImage(this.game.config.width/2, 60, "barrier")

        this.playerBeams = this.physics.add.group({runChildUpdate:true})
        this.homingBeams = this.physics.add.group({runChildUpdate:true})
        this.enemyBeams = this.physics.add.group({runChildUpdate:true})
        this.players = this.physics.add.group({runChildUpdate:true})
        this.enemies = this.physics.add.group({runChildUpdate:true})

        this.player = new Player(this, this.game.config.width/2, this.game.config.height/2)

        for(let i = 0; i < store.level *2;  i++){
            new Enemy(this, 0, 0)
        }

        this.physics.add.collider(this.enemies, this.enemies)
        this.physics.add.collider(this.player, this.enemies)
        this.physics.add.collider(this.player,  this.barrier)

        this.physics.add.overlap(this.players, this.enemyBeams,(player,enemyBeam)=>{
            enemyBeam.destroy()
            player.health -= 1
            player.healthBar.width = player.health * player.healthStep
            
        })

        this.physics.add.overlap(this.enemies, this.playerBeams , (enemy, playerBeam)=>{
            playerBeam.destroy()
            enemy.health -= 1
            
        })

        this.physics.add.overlap(this.enemies, this.homingBeams , (enemy, homingBeam)=>{
            homingBeam.destroy()
            enemy.health -= 2
            
        })

        this.add.text(this.game.config.width/2-100 , 20, "SCORE: ", {fontSize: "40px"})
        this.score = this.add.text(this.game.config.width/2 + 40, 20, `${store.score}`, {fontSize: "40px"})
        

   
    }
    update(){

        if (this.enemies.getLength() == 0){
            store.level += 1
            this.scene.restart()
        }

    
    }

}



