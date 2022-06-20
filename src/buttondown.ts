import * as PIXI from "pixi.js";
import { Game } from "./game";

import bgSound from "./sound/dino.mp3";

export class Down extends PIXI.Sprite {

    private game: Game;
    public loader: PIXI.Loader;
    public bgSound: HTMLAudioElement

    //CONSTRUCTOR
    constructor(texture: PIXI.Texture, game: Game) {

        super(texture);
        this.game = game;

        //SCALE
        this.x = 1400
        this.y = 0
        this.scale.set(0.35, 0.35);

        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())

        //LOADER FOR SOUND
        this.loader = new PIXI.Loader();
        this.loader
            .add("bgSound", bgSound)
        this.loader.load(() => this.soundLoad());
    }

    soundLoad() {
        this.bgSound = this.loader.resources["bgSound"].data!
        this.bgSound.volume = 0.85
    }

    onClick() {
        console.log("Boven")
        this.game.shark.y += 10
    }
}