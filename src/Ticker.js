import * as PIXI from "pixi.js";
import { Howl } from "howler";
import gsap from "gsap";

export default class Ticker {
  constructor() {
    let ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      console.log("ticker");
      // Ensure enemy, scene, and ninja are defined
      if (this.enemy && this.enemy.enemies && this.ninja && this.scene) {
        this.enemy.enemies.forEach((_enemy) => {
          if (
            this.ht.checkme(this.ninja, _enemy.getChildAt(1)) &&
            _enemy.alive == true
          ) {
            console.log("HIT");

            if (_enemy.alive) {
              this.hitSound = new Howl({
                src: ["../assets/sound/goofy-hit.mp3"],
                volume: 0.4,
              });
              this.hitSound.play();
            }

            const currentEnemySpriteSheet = _enemy.getChildAt(0);
            console.log(currentEnemySpriteSheet);

            currentEnemySpriteSheet.state.setAnimation(0, "die", true);

            let enemyDieTimeline = gsap.timeline({
              onComplete: () => {
                this.scene.removeChild(_enemy);
              },
            });
            enemyDieTimeline.to(_enemy, {
              y: 300,
              duration: 0.7,
              ease: "Circ.easeOut",
            });
            enemyDieTimeline.to(_enemy, {
              y: 1200,
              duration: 0.5,
              ease: "Circ.easeIn",
            });
            _enemy.alive = false;
          } //end if
        }); //end foreach
      } //end first if
    }); // end ticker
  } //end constructor
}
