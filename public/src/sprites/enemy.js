import Phaser from "phaser"
import beam from "./beam.js"
import store from "../store.js"

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, posX, posY){
        super(scene, posX, posY, "enemyship")
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.enemies.add(this) 
        this.setScale(0.6)
        this.velocity = 100
        this.fire = false
        this.setInteractive()
        this.setAngle(160)
        this.on("pointerdown", ()=>{
            this.scene.player.generateHomingBeam(this)
        })
        this.cumulativeTime = 0
        this.health = 2
        this.setDistanceBetweenEnemies()

    }
    update(time, delta){
        this.targetAngle = Phaser.Math.Angle.BetweenPoints(this.getCenter(), this.scene.player.getCenter())
        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.targetAngle)
        this.setVelocityX(this.velocity*Math.cos(this.rotation))
        this.setVelocityY(this.velocity*Math.sin(this.rotation))

        if(Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 300){
            this.velocity = 0
        }else{
            this.velocity = 100
        }
        this.attackAngle = .69 
        this.differenceAngle = Math.abs(this.rotation - this.targetAngle)
        if(this.differenceAngle < this.attackAngle || 2*Math.PI - this.differenceAngle  <  this.attackAngle){
            this.fire = true
        }else{
            this.fire = false
        }

        this.generateBeam(delta)
        this.testForkill()

    }

    testForkill(){
        if(this.health <= 0){
            store.score += 10
            this.scene.score.setText(store.score)
            this.destroy()
        }
    }

    generateBeam(timeInterval){
        this.cumulativeTime  += timeInterval
        if(this.cumulativeTime > 2000){
            if(this.fire){
                new beam(this.scene, this.getRightCenter().x, this.getRightCenter().y, "enemyBeam" , this.rotation)
            }
            this.cumulativeTime = 0
        }

    }
   
    setDistanceBetweenEnemies(){
        this.x = Math.floor(Math.random()*(this.scene.game.config.width - this.displayWidth/2))
        this.y = Math.floor(Math.random()*(this.scene.game.config.height - this.displayHeight/2))
        this.scene.enemies.getChildren().forEach(child=>{
            if(this != child){
                if(Phaser.Math.Distance.Between(this.x, this.y, child.x, child.y) < 150){
                    this.setDistanceBetweenEnemies()
                }

            }
        })

    }
}


