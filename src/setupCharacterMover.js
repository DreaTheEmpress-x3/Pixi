import { Howl } from "howler";
import { Texture } from "pixi.js";
import gsap from "gsap";

export default function setupCharacterMover({ appStage, ninja, ia, background, appWidth }) {
  appStage.on("pointerdown", (event) => {
    const hitSound = new Howl({
      src: ["../assets/sound/bonk-sound-effect-36055.mp3"],
      volume: 0.5,
    });
    hitSound.play();

    ia.play();

    ninja.stop();

    ninja.texture = Texture.from("../assets/images/ninja-jump.png");

    let mXPos = event.global.x;
    mXPos > appWidth / 2 ? (ninja.scale.x = -1) : (ninja.scale.x = 1);

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
}