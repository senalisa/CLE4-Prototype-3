import * as PIXI from "pixi.js";
import { Game } from "./game";

//Import SOUND
import bgSound from "./sound/dino.mp3";

export class Hero extends PIXI.Sprite {

  //GLOBALS
  private speed: number = 0;
  private game: Game;
  private hitbox: PIXI.Rectangle
  public loader: PIXI.Loader;
  public bgSound: HTMLAudioElement

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {

    super(texture);
    this.game = game;
    this.pivot.set(0.5)

    //SCALE
    this.x = 1300
    this.y = 400
    this.scale.set(1, 1);

    //KEYDOWN AND UP EVENT LISTENER
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

    //HITBOX
    this.hitbox = new PIXI.Rectangle(0, 40, 40, 40)

    //LOADER FOR SOUND
    this.loader = new PIXI.Loader();
    this.loader
      .add("bgSound", bgSound)
    this.loader.load(() => this.soundLoad());
  }

  //BACKGROUND SOUND
  //make variable with sound
  soundLoad() {
    this.bgSound = this.loader.resources["bgSound"].data!
    this.bgSound.volume = 0.85
  }

  //KEYBOARD
  onKeyDown(e: KeyboardEvent): any {
    if (e.key === "ArrowUp") {
      this.speed = -5;
    }
    if (e.key === "ArrowDown") {
      this.speed = 5;
    }
  }
  onKeyUp(e: KeyboardEvent): any {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.speed = 0;
      //play background sound
      this.bgSound.play()
    }
  }

  //ANIMATION
  public update() {
    this.y += this.speed;

    this.keepInScreen();
  }

  //BOUNDS
  getBounds(): PIXI.Rectangle {
    return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = this.game.pixi.screen.right;
    }
  }
}
