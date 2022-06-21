//IMPORT
import * as PIXI from "pixi.js";
import { Game } from "./game";

//GAME CLASS ENEMY (fish)
export class Enemy extends PIXI.Sprite {

  //GLOABALS
  private game: Game;
  private speed: number;
  private hitbox: PIXI.Rectangle

  //CONSTRUCTOR
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
    this.pivot.set(0.5)

    this.speed = 3;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight + 50;

    this.anchor.set(0.5);
    this.scale.set(1, 1);

    this.hitbox = new PIXI.Rectangle(0, 0, 60, 55)

  }

  //ANIMATION
  public update(delta: number) {
    this.x += this.speed * delta;
    this.y += Math.cos(this.x * 0.03) * 1.1;

    //Random spawn if appearing on screen again
    if (this.x < -20) {
      this.x = -20;
      this.y = Math.random() * window.innerHeight;
    }

    this.keepInScreen();
  }

  //BOUNDS
  getBounds(): PIXI.Rectangle {
    return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  //KEEP IN SCREEN
  private keepInScreen() {
    if (this.getBounds().left > this.game.pixi.screen.right) {
      this.x = -this.getBounds().width;
    }
  }
}