import * as PIXI from "pixi.js";
import { Howl } from "howler";
import gsap from "gsap";
import { Sprite } from "pixi.js";

export default function setupGameTicker({
  ninja,
  getEnemies,
  ht,
  scene,
  hitareaNinja,
}) {
  const ticker = PIXI.Ticker.shared;
  ticker.add((delta) => {
    hitareaNinja.x = ninja.x;
    hitareaNinja.y = ninja.y;
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

          if (ht.checkme(hitareaNinja, _enemy.getChildAt(1))) {
            console.log("KILL");
          }

          const currentEnemySpriteSheet = _enemy.getChildAt(0);
          currentEnemySpriteSheet.state.setAnimation(0, "attack", true);

          let timeToNinjaIsHurt = setTimeout(() => {
            ninja.stop();
            ninja.texture = PIXI.Texture.from(
              "../assets/images/ninja-hurt.png"
            );
            gsap.to(ninja, {
              duration: 0.7,
              y: 650,
              ease: "Circ.easeOut",
              onComplete: () => {
                ninja.play();
                gsap.to(ninja, {
                  duration: 0.4,
                  y: 768 - 150,
                });
              },
            });
          }, 300);
          _enemy.alive = false;
          _enemy.attack = false;

          gsap.to(_enemy, {
            duration: 0.7,
            y: 550,
            ease: "Circ.easeOut",
            onComplete: () => {
              gsap.to(_enemy, {
                duration: 0.5,
                y: 768 - 50,
                ease: "Circ.easeOut",
              });
              currentEnemySpriteSheet.state.setAnimation(
                0,
                "walk",
                true
              );
            },
          });

          let enemyDieTimeline = gsap.timeline
          ({
             onComplete: () => {
               scene.removeChild(_enemy);
             },
          });
          enemyDieTimeline.to(_enemy, {
            y: -50,
            duration: .1,
            ease: "Circ.easeOut",
          });
          enemyDieTimeline.to(_enemy, {
            y: 700,
            duration: .4,
            ease: "Circ.easeIn",
          });
          _enemy.alive = false;
        }
      });
    }
  });
}
