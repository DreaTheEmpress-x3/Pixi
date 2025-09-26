import Enemy from "./Enemy";
import gsap from "gsap";

export default function setupPlayMover({ play, scene, assets, si, setEnemy}) {
  play.on("pointerdown", (event) => {
    event.stopPropagation();

    const enemy = new Enemy(assets, scene);
    setEnemy(enemy);

    event.stopPropagation();
    si.app.stage.eventMode = "static";
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
}
