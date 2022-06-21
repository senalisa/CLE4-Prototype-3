//IMPORT
import * as PIXI from "pixi.js";

//IMAGES
import enemyImage from "./images/enemycloud.png";
import skyImage from "./images/sky3.png";
import heroImage from "./images/superhero.png";
import gameOverImage from "./images/gameoverimage.png";
import endScreen from "./images/endscreen.png"
import buttonUp from "./images/buttonup.png"
import buttonDown from "./images/buttondown.png"

//LETTERS
import letterAImage from "./images/letterA.png"
import letterBImage from "./images/letterB.png"
import letterCImage from "./images/letterC.png"
import letterDImage from "./images/letterD.png"
import letterEImage from "./images/letterE.png"
import letterFImage from "./images/letterF.png"
import letterGImage from "./images/letterG.png"
import letterHImage from "./images/letterH.png"

//SOUND
import damageSound from "url:./sound/hitHurt.wav";
import collectSound from "url:./sound/pickupCoin.wav";
import endSound from "url:./sound/goedzo.mp3";
import ASound from "url:./sound/A.mp3";
import BSound from "url:./sound/B.mp3";
import CSound from "url:./sound/C.mp3";
import DSound from "url:./sound/D.mp3";
import ESound from "url:./sound/E.mp3";
import FSound from "url:./sound/F.mp3";
import GSound from "url:./sound/G.mp3";
import HSound from "url:./sound/H.mp3";

//MC
import { Enemy } from "./fish";
import { Hero } from "./shark";
import { HeroTwo } from "./sharktwo";

//LETTERS from TS files
import { LetterA } from "./letterA";
import { LetterB } from "./letterB";
import { LetterC } from "./letterC";
import { LetterD } from "./letterD";
import { LetterE } from "./letterE";
import { LetterF } from "./letterF";
import { LetterG } from "./letterG";
import { LetterH } from "./letterH";

//BACKGROUND
import { Background } from "./background";

//BUTTONS
import { Up } from "./buttonup"
import { Down } from "./buttondown"

//GAME CLASS
export class Game {

  //GLOBALS
  public pixi: PIXI.Application;
  public fishes: Enemy[] = [];
  public loader: PIXI.Loader;
  public shark: Hero;
  public sharkTwo: HeroTwo;

  public letterA: LetterA;
  public letterB: LetterB;
  public letterC: LetterC;
  public letterD: LetterD;
  public letterE: LetterE;
  public letterF: LetterF;
  public letterG: LetterG;
  public letterH: LetterH;

  public background: Background;

  public score: number;
  public scoreBoard: PIXI.Text;
  public bgRect: PIXI.Graphics
  public barBackground: PIXI.Graphics
  public bar: PIXI.Graphics
  public damageSound: HTMLAudioElement
  public collectSound: HTMLAudioElement
  public endSound: HTMLAudioElement
  public up: Up;
  public down: Down;

  public ASound: HTMLAudioElement
  public BSound: HTMLAudioElement
  public CSound: HTMLAudioElement
  public DSound: HTMLAudioElement
  public ESound: HTMLAudioElement
  public FSound: HTMLAudioElement
  public GSound: HTMLAudioElement
  public HSound: HTMLAudioElement

  public endButton: PIXI.Sprite
  public gameOverButton: PIXI.Sprite


