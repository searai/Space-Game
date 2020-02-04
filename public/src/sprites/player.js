import {Physics}from "phaser"
import beam from "./beam.js"
import homingBeam from "./homingBeam.js"


export default class Player extends Physics.Arcade.Sprite{
    constructor(scene, posX, posY,){
        super(scene, posX, posY, "playership")
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.players.add(this) 
        this.setCollideWorldBounds(true);
        this.setScale(0.5)
        this.velocity = 0
        this.w = this.scene.input.keyboard.addKey('W');
        this.s = this.scene.input.keyboard.addKey('S');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        this.scene.input.keyboard.on("keydown-SPACE",()=>{
            this.generateBeam()
        })
        this.health = 10
        this.healthBar = this.scene.add.rectangle(this.scene.game.config.width - 40, 5 ,250, 50, 0x00ff00)
        .setOrigin(1,0)
        this.healthStep = this.healthBar.width/ this.health

        this.teleportCooldown = false
        this.teleportCooldownTimer = 5000
        
        let testTopLeftForOverLap
        let testTopRightForOverLap 
        let testBottomLeftForOverLap
        let testBottomRightForOverLap
        let overlap 

        this.scene.input.on("pointerdown",(pointer)=>{
            if(!this.teleportCooldown){
                if(pointer.button == 0){
                    this.prevX = this.x
                    this.prevY = this.y
                    this.x = pointer.x
                    this.y = pointer.y
                    overlap = false

                    for(let i = 0; i < this.scene.enemies.getLength(); i++){
                        testTopLeftForOverLap      =  this.getTopLeft().x > this.scene.enemies.getChildren()[i].getBounds().left && this.getTopLeft().x < this.scene.enemies.getChildren()[i].getBounds().right
                                                        &&  this.getTopLeft().y > this.scene.enemies.getChildren()[i].getBounds().top &&  this.getTopLeft().y < this.scene.enemies.getChildren()[i].getBounds().bottom
                                                        ? true : false
                        testTopRightForOverLap     =  this.getTopRight().x > this.scene.enemies.getChildren()[i].getBounds().left && this.getTopRight().x < this.scene.enemies.getChildren()[i].getBounds().right
                                                        &&  this.getTopRight().y > this.scene.enemies.getChildren()[i].getBounds().top &&  this.getTopRight().y < this.scene.enemies.getChildren()[i].getBounds().bottom
                                                        ? true : false
                        testBottomLeftForOverLap   =  this.getBottomLeft().x > this.scene.enemies.getChildren()[i].getBounds().left && this.getBottomLeft().x < this.scene.enemies.getChildren()[i].getBounds().right
                                                        &&  this.getBottomLeft().y > this.scene.enemies.getChildren()[i].getBounds().top &&  this.getBottomLeft().y < this.scene.enemies.getChildren()[i].getBounds().bottom
                                                        ? true : false
                        testBottomRightForOverLap  =  this.getBottomRight().x > this.scene.enemies.getChildren()[i].getBounds().left && this.getBottomRight().x < this.scene.enemies.getChildren()[i].getBounds().right
                                                        &&  this.getBottomRight().y > this.scene.enemies.getChildren()[i].getBounds().top &&  this.getBottomRight().y < this.scene.enemies.getChildren()[i].getBounds().bottom
                                                        ? true : false               

                        
                        if(testTopLeftForOverLap||testTopRightForOverLap ||testBottomLeftForOverLap||testBottomRightForOverLap){
                            overlap = true
                            break
                        }
                    }

                    if(overlap){
                        this.x =  this.prevX
                        this.y =  this.prevY
                    }else{
                        this.teleportCooldown = true
                        this.teleportCooldownTimerText.setVisible(true)
                        this.teleportImage.setVisible(true)
                    }
                
                
                }
            }    
        })

        this.teleportImage = this.scene.add.image(0, 0, 'teleportIcon')
        this.teleportImage
        .setOrigin(0, 0)
        .setDisplaySize(50, 50)
        .setVisible(false)

        this.teleportCooldownTimerText = this.scene.add.text(60, 0, `${this.teleportCooldownTimer/1000}`, {fontSize: "40px"})
        this.teleportCooldownTimerText
        .setOrigin(0, 0)
        .setVisible(false)

    }
    update(time, delta){
        if(this.w.isDown){
            this.velocity = 200
        }else if(this.s.isDown){
            this.velocity = -200
        }else{
            this.velocity = 0
        }

        if(this.a.isDown){
            this.setAngularVelocity(-50)
        }else if(this.d.isDown){
            this.setAngularVelocity(50)
        }else{
            this.setAngularVelocity(0)
        }

        this.setVelocityX(this.velocity*Math.cos(this.rotation))
        this.setVelocityY(this.velocity*Math.sin(this.rotation))

        if(this.health == 0){
            this.scene.scene.start("GameOverScene")
           
        }
        
        this.teleport(delta)
        
    }

    generateBeam(){
        new beam(this.scene, this.getRightCenter().x, this.getRightCenter().y, "playerBeam" , this.rotation)
    }

    generateHomingBeam(enemy){
        new homingBeam(this.scene, this.getRightCenter().x, this.getRightCenter().y, "playerBeam" , this.rotation, enemy)
    }

    teleport(timeInterval){
        if(this.teleportCooldown){
            if(this.teleportCooldownTimer > 0){
                this.teleportCooldownTimer -= timeInterval
            }else{
                this.teleportCooldownTimer = 5000
                this.teleportCooldown = false
                this.teleportCooldownTimerText.setVisible(false)
                this.teleportImage.setVisible(false)
            }
            this.teleportCooldownTimerText.setText((this.teleportCooldownTimer/1000).toFixed(2))
        }
        
    }
}


