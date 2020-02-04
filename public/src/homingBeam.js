import {Physics} from "phaser"

export default class HomingBeam extends Physics.Arcade.Sprite{
    constructor(scene, posX, posY, texture, rotationSprite, enemy){
        super(scene, posX, posY, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this) 
        this.scene.homingBeams.add(this)
        this.setScale(1.5)
        this.velocity = 400
        this.rotation = rotationSprite
        this.enemy =enemy

    }
    update(){
        this.targetAngle = Phaser.Math.Angle.BetweenPoints(this.getCenter(), this.enemy.getCenter())
        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.targetAngle)
        this.setVelocityX(this.velocity*Math.cos(this.rotation))
        this.setVelocityY(this.velocity*Math.sin(this.rotation))


    }
}


