import Stage from "./Stage.js";
import * as PIXI from "pixi.js";
import { Sprite, Texture } from "pixi.js";
import { Howl } from "howler";
// import { sound } from "@pixi/sound";
import gsap from "gsap";
import Enemy from "./Enemy";
import Hittest from "./Hittest.js";

class Game {
  constructor(assets) {
    this.enemy;

    this.ht = new Hittest();

    console.log("Game ready");
    let myStage = new Stage();

    this.scene = myStage.scene;
    this.scene.sortableChildren = true;
    let background = myStage.bg;
    this.si = myStage.stageInfo;

    const bg = Sprite.from(assets.background);
    background.addChild(bg);

    const ninja = new PIXI.AnimatedSprite(assets.ninja.animations["alien"]);
    ninja.anchor.set(0.5);
    ninja.x = 512;
    ninja.y = 768 - 150;
    ninja.buttonMode = true;
    ninja.zIndex = 2;
    ninja.animationSpeed = 0.5;
    ninja.play();

    this.scene.addChild(ninja);

    this.si.app.stage.eventMode = "static";

    const play = Sprite.from(assets.play);
    play.anchor.set(0.5);
    play.x = 512;
    play.y = 250;
    play.eventMode = "static";
    play.buttonMode = true;
    this.scene.addChild(play);

    play.on("pointerdown", (event) => {
      event.stopPropagation();

      this.enemy = new Enemy(assets, this.scene);

      event.stopPropagation();
      this.si.app.stage.eventMode = "static";
      gsap.to(event.currentTarget, {
        duration: 0.5,
        delay: 0.2,
        y: play.y - 350,
        ease: "Elastic.easeInOut",
      });
      let soundSwirp = new Howl({
        src: ["./assets/sound/effekt_swish.mp3"],
        volume: 0.2,
      });
      let timerid = setTimeout(() => {
        soundSwirp.play();
      }, 500);
    });

    this.si.app.stage.on("pointerdown", (event) => {
      this.hitSound = new Howl({
        src: ["../assets/sound/bonk-sound-effect-36055.mp3"],
        volume: 0.5,
      });
      this.hitSound.play();

      ninja.stop();

      ninja.texture = Texture.from("../assets/images/ninja-jump.png");

      let mXPos = event.global.x;
      mXPos > this.si.appWidth / 2 ? (ninja.scale.x = -1) : (ninja.scale.x = 1);

      let newPosition = event.getLocalPosition(background);
      gsap.to(ninja, {
        duration: 0.2,
        x: newPosition.x - 300,
        y: newPosition.y,
        ease: "Circ.easeOut",
        onComplete: () => {
          gsap.to(ninja, {
            duration: 0.2,
            x: 500,
            y: 768 - 150,
            ease: "Circ.easeOut",
          });

          ninja.play();
        },
      });
    });

    let ticker = PIXI.Ticker.shared;
    ticker.add((delta) => {
      console.log("ticker");
      if (this.enemy != undefined) {
        this.enemy.enemies.forEach((_enemy) => {
          if (this.ht.checkme(ninja, _enemy.getChildAt(1))) {
            console.log("HIT");

            const currentEnemySpriteSheet = _enemy.getChildAt(0);
            console.log(currentEnemySpriteSheet);

            currentEnemySpriteSheet.state.setAnimation(0, "die", true);
          }
        });
      }
    });
  } //end constructor
}

export default Game;
