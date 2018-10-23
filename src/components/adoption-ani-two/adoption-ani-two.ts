import { Component, ViewChild, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';

import * as PIXI from 'pixi.js';
import 'pixi-spine';
import 'pixi-heaven';
// import * as TWEEN from '@tweenjs/tween.js';
import * as CHARM from 'pixijs-charm';


function easeInOutQuint(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t*t*t + 2) + b;
}

function hitTest(s1, s2, len){
	
  if (Math.sqrt(Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2)) < len * 1.2) {
    return true;
  } else {
    return false;
  }

}

@Component({
  selector: 'adoption-ani-two',
  templateUrl: 'adoption-ani-two.html'
})

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdoptionAniTwoComponent {

  @ViewChild("pixi")
  public pixiContainer: ElementRef;
  private pixi:PIXI.Application;
  screenHeight: number;
  screenWidth: number;
  personRadius: number;
  godRadius: number;
  lineWidth: number;
  countGod: number;
  countPerson: number;
  personStartX: number;
  personStartY: number;
  personFinishX: number;
  personFinishY: number;
  godStartX: number;
  godStartY: number;
  godLittleStartX: number;
  godLittleStartY: number;
  godFinishX: number;
  godFinishY: number;
  trinityAngle: number;
  
  spritePerson: any;
  spriteParent1: any;
  spriteParent2: any;
  spriteGrandParent1: any;
  spriteGrandParent2: any;
  spriteGrandParent3: any;
  spriteGrandParent4: any;
  spriteXXX: any;
  spriteMed: any;
  spriteMon: any;
  ropeGod: any;
  pointsGod: any;
  pointsGodFather: any;
  pointsGodSon: any;
  pointsGodHolySpirit: any;
  ropePerson: any;
  pointsPerson: any;
  ropeGodFather: any;
  ropeGodSon: any;
  ropeGodHolySpirit: any;

  charmShow1: any;
  charmShow2: any;
  charmShow3: any;
  charmHide1: any;
  charmHide2: any;
  charmHide3: any;

  animExec = function(delta){};
  animExec2 = function(detla){};
  timer: number;
  timer2: number;
  timerSecond: number;

  hideAnim: boolean;
  finishAll: boolean;
  section: number;

  parentsContainer: any;
  grandparentsContainer: any;

  stopOrphanBool: boolean;
  stopOrphanChasingBool: boolean;
  stopSeparation: any;
  spritePopup: any;
  spriteSeparation: any;

  constructor(platform: Platform) {
    
    // Set up the sizes
    this.screenWidth = platform.width() - 20;
    this.screenHeight = (this.screenWidth / 2.4) - 20;
    this.hideAnim = false;
    this.finishAll = false;

    this.initAnim();

  }

  initAnim(){

    // Define variable values
    this.lineWidth = 4;
    this.countGod = 0;
    this.countPerson = 0;
    this.personRadius = this.screenWidth / 14;
    this.godRadius = this.screenWidth / 7;

    this.timer = 0;
    this.timerSecond = 0;

    this.trinityAngle = 0;
    
    // Create the PIXI application
    this.pixi = new PIXI.Application(this.screenWidth, this.screenHeight, {
        antialias: true, 
        transparent: false, 
        resolution: 1,
        backgroundColor: 0xffffff,
      });

  }

  createAnim(){
    // Setup the PIXI Application
    this.pixi.view.style.width = this.screenWidth.toString();
    this.pixi.view.style.height = this.screenHeight.toString();
    this.pixiContainer.nativeElement.appendChild(this.pixi.view);

    // Need to setup the animation elements

    // ---------------------------------------------------------   Setup the Person   ---------------------------------------------------------

    let graphicPerson = new PIXI.Graphics();

    // Draw Person
    graphicPerson.lineStyle(this.lineWidth, 0x9e9e9e);
    graphicPerson.drawCircle(0, 0, this.personRadius);
    graphicPerson.endFill();

    // Create Sprite
    this.spritePerson = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteParent1 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteParent2 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteGrandParent1 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteGrandParent2 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteGrandParent3 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());
    this.spriteGrandParent4 = new PIXI.Sprite(graphicPerson.generateCanvasTexture());

    this.parentsContainer = new PIXI.Container();
    this.grandparentsContainer = new PIXI.Container();

    this.spriteXXX = PIXI.Sprite.fromImage('./assets/imgs/xxx.png');
    this.spriteXXX.height = this.spritePerson.height;
    this.spriteXXX.width = this.spritePerson.width;
    this.spriteXXX.alpha = 0;

    this.spriteMed = PIXI.Sprite.fromImage('./assets/imgs/medal.png');
    this.spriteMed.height = this.spritePerson.height;
    this.spriteMed.width = this.spritePerson.width;
    this.spriteMed.alpha = 0;

    this.spriteMon = PIXI.Sprite.fromImage('./assets/imgs/dollars.png');
    this.spriteMon.height = this.spritePerson.height;
    this.spriteMon.width = this.spritePerson.width;
    this.spriteMon.alpha = 0;
    
    // Position and color
    this.personStartX = 0.15 * this.screenWidth;
    this.personStartY = 0.5 * (this.screenHeight - this.spritePerson.height) + 0.2 * this.screenHeight;

    this.spritePerson.x = this.personStartX;
    this.spritePerson.y = this.personStartY;
    this.spritePerson.alpha = 0;

    this.spriteParent1.height = this.spritePerson.height / 2;
    this.spriteParent1.width = this.spritePerson.width / 2;
    this.spriteParent1.x = (0.15 * this.screenWidth + this.spritePerson.width / 2) - 2 * this.spriteParent1.width;
    this.spriteParent1.y = 0.5 * (this.screenHeight - this.spritePerson.height) + 0.0 * this.screenHeight;

    this.spriteParent2.height = this.spritePerson.height / 2;
    this.spriteParent2.width = this.spritePerson.width / 2;
    this.spriteParent2.x = (0.15 * this.screenWidth + this.spritePerson.width / 2) + this.spriteParent2.width;
    this.spriteParent2.y = 0.5 * (this.screenHeight - this.spritePerson.height) + 0.0 * this.screenHeight;

    this.spriteGrandParent1.height = this.spritePerson.height / 3;
    this.spriteGrandParent1.width = this.spritePerson.width / 3;
    this.spriteGrandParent1.x = ((0.15 * this.screenWidth + this.spritePerson.width / 2) - 1.5 * this.spriteParent1.width) - 1.5 * this.spriteGrandParent1.width;
    this.spriteGrandParent1.y = 0.5 * (this.screenHeight - this.spritePerson.height) - 0.2 * this.screenHeight;

    this.spriteGrandParent2.height = this.spritePerson.height / 3;
    this.spriteGrandParent2.width = this.spritePerson.width / 3;
    this.spriteGrandParent2.x = ((0.15 * this.screenWidth + this.spritePerson.width / 2) - 1.5 * this.spriteParent1.width) + 0.5 * this.spriteGrandParent2.width;
    this.spriteGrandParent2.y = 0.5 * (this.screenHeight - this.spritePerson.height) - 0.2 * this.screenHeight;

    this.spriteGrandParent3.height = this.spritePerson.height / 3;
    this.spriteGrandParent3.width = this.spritePerson.width / 3;
    this.spriteGrandParent3.x = ((0.15 * this.screenWidth + this.spritePerson.width / 2) + this.spriteParent2.width) - 1 * this.spriteGrandParent3.width;
    this.spriteGrandParent3.y = 0.5 * (this.screenHeight - this.spritePerson.height) - 0.2 * this.screenHeight;

    this.spriteGrandParent4.height = this.spritePerson.height / 3;
    this.spriteGrandParent4.width = this.spritePerson.width / 3;
    this.spriteGrandParent4.x = ((0.15 * this.screenWidth + this.spritePerson.width / 2) + this.spriteParent2.width) + 1.5 * this.spriteGrandParent4.width;
    this.spriteGrandParent4.y = 0.5 * (this.screenHeight - this.spritePerson.height) - 0.2 * this.screenHeight;

    this.parentsContainer.addChild(this.spriteParent1);
    this.parentsContainer.addChild(this.spriteParent2);
    this.grandparentsContainer.addChild(this.spriteGrandParent1);
    this.grandparentsContainer.addChild(this.spriteGrandParent2);
    this.grandparentsContainer.addChild(this.spriteGrandParent3);
    this.grandparentsContainer.addChild(this.spriteGrandParent4);

    this.parentsContainer.alpha = 0.0;
    this.grandparentsContainer.alpha = 0.0;

    let graphicSep = new PIXI.Graphics();
    graphicSep.lineStyle(this.lineWidth / 2, 0x000000);
    graphicSep.moveTo(0.5 * this.screenWidth, 0);
    graphicSep.lineTo(0.47 * this.screenWidth, 0.25 * this.screenHeight);
    graphicSep.lineTo(0.5 * this.screenWidth, 0.23 * this.screenHeight);
    graphicSep.lineTo(0.47 * this.screenWidth, 0.5 * this.screenHeight);
    graphicSep.lineTo(0.5 * this.screenWidth, 0.48 * this.screenHeight);
    graphicSep.lineTo(0.47 * this.screenWidth, 0.75 * this.screenHeight);
    graphicSep.lineTo(0.5 * this.screenWidth, 0.73 * this.screenHeight);
    graphicSep.lineTo(0.47 * this.screenWidth, 1 * this.screenHeight);
    graphicSep.endFill()

    this.spriteSeparation = new PIXI.Sprite(graphicSep.generateCanvasTexture());
    this.spriteSeparation.x = 0.45 * this.screenWidth;
    this.spriteSeparation.alpha = 0;


    // ---------------------------------------------------------   Setup God   ---------------------------------------------------------
    let graphicGod = new PIXI.Graphics();

    // Draw God
    graphicGod.lineStyle(2 * this.lineWidth, 0x9E9E9E);
    graphicGod.drawCircle(this.godRadius + 0.5 * this.lineWidth, this.godRadius + 0.5 * this.lineWidth, this.godRadius);
    graphicGod.endFill();

    // Generate Rope God + Trinity
    this.ropeGod = new PIXI.heaven.mesh.Rope(graphicGod.generateCanvasTexture(), 100, 2, 0);
    this.ropeGod.enableColors();
    this.pointsGod = this.ropeGod.points;

    // Generate Trinity
    this.ropeGodFather = new PIXI.heaven.mesh.Rope(graphicGod.generateCanvasTexture(), 100, 2, 0);
    this.ropeGodFather.enableColors();
    this.pointsGodFather = this.ropeGodFather.points;

    this.ropeGodSon = new PIXI.heaven.mesh.Rope(graphicGod.generateCanvasTexture(), 100, 2, 0);
    this.ropeGodSon.enableColors();
    this.pointsGodSon = this.ropeGodSon.points;

    this.ropeGodHolySpirit = new PIXI.heaven.mesh.Rope(graphicGod.generateCanvasTexture(), 100, 2, 0);
    this.ropeGodHolySpirit.enableColors();
    this.pointsGodHolySpirit = this.ropeGodHolySpirit.points;

    // Position and Color
    this.ropeGod.width = 2 * this.godRadius;
    this.ropeGod.height = 2 * this.godRadius;

    this.godStartX = 0.85 * this.screenWidth - this.ropeGod.width;
    this.godStartY = 0.4 * this.screenHeight;
    
    this.godFinishX = 0.85 * this.screenWidth - this.ropeGod.width;
    this.godFinishY = 0.6 * this.screenHeight;

    this.ropeGod.x = this.godStartX;
    this.ropeGod.y = this.godStartY;
    this.ropeGod.alpha = 0;

    // ---------------------------------------------------------   Setup Rope Person   ---------------------------------------------------------
    this.ropePerson = new PIXI.heaven.mesh.Rope(graphicGod.generateCanvasTexture(), 100, 2, 0);
    this.pointsPerson = this.ropePerson.points;
    this.ropePerson.enableColors();

    // Size, location, color, etc.
    this.ropePerson.width = this.spritePerson.width;
    this.ropePerson.height = this.spritePerson.height;

    this.ropePerson.x = 0.15 * this.screenWidth;
    this.ropePerson.y = 0.5 * (this.screenHeight) + 0.2 * this.screenHeight;

    this.personFinishX = this.godFinishX + 0.5 * (this.ropeGod.width - this.ropePerson.width);
    this.personFinishY = this.godFinishY;

    this.ropePerson.alpha = 0;

    // Trinity Setup
    this.trinityReset();

    // Create Charm Objects
    this.charmShow1 = new CHARM.Charm(PIXI);
    this.charmShow2 = new CHARM.Charm(PIXI);
    this.charmShow3 = new CHARM.Charm(PIXI);
    this.charmHide1 = new CHARM.Charm(PIXI);
    this.charmHide2 = new CHARM.Charm(PIXI);
    this.charmHide3 = new CHARM.Charm(PIXI);

    // Add elements into the stage
    this.pixi.stage.addChild(this.spritePerson);
    this.pixi.stage.addChild(this.parentsContainer);
    this.pixi.stage.addChild(this.grandparentsContainer);
    this.pixi.stage.addChild(this.ropeGod);
    this.pixi.stage.addChild(this.ropeGodFather);
    this.pixi.stage.addChild(this.ropeGodSon);
    this.pixi.stage.addChild(this.ropeGodHolySpirit);
    this.pixi.stage.addChild(this.ropePerson);
    this.pixi.stage.addChild(this.spriteXXX);
    this.pixi.stage.addChild(this.spriteMed);
    this.pixi.stage.addChild(this.spriteMon);
    this.pixi.stage.addChild(this.spriteSeparation);


    // Add animation functions
    this.pixi.ticker.add(delta => this.colorCircles(delta));
    this.pixi.ticker.add(delta => this.animLoop(delta));
    this.recalcTrinity();

  }

  private trinityReset() {

    this.ropeGodFather.width = 2 * this.godRadius / 3;
    this.ropeGodFather.height = 2 * this.godRadius / 3;
    this.ropeGodSon.width = 2 * this.godRadius / 3;
    this.ropeGodSon.height = 2 * this.godRadius / 3;
    this.ropeGodHolySpirit.width = 2 * this.godRadius / 3;
    this.ropeGodHolySpirit.height = 2 * this.godRadius / 3;

    this.godLittleStartX = this.godStartX + (this.ropeGod.width - this.ropeGodFather.width) / 2;
    this.godLittleStartY = this.godStartY;

    this.ropeGodFather.x = this.godLittleStartX;
    this.ropeGodFather.y = this.godLittleStartY;
    this.ropeGodFather.alpha = 0;

    this.ropeGodSon.x = this.godLittleStartX;
    this.ropeGodSon.y = this.godLittleStartY;
    this.ropeGodSon.alpha = 0;
    
    this.ropeGodHolySpirit.x = this.godLittleStartX;
    this.ropeGodHolySpirit.y = this.godLittleStartY;
    this.ropeGodHolySpirit.alpha = 0;

  }

  resetLocations(){
          
    this.spritePerson.x = this.personStartX;
    this.spritePerson.y = this.personStartY;
    
    this.ropeGod.x = this.godStartX;
    this.ropeGod.y = this.godStartY;
    
    this.ropePerson.x = this.personStartX;
    this.ropePerson.y = this.personStartY + 0.5 * this.ropePerson.height;
    
    this.timer = 0;
    this.countGod = 0;
    
  }

  private colorCircles(delta){
    this.countGod += 0.1 + delta / 10;
    if (this.countGod > 10000) {
      this.countGod = 0;
    }

    for (let i = 0; i < this.pointsGod.length; i++) {

        const R = 0.5 + 0.3 * Math.cos( i * 0.1 + this.countGod);
        const G = 0.5 + 0.5 * Math.cos( i * 0.15 + this.countGod);
        const B = 0.5 + 0.3 * Math.cos( i * 0.2 + this.countGod);

        this.pointsGod[i].color.setLight(R, 0.5, B);
        this.pointsGod[i].color.setDark(1, G , 1);
        this.pointsGod[i].color.alpha = this.ropeGod.alpha;
        
        this.pointsGodFather[i].color.setLight(R, 0.5, B);
        this.pointsGodFather[i].color.setDark(1, G , 1);
        this.pointsGodFather[i].color.alpha = this.ropeGodFather.alpha;
        
        this.pointsGodSon[i].color.setLight(R, 0.5, B);
        this.pointsGodSon[i].color.setDark(1, G , 1);
        this.pointsGodSon[i].color.alpha = this.ropeGodSon.alpha;
        
        this.pointsGodHolySpirit[i].color.setLight(R, 0.5, B);
        this.pointsGodHolySpirit[i].color.setDark(1, G , 1);
        this.pointsGodHolySpirit[i].color.alpha = this.ropeGodHolySpirit.alpha;
        
        this.pointsPerson[i].color.setLight(R, 0.5, B);
        this.pointsPerson[i].color.setDark(1, G , 1);
        this.pointsPerson[i].color.alpha = this.ropePerson.alpha;
     
    }

  }

  recalcTrinity() {
    
    this.trinityAngle += Math.floor(Math.random() * 90);

    if (this.trinityAngle > 360) {
        this.trinityAngle -= 360;
    }

    let radius = this.godRadius * (2 / 3) - this.lineWidth;
    
    let x0 = this.godLittleStartX;
    let y0 = this.godLittleStartY;

    let posFatherFinish = [x0 + radius * Math.cos(Math.PI * this.trinityAngle / 180), y0 + radius * Math.sin(Math.PI * this.trinityAngle / 180)]
    let posSonFinish = [x0 + radius * Math.cos(Math.PI * (this.trinityAngle + 120) / 180), y0 + radius * Math.sin(Math.PI * (this.trinityAngle + 120) / 180)]
    let posHolySpiritFinish = [x0 + radius * Math.cos(Math.PI * (this.trinityAngle + 240) / 180), y0 + radius * Math.sin(Math.PI * (this.trinityAngle + 240) / 180)]

    let curveFather = [
        [this.ropeGodFather.x, this.ropeGodFather.y],
        [this.ropeGodSon.x, this.ropeGodSon.y],
        [this.ropeGodHolySpirit.x, this.ropeGodHolySpirit.y],
        posFatherFinish
    ]

    let curveSon = [
        [this.ropeGodSon.x, this.ropeGodSon.y],
        [this.ropeGodHolySpirit.x, this.ropeGodHolySpirit.y],
        [this.ropeGodFather.x, this.ropeGodFather.y],
        posSonFinish
    ]

    let curveHolySpirit = [
        [this.ropeGodHolySpirit.x, this.ropeGodHolySpirit.y],
        [this.ropeGodFather.x, this.ropeGodFather.y],
        [this.ropeGodSon.x, this.ropeGodSon.y], 
        posHolySpiritFinish
    ]

  }

  private animLoop(delta){
    this.animExec(delta);
    this.animExec2(delta);
    this.charmShow1.update();
    this.charmShow2.update();
    this.charmShow3.update();
    this.charmHide1.update();
    this.charmHide2.update();
    this.charmHide3.update();
  }
  
  // Final Animations -----------------------------------------------------------------------

  private animLastWait(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animHideAll;
        this.timer = 0;
        
    } else {
        this.timer += 1;
    }
  }

  animHideAll(delta){
    if (this.spritePerson.alpha <= 0 && this.ropeGod.alpha <= 0){
        this.timer = 0
        this.ropeGod.alpha = 0;
        this.ropePerson.alpha = 0;              
        this.spritePerson.alpha = 0;
        this.resetLocations();
        this.animExec = function(delta){};
        
    } else {
        this.spritePerson.alpha -= .1;
        this.ropeGod.alpha -= .1;
        this.ropePerson.alpha -= .1;
    }
    
  }

  hideAll() {
      this.finishAll = true;
      this.animExec = this.animHideAll;
  }

  setBase() {

    this.hideAll();
    this.setupSecondBase();
            
  }

  setupSecondBase() {
    
    // Set God Circle + Child
    this.resetLocations();

    // Show God Circle
    this.timer = 0;
    this.animExec = this.showSecondBase;

  }

  showSecondBase(delta) {
    
    if (this.ropeGod.alpha >= .95){
        this.ropeGod.alpha = 1;
        this.spritePerson.alpha = 1;
        this.animExec = function(delta){};
        this.timer = 0;
    } else {
        this.timer += 0.012
        this.ropeGod.alpha = this.timer;
        this.spritePerson.alpha = this.timer;
    }

  }

  showScene21() {

    this.timer = 0;
    this.animExec = this.showAncestorsAnim;

  }

  showAncestorsAnim(delta) {

    if (this.timer >= 0.6) {
      this.grandparentsContainer.alpha = 0.3;
      this.parentsContainer.alpha = 0.6;
      this.animExec = function(delta){}
    } else {
      this.timer += 0.02
      this.parentsContainer.alpha = this.timer;
      this.grandparentsContainer.alpha = this.timer / 2; 
    }

  }

  hideAncestorsAnim(delta) {
    
    if (this.timer <= 0.0) {
      this.grandparentsContainer.alpha = 0.0;
      this.parentsContainer.alpha = 0.0;
      this.animExec = function(delta){}
    } else {
      this.timer -= 0.03
      this.parentsContainer.alpha = this.timer;
      this.grandparentsContainer.alpha = this.timer / 2; 
    }
  }

  hideScene21() {
    if (this.parentsContainer.alpha  != 0) {
      this.timer = 0.6;
      this.animExec = this.hideAncestorsAnim;
    }
  }

  showScene22() {
    this.stopSeparation = false;
    this.animExec2 = this.lightning;
    this.timer = 0;
  }

  lightning(delta) {
    let t1 = 3; // Start Pulse
    let t2 = 8; // End Pulse
    let t3 = 15; // Start Pulse
    let t4 = 20; // End Pulse
    let t5 = 27; // Start Pulse
    let t6 = 32; // End Pulse
    let t7 = 37; // Start Pulse
    let t8 = 72; // End Pulse
    

    if ( 0 < this.timer && this.timer <= t1 ) {
      this.spriteSeparation.alpha = 1;

    } else if ( t1 < this.timer && this.timer <= t2 ){
      this.spriteSeparation.alpha = (t2 - this.timer) / t2;

    } else if ( t2 < this.timer && this.timer <= t3 ){
      this.spriteSeparation.alpha = 1;

    } else if ( t3 < this.timer && this.timer <= t4 ){
      this.spriteSeparation.alpha = (t4 - this.timer) / t4;

    } else if ( t4 < this.timer && this.timer <= t5 ){
      this.spriteSeparation.alpha = 1;
    
    } else if ( t5 < this.timer && this.timer <= t6 ){
      this.spriteSeparation.alpha = (t6 - this.timer) / t6;

    } else if ( t6 < this.timer && this.timer <= t7 ){
      this.spriteSeparation.alpha = 1;
    
    } else if ( t7 < this.timer && this.timer <= t8 ){
      this.spriteSeparation.alpha = (t8 - this.timer) / t8;
    
    } else if (this.timer > 140) {
      if (this.stopSeparation) {
        this.spriteSeparation.alpha = 0;
        this.animExec2 = function(){};
      } else {
        if (Math.random() > 0.9) {
          this.timer = 0;
        }
      }
    }

    this.timer += 1;
    
  }

  hideScene22() {

    this.stopSeparation = true;

  }

  showScene23() {

    this.stopOrphanBool = false;
    this.startOrphan();
    
  }

  startOrphan() {

    if (this.stopOrphanBool) {
      this.charmShow1.slide(this.spritePerson, this.personStartX, this.personStartY, 20, "smoothstepCubed")
      return
    }

    let xMove = Math.random() * (this.screenWidth * 0.4 - this.spritePerson.width);
    let yMove = Math.random() * (this.screenHeight - this.spritePerson.height);

    var self = this;
    this.charmShow1.slide(this.spritePerson, xMove, yMove, 60, "smoothstepCubed").onCompleted = function() {
          self.startOrphan()};
  }

  hideScene23() {
    this.stopOrphanBool = true;
  }

  showScene24() {

    this.stopOrphanChasingBool = false;
    this.startOrphanChasing();

  }
  
  startOrphanChasing() {

    let ico = Math.random()
    if (ico <= 0.33) {
      this.spritePopup = this.spriteXXX;
    } else if (ico >= 0.66) {
      this.spritePopup = this.spriteMon;
    } else {
      this.spritePopup = this.spriteMed;
    }

    if (this.stopOrphanChasingBool) {
      this.charmShow1.slide(this.spritePerson, this.personStartX, this.personStartY, 20, "smoothstepCubed")
      return
    }
    
    var xMove = Math.random() * (this.screenWidth * 0.4 - this.spritePerson.width);
    var yMove = Math.random() * (this.screenHeight - this.spritePerson.height);

    this.spritePopup.x = xMove;
    this.spritePopup.y = yMove;

    while (hitTest(this.spritePopup, this.spritePerson, this.spritePerson.width)) {
      xMove = Math.random() * (this.screenWidth * 0.4 - this.spritePerson.width);
      yMove = Math.random() * (this.screenHeight - this.spritePerson.height);

      this.spritePopup.x = xMove;
      this.spritePopup.y = yMove;
    }

    var self = this;
    this.charmShow1.fadeIn(this.spritePopup).onCompleted = function() {
      self.midOrphanChasing(xMove, yMove);
    };

    
  }

  midOrphanChasing(xMove, yMove) {
    var self = this;
    this.charmShow1.fadeOut(this.spritePopup);
    this.charmShow2.slide(this.spritePerson, xMove, yMove, 60, "smoothstepCubed").onCompleted = function() {
        self.startOrphanChasing()};

  }

  hideScene24() {
    this.stopOrphanChasingBool = true;
  }


}
