import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import "pixi-spine";
import { Spine } from "pixi-spine";
import setRandomInterval from "set-random-interval";

class Enemy {
  constructor(assets, scene) {
    console.log(assets, scene);

    this.settings = {
      startFrom: 0,
      endAt: 0,
      front: 0,
      enemyArray: [],
      enemyDuration: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50],
      from: ["left", "right"],
      counter: 0,
    };

    const interval = setRandomInterval(() => {

        let getFrom = this.settings.from[
            Math.floor(Math.random() * this.settings.from.length)
          ];

        //   console.log(getFrom);

          this.settings.counter++;

          if(getFrom == "left"){
            this.settings.startFrom = -400;
            this.settings.endAt = 1700;
            this.settings.front=-1;
          }
            else{
            this.settings.startFrom = 1700;
            this.settings.endAt = -400;
            this.settings.front = 1;
        }

        console.log(getFrom, this.settings.startFrom, this.settings.endAt);

      }, 1000, 5000);
  }
}

export default Enemy;
