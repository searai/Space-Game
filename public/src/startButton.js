import Phaser from "phaser"

export default class StartButton extends Phaser.GameObjects.Text{
    constructor(scene, x, y) {
      super(scene, x, y, "start the game", { fontSize: "30px"});
      this.setInteractive({ useHandCursor: true });
      this.scene.add.existing(this)
      this.on("pointerdown", ()=>{
          this.scene.scene.start("MainScene")
      })
      this.setOrigin(0.5, 0.5)
    }
  }