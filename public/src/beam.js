import {Physics}from "phaser"

export default class Beam extends Physics.Arcade.Sprite{
    constructor(scene, posX, posY, texture, rotationSprite){
        super(scene, posX, posY, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this) 
        if(texture == "playerBeam"){
            this.scene.playerBeams.add(this)
        }else{
            this.scene.enemyBeams.add(this)
        }
        this.setScale(1.5)
        this.velocity = 200
        this.rotation = rotationSprite
        this.setVelocityX(this.velocity*Math.cos(rotationSprite))
        this.setVelocityY(this.velocity*Math.sin(rotationSprite))


    }
    update(){
        if(this.x > this.scene.game.config.width || this.x < 0 || this.y > this.scene.game.config.height || this.y < 0){
            this.destroy()
        }
    }
}


