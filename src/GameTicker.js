import * as PIXI from "pixi.js";
import { Howl } from "howler";
import gsap from "gsap";

export default function setupGameTicker({ ninja, getEnemies, ht, scene }) {
  const ticker = PIXI.Ticker.shared;
  ticker.add((delta) => {
    // Get the latest enemies array each tick
    const enemies = getEnemies();
    if (enemies) {
      enemies.forEach((_enemy) => {
        if (ht.checkme(ninja, _enemy.getChildAt(1)) && _enemy.alive === true) {
          console.log("HIT");

          if (_enemy.alive) {
            const hitSound = new Howl({
              src: ["../assets/sound/goofy-hit.mp3"],
              volume: 0.4,
            });
            hitSound.play();
          }

          const currentEnemySpriteSheet = _enemy.getChildAt(0);
          currentEnemySpriteSheet.state.setAnimation(0, "die", true);

          let enemyDieTimeline = gsap.timeline({
            onComplete: () => {
              scene.removeChild(_enemy);
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
        }
      });
    }
  });
}