//IMPORT
import * as PIXI from "pixi.js";
import { Game } from "./game";

//ENEMY CLASS
export class LetterC extends PIXI.Sprite {

    //GLOBALS
    private game: Game;
    public speed: number = 7;

    //CONSTRUCTOR
    constructor(texture: PIXI.Texture, game: Game) {
        super(texture);
        this.game = game;
        this.pivot.set(0.5)

        this.speed = 2.5;
        this.x = -1200
        this.y = 300

        this.scale.set(1.2, 1.2);

    }

    //ANIMATION
    public update(delta: number) {
        this.x += this.speed * delta;
        this.y += Math.cos(this.x * 0.01) * 1;

        this.keepInScreen();
    }

    //KEEP IN SCREEN
    private keepInScreen() {
        if (this.getBounds().left > this.game.pixi.screen.right) {
            this.x = -this.getBounds().width;
        }
    }
}