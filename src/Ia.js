import { Howl } from "howler";

export default class Ia {
  constructor() {
    this.SoundArray = ["ia1", "ia2"];
    let getFromSoundArray = this.SoundArray[Math.floor(Math.random() * this.SoundArray.length)];
    this.sound = new Howl({
      src: [`./assets/sound/${getFromSoundArray}.mp3`],
      volume: 0.2,
    });
  }

  play() {
    this.sound.play();
  }
}