import * as PIXI from "pixi.js";
import { Game } from "./game";

//Import SOUND
import bgSound from "url:./sound/dino.mp3";

export class HeroTwo extends PIXI.Sprite {

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
        this.y = 300
        this.scale.set(1, 1);

        this.tint = 0xFF54C8

        //GAME CONTROLS
        //KEYDOWN AND UP EVENT LISTENER
        window.addEventListener("keypress", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

        //MOUSE CURSOR TRACKER
        // window.addEventListener("mousemove", (e: MouseEvent) => this.mouseMoveHandler(e));

        //TOUCH
        // window.addEventListener("touchstart", (e: TouchEvent) => this.touchHandler(e));
        // window.addEventListener("touchmove", (e: TouchEvent) => this.touchHandler(e));

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

    // KEYBOARD
    onKeyDown(e: KeyboardEvent): any {
        console.log(e.key);

        if (e.key === "w") {
            this.speed = -5;
        }
        if (e.key === "s") {
            this.speed = 5;
        }
    }
    onKeyUp(e: KeyboardEvent): any {
        if (e.key === "w" || e.key === "s") {
            this.speed = 0;
            //play background sound
            this.bgSound.play()
        }
    }

    //MOUSE CURSOR
    // mouseMoveHandler(e: MouseEvent) {
    //   var relativeY = e.clientY - this.game.pixi.screen.top

    //   if (relativeY > 0 && relativeY < this.game.pixi.screen.height) {
    //     this.y = relativeY - this.height / 2
    //     this.bgSound.play()
    //   }
    // }

    //TOUCH
    //   touchHandler(e: TouchEvent) {
    //     if (e.touches) {
    //       this.y = e.touches[0].pageY - this.game.pixi.screen.top - this.height / 2;
    //       e.preventDefault
    //     }
    //   }

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