  //CONSTRUCTOR
  constructor() {

    //PIXI CANVAS 
    this.pixi = new PIXI.Application({
      width: 2000,
      height: 1000,
      forceCanvas: true
    });
    document.body.appendChild(this.pixi.view);

    //LOADER
    this.loader = new PIXI.Loader();
    this.loader
      .add("enemyTexture", enemyImage)
      .add("skyTexture", skyImage)
      .add("playerTexture", heroImage)
      .add("letterATexture", letterAImage)
      .add("letterBTexture", letterBImage)
      .add("letterCTexture", letterCImage)
      .add("letterDTexture", letterDImage)
      .add("letterETexture", letterEImage)
      .add("letterFTexture", letterFImage)
      .add("letterGTexture", letterGImage)
      .add("letterHTexture", letterHImage)
      .add("gameOverImageTexture", gameOverImage)
      .add("endScreenTexture", endScreen)
      .add("buttonUpTexture", buttonUp)
      .add("buttonDownTexture", buttonDown)
      .add("damageSound", damageSound)
      .add("collectSound", collectSound)
      .add("endSound", endSound)
      .add("ASound", ASound)
      .add("BSound", BSound)
      .add("CSound", CSound)
      .add("DSound", DSound)
      .add("ESound", ESound)
      .add("FSound", FSound)
      .add("GSound", GSound)
      .add("HSound", HSound)
    this.loader.load(() => this.loadCompleted());

    //SCORE
    //GIVE THE SCORE A VALUE
    this.score = 100;
  }

