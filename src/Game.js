import Stage from "./Stage.js";
import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import Hittest from "./Hittest.js";
import Ia from "./Ia.js";
import setupGameTicker from "./GameTicker.js";
import setupCharacterMover from "./setupCharacterMover.js";
import setupPlayMover from "./setupPlayMover.js";

class Game {
  constructor(assets) {
    this.ia = new Ia();

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

    this.hitareaNinja = new PIXI.Graphics();
    this.hitareaNinja.beginFill(0xde3249);
    this.hitareaNinja.drawRect(-90, -70, 180, 150); //x, y, w, h
    this.hitareaNinja.alpha = 0.5;
    this.hitareaNinja.endFill();
    this.scene.addChild(this.hitareaNinja);

    setupPlayMover({
      play,
      ninja,
      scene: this.scene,
      assets,
      si: this.si,
      setEnemy: (enemy) => {
        this.enemy = enemy;
      },
    });

    setupCharacterMover({
      appStage: this.si.app.stage,
      ninja,
      ia: this.ia,
      background,
      appWidth: this.si.appWidth,
    });

    setupGameTicker({
      ninja,
      getEnemies: () => (this.enemy ? this.enemy.enemies : []),
      ht: this.ht,
      scene: this.scene,
      hitareaNinja: this.hitareaNinja,
    });
  } //end constructor
}

export default Game;