  //LOAD COMPLETED
  loadCompleted() {

    //BACKGROUND
    this.background = new Background(this.loader.resources["skyTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
    this.pixi.stage.addChild(this.background)

    //SOUNDS
    //DAMAGE SOUND
    this.damageSound = this.loader.resources["damageSound"].data!;

    //COLLECT SOUND
    this.collectSound = this.loader.resources["collectSound"].data!;
    this.collectSound.volume = 0.5;

    //END SOUND
    this.endSound = this.loader.resources["endSound"].data!;

    //LETTERS SOUND
    this.ASound = this.loader.resources["ASound"].data!;
    this.ASound.volume = 1

    this.BSound = this.loader.resources["BSound"].data!;
    this.BSound.volume = 1

    this.CSound = this.loader.resources["CSound"].data!;
    this.CSound.volume = 1

    this.DSound = this.loader.resources["DSound"].data!;
    this.DSound.volume = 1

    this.ESound = this.loader.resources["ESound"].data!;
    this.ESound.volume = 1

    this.FSound = this.loader.resources["FSound"].data!;
    this.FSound.volume = 1

    this.GSound = this.loader.resources["GSound"].data!;
    this.GSound.volume = 1

    this.HSound = this.loader.resources["HSound"].data!;
    this.HSound.volume = 1

    //ENEMIES
    for (let i = 0; i < 4; i++) {
      let fish = new Enemy(this.loader.resources["enemyTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    //PLAYER HERO
    this.shark = new Hero(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.shark);

    //PLAYER HERO TWO
    // this.sharkTwo = new HeroTwo(this.loader.resources["playerTexture"].texture!, this);
    // this.pixi.stage.addChild(this.sharkTwo);

    //LETTER A
    this.letterA = new LetterA(this.loader.resources["letterATexture"].texture!, this);
    this.pixi.stage.addChild(this.letterA);

    //LETTER B
    this.letterB = new LetterB(this.loader.resources["letterBTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterB);

    //LETTER C
    this.letterC = new LetterC(this.loader.resources["letterCTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterC);

    //LETTER D
    this.letterD = new LetterD(this.loader.resources["letterDTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterD);

    //LETTER E
    this.letterE = new LetterE(this.loader.resources["letterETexture"].texture!, this);
    this.pixi.stage.addChild(this.letterE);

    //LETTER F
    this.letterF = new LetterF(this.loader.resources["letterFTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterF);

    //LETTER G
    this.letterG = new LetterG(this.loader.resources["letterGTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterG);

    //LETTER H
    this.letterH = new LetterH(this.loader.resources["letterHTexture"].texture!, this);
    this.pixi.stage.addChild(this.letterH);

    //BACKGROUND RECTANGLE
    this.bgRect = new PIXI.Graphics
    this.bgRect.beginFill(0x47245A);
    this.bgRect.drawRect(0, 0, window.innerWidth, 100)
    this.bgRect.endFill();
    this.pixi.stage.addChild(this.bgRect)

    //SCORE BOARD 2
    //BAR BACKGROUND
    this.barBackground = new PIXI.Graphics;
    this.barBackground.beginFill(0x3F1608);
    this.barBackground.pivot.set(0.5, 0)
    this.barBackground.drawRect(800, 25, 200, 50);
    this.barBackground.endFill();
    this.pixi.stage.addChild(this.barBackground)

    const style = new PIXI.TextStyle({
      fontWeight: 'bold',
      fill: ['#ffffff']
    })

    //SCORE BOARD 1
    this.scoreBoard = new PIXI.Text(`${this.score}`, style);
    this.scoreBoard.anchor.set(0.5, 0);
    this.scoreBoard.x = 760
    this.scoreBoard.y = 35
    this.pixi.stage.addChild(this.scoreBoard);

    ///BAR
    this.bar = new PIXI.Graphics;
    this.bar.beginFill(0x118444);
    this.bar.pivot.set(0.5, 0)
    this.bar.drawRect(800, 25, 200, 50);
    this.bar.endFill();
    this.pixi.stage.addChild(this.bar);

    // //BUTTON UP
    // this.up = new Up(this.loader.resources["buttonUpTexture"].texture!, this)
    // this.pixi.stage.addChild(this.up)

    // //BUTTON DOWN
    // this.down = new Down(this.loader.resources["buttonDownTexture"].texture!, this)
    // this.pixi.stage.addChild(this.down)

    //ANIMATION 
    this.pixi.ticker.add((delta: number) => this.update(delta));
  }

  //UPDATE DELTA
  update(delta: number) {

    //UPDATE ANIMATIONS
    this.background.update();
    this.shark.update();
    // this.sharkTwo.update();
    this.letterA.update(delta);
    this.letterB.update(delta);
    this.letterC.update(delta);
    this.letterD.update(delta);
    this.letterE.update(delta);
    this.letterF.update(delta);
    this.letterG.update(delta);
    this.letterH.update(delta);

    //ENEMY/PLAYER COLLISION DETECTION
    for (const fish of this.fishes) {
      //COLLISION HERO1
      fish.update(delta);
      if (this.collision(this.shark, fish)) {
        //Add score
        this.score -= 1;
        this.scoreBoard.text = `${this.score}`;

        //play Sound
        this.damageSound.play();

        //Tint
        fish.tint = 0x630000;

        setTimeout(function () {
          fish.tint = 0xD7D4D2;
        }, 1000);

      }

      //COLLISION HERO2 -MULTIPLAYER-
      // if (this.collision(this.sharkTwo, fish)) {
      //   //Add score
      //   this.score -= 1;
      //   this.scoreBoard.text = `${this.score}`;

      //   //play Sound
      //   this.damageSound.play();

      //   //Tint
      //   fish.tint = 0x630000;

      //   setTimeout(function () {
      //     fish.tint = 0xD7D4D2;
      //   }, 1000);

      // }
    }

    //COLLISION WITH LETTER A
    if (this.collision(this.shark, this.letterA)) {

      this.letterA.width = 57;
      this.letterA.height = 57;
      this.letterA.position.set(60, 32.5);
      this.letterA.speed = 0
      this.pixi.stage.removeChild(this.letterA);

      let letterAShow = new LetterA(this.loader.resources["letterATexture"].texture!, this);
      letterAShow.width = 57;
      letterAShow.height = 57;
      letterAShow.position.set(60, 22.5);
      this.pixi.stage.addChild(letterAShow);

      //PLAY SOUND
      this.collectSound.play();
      this.ASound.play();

    }

    //HERO TWO LETTER A COLLISON
    // if (this.collision(this.sharkTwo, this.letterA)) {

    //   this.letterA.width = 57;
    //   this.letterA.height = 57;
    //   this.letterA.position.set(60, 32.5);
    //   this.letterA.speed = 0
    //   this.pixi.stage.removeChild(this.letterA);

    //   let letterAShow = new LetterA(this.loader.resources["letterATexture"].texture!, this);
    //   letterAShow.width = 57;
    //   letterAShow.height = 57;
    //   letterAShow.position.set(60, 22.5);
    //   this.pixi.stage.addChild(letterAShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.ASound.play();

    // }

    //COLLISION WITH LETTER B
    if (this.collision(this.shark, this.letterB)) {

      this.letterB.width = 57;
      this.letterB.height = 57;
      this.letterB.position.set(60, 32.5);
      this.letterB.speed = 0
      this.pixi.stage.removeChild(this.letterB);

      let letterBShow = new LetterB(this.loader.resources["letterBTexture"].texture!, this);
      letterBShow.width = 57;
      letterBShow.height = 57;
      letterBShow.position.set(120, 22.5);
      this.pixi.stage.addChild(letterBShow);

      //PLAY SOUND
      this.collectSound.play();
      this.BSound.play();

    }

    //HERO TWO COLLISION WITH LETTER B 
    // if (this.collision(this.sharkTwo, this.letterB)) {

    //   this.letterB.width = 57;
    //   this.letterB.height = 57;
    //   this.letterB.position.set(60, 32.5);
    //   this.letterB.speed = 0
    //   this.pixi.stage.removeChild(this.letterB);

    //   let letterBShow = new LetterB(this.loader.resources["letterBTexture"].texture!, this);
    //   letterBShow.width = 57;
    //   letterBShow.height = 57;
    //   letterBShow.position.set(120, 22.5);
    //   this.pixi.stage.addChild(letterBShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.BSound.play();

    // }

    //COLLISION WITH LETTER C
    if (this.collision(this.shark, this.letterC)) {

      this.letterC.width = 57;
      this.letterC.height = 57;
      this.letterC.position.set(60, 32.5);
      this.letterC.speed = 0
      this.pixi.stage.removeChild(this.letterC);

      let letterCShow = new LetterC(this.loader.resources["letterCTexture"].texture!, this);
      letterCShow.width = 57;
      letterCShow.height = 57;
      letterCShow.position.set(180, 22.5);
      this.pixi.stage.addChild(letterCShow);

      //PLAY SOUND
      this.collectSound.play();
      this.CSound.play();

    }

    //HERO TWO COLLISION WITH LETTER C
    // if (this.collision(this.sharkTwo, this.letterC)) {

    //   this.letterC.width = 57;
    //   this.letterC.height = 57;
    //   this.letterC.position.set(60, 32.5);
    //   this.letterC.speed = 0
    //   this.pixi.stage.removeChild(this.letterC);

    //   let letterCShow = new LetterC(this.loader.resources["letterCTexture"].texture!, this);
    //   letterCShow.width = 57;
    //   letterCShow.height = 57;
    //   letterCShow.position.set(180, 22.5);
    //   this.pixi.stage.addChild(letterCShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.CSound.play();

    // }

    //COLLISION WITH LETTER D
    if (this.collision(this.shark, this.letterD)) {

      this.letterD.width = 57;
      this.letterD.height = 57;
      this.letterD.position.set(60, 32.5);
      this.letterD.speed = 0
      this.pixi.stage.removeChild(this.letterD);

      let letterDShow = new LetterD(this.loader.resources["letterDTexture"].texture!, this);
      letterDShow.width = 57;
      letterDShow.height = 57;
      letterDShow.position.set(240, 22.5);
      this.pixi.stage.addChild(letterDShow);

      //PLAY SOUND
      this.collectSound.play();
      this.DSound.play();

    }

    //HERO TWO COLLISION WITH LETTER D
    // if (this.collision(this.sharkTwo, this.letterD)) {

    //   this.letterD.width = 57;
    //   this.letterD.height = 57;
    //   this.letterD.position.set(60, 32.5);
    //   this.letterD.speed = 0
    //   this.pixi.stage.removeChild(this.letterD);

    //   let letterDShow = new LetterD(this.loader.resources["letterDTexture"].texture!, this);
    //   letterDShow.width = 57;
    //   letterDShow.height = 57;
    //   letterDShow.position.set(240, 22.5);
    //   this.pixi.stage.addChild(letterDShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.DSound.play();

    // }

    //COLLISION WITH LETTER E
    if (this.collision(this.shark, this.letterE)) {

      this.letterE.width = 57;
      this.letterE.height = 57;
      this.letterE.position.set(60, 32.5);
      this.letterE.speed = 0
      this.pixi.stage.removeChild(this.letterE);

      let letterEShow = new LetterE(this.loader.resources["letterETexture"].texture!, this);
      letterEShow.width = 57;
      letterEShow.height = 57;
      letterEShow.position.set(300, 22.5);
      this.pixi.stage.addChild(letterEShow);

      //PLAY SOUND
      this.collectSound.play();
      this.ESound.play();

    }

    //HERO TWO COLLISION WITH LETTER E
    // if (this.collision(this.sharkTwo, this.letterE)) {

    //   this.letterE.width = 57;
    //   this.letterE.height = 57;
    //   this.letterE.position.set(60, 32.5);
    //   this.letterE.speed = 0
    //   this.pixi.stage.removeChild(this.letterE);

    //   let letterEShow = new LetterE(this.loader.resources["letterETexture"].texture!, this);
    //   letterEShow.width = 57;
    //   letterEShow.height = 57;
    //   letterEShow.position.set(300, 22.5);
    //   this.pixi.stage.addChild(letterEShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.ESound.play();

    // }

    //COLLISION WITH LETTER F
    if (this.collision(this.shark, this.letterF)) {

      this.letterF.width = 57;
      this.letterF.height = 57;
      this.letterF.position.set(60, 32.5);
      this.letterF.speed = 0
      this.pixi.stage.removeChild(this.letterF);

      let letterFShow = new LetterF(this.loader.resources["letterFTexture"].texture!, this);
      letterFShow.width = 57;
      letterFShow.height = 57;
      letterFShow.position.set(360, 22.5);
      this.pixi.stage.addChild(letterFShow);

      //PLAY SOUND
      this.collectSound.play();
      this.FSound.play();

    }

    //HERO TWO COLLISION WITH LETTER F
    // if (this.collision(this.sharkTwo, this.letterF)) {

    //   this.letterF.width = 57;
    //   this.letterF.height = 57;
    //   this.letterF.position.set(60, 32.5);
    //   this.letterF.speed = 0
    //   this.pixi.stage.removeChild(this.letterF);

    //   let letterFShow = new LetterF(this.loader.resources["letterFTexture"].texture!, this);
    //   letterFShow.width = 57;
    //   letterFShow.height = 57;
    //   letterFShow.position.set(360, 22.5);
    //   this.pixi.stage.addChild(letterFShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.FSound.play();

    // }


    //COLLISION WITH LETTER G
    if (this.collision(this.shark, this.letterG)) {

      this.letterG.width = 57;
      this.letterG.height = 57;
      this.letterG.position.set(60, 32.5);
      this.letterG.speed = 0
      this.pixi.stage.removeChild(this.letterG);

      let letterGShow = new LetterG(this.loader.resources["letterGTexture"].texture!, this);
      letterGShow.width = 57;
      letterGShow.height = 57;
      letterGShow.position.set(420, 22.5);
      this.pixi.stage.addChild(letterGShow);

      //PLAY SOUND
      this.collectSound.play();
      this.GSound.play();

    }

    //HERO TWO COLLISION WITH LETTER G
    // if (this.collision(this.sharkTwo, this.letterG)) {

    //   this.letterG.width = 57;
    //   this.letterG.height = 57;
    //   this.letterG.position.set(60, 32.5);
    //   this.letterG.speed = 0
    //   this.pixi.stage.removeChild(this.letterG);

    //   let letterGShow = new LetterG(this.loader.resources["letterGTexture"].texture!, this);
    //   letterGShow.width = 57;
    //   letterGShow.height = 57;
    //   letterGShow.position.set(420, 22.5);
    //   this.pixi.stage.addChild(letterGShow);

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.GSound.play();

    // }

    //COLLISION WITH LETTER H
    if (this.collision(this.shark, this.letterH)) {

      this.letterH.width = 57;
      this.letterH.height = 57;
      this.letterH.position.set(60, 32.5);
      this.letterH.speed = 0
      this.pixi.stage.removeChild(this.letterH);

      let letterHShow = new LetterH(this.loader.resources["letterHTexture"].texture!, this);
      letterHShow.width = 57;
      letterHShow.height = 57;
      letterHShow.position.set(480, 22.5);
      this.pixi.stage.addChild(letterHShow);

      //FUNCTION ALL LETTERS PICKED
      this.lettersPicked();

      //PLAY SOUND
      this.collectSound.play();
      this.HSound.play();

    }

    //HERO TWO COLLISION WITH LETTER H
    // if (this.collision(this.sharkTwo, this.letterH)) {

    //   this.letterH.width = 57;
    //   this.letterH.height = 57;
    //   this.letterH.position.set(60, 32.5);
    //   this.letterH.speed = 0
    //   this.pixi.stage.removeChild(this.letterH);

    //   let letterHShow = new LetterH(this.loader.resources["letterHTexture"].texture!, this);
    //   letterHShow.width = 57;
    //   letterHShow.height = 57;
    //   letterHShow.position.set(480, 22.5);
    //   this.pixi.stage.addChild(letterHShow);

    //   //FUNCTION ALL LETTERS PICKED
    //   this.lettersPicked();

    //   //PLAY SOUND
    //   this.collectSound.play();
    //   this.HSound.play();

    // }

    //IF SCORE + HEALTHBAR
    //90
    if (this.score === 90) {
      this.bar.width = 180
      this.bar.x = 78
    }

    //80
    if (this.score === 80) {
      this.bar.width = 160
      this.bar.x = 158
    }

    //70
    if (this.score === 70) {
      this.bar.width = 140
      this.bar.x = 238
    }

    //60
    if (this.score === 60) {
      this.bar.width = 120;
      this.bar.x = 318
    }

    //50
    if (this.score === 50) {
      this.bar.width = 100;
      this.bar.x = 398
    }

    //40
    if (this.score === 40) {
      this.bar.width = 80;
      this.bar.x = 478
    }

    //30
    if (this.score === 30) {
      this.bar.width = 60;
      this.bar.x = 558
    }

    //20
    if (this.score === 20) {
      this.bar.width = 40;
      this.bar.x = 638
    }

    //10
    if (this.score === 10) {
      this.bar.width = 20;
      this.bar.x = 718
    }

    if (this.score === 0) {
      this.bar.width = 0
      this.gameOver();
    }
  }

  //START 
  //COLLISION ENEMY AND PLAYER
  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  //ALL LETTERS PICKED
  private lettersPicked() {
    console.log("Alle letters zijn verzameld")
    this.pixi.stop()
    this.endButton = new PIXI.Sprite(this.loader.resources["endScreenTexture"].texture!)
    this.endButton.width = 750
    this.endButton.height = 500
    this.endButton.x = 500
    this.endButton.y = 300

    this.endSound.play();

    this.pixi.stage.addChild(this.endButton)
  }


  //SCORE = 0 
  //GAME OVER
  private gameOver() {
    console.log("game over")
    this.pixi.stop()
    this.gameOverButton = new PIXI.Sprite(this.loader.resources["gameOverImageTexture"].texture!);
    this.gameOverButton.width = 750
    this.gameOverButton.height = 500
    this.gameOverButton.x = 500
    this.gameOverButton.y = 300
    this.gameOverButton.interactive = true
    this.gameOverButton.buttonMode = true
    this.gameOverButton.on('pointerdown', () => this.resetGame())

    this.pixi.stage.addChild(this.gameOverButton)
  }

  //RESET GAME
  resetGame() {
    // verwijder de game over button
    this.gameOverButton.destroy()
    this.score = 100;
    this.pixi.start()

    this.shark.x = 1300
    this.shark.y = 400
  }

}

