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

@Component({
  selector: 'adoption-ani-five',
  templateUrl: 'adoption-ani-five.html'
})

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdoptionAniFiveComponent {
  
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

  charmFather: any;
  charmSon: any;
  charmHolySpirit: any;
  charmTween: any;
  charm: any;
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

    // Position and color
    this.personStartX = 0.15 * this.screenWidth;
    this.personStartY = 0.5 * (this.screenHeight - this.spritePerson.height) + 0.2 * this.screenHeight;

    this.spritePerson.x = this.personStartX;
    this.spritePerson.y = this.personStartY;
    this.spritePerson.alpha = 0;

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
    this.charmFather = new CHARM.Charm(PIXI);
    this.charmSon = new CHARM.Charm(PIXI);
    this.charmHolySpirit = new CHARM.Charm(PIXI);
    this.charm = new CHARM.Charm(PIXI);
    this.charmShow1 = new CHARM.Charm(PIXI);
    this.charmShow2 = new CHARM.Charm(PIXI);
    this.charmShow3 = new CHARM.Charm(PIXI);
    this.charmHide1 = new CHARM.Charm(PIXI);
    this.charmHide2 = new CHARM.Charm(PIXI);
    this.charmHide3 = new CHARM.Charm(PIXI);

    // Add elements into the stage
    this.pixi.stage.addChild(this.spritePerson);
    this.pixi.stage.addChild(this.ropeGod);
    this.pixi.stage.addChild(this.ropeGodFather);
    this.pixi.stage.addChild(this.ropeGodSon);
    this.pixi.stage.addChild(this.ropeGodHolySpirit);
    this.pixi.stage.addChild(this.ropePerson);


    // Add animation functions
    this.pixi.ticker.add(delta => this.colorCircles(delta));
    this.pixi.ticker.add(delta => this.animLoop(delta));
    this.recalcTrinity();

  }

  private trinityReset() {

    this.ropeGodFather.width = this.godRadius / 3;
    this.ropeGodFather.height = this.godRadius / 3;
    this.ropeGodSon.width = this.godRadius / 3;
    this.ropeGodSon.height = this.godRadius / 3;
    this.ropeGodHolySpirit.width = this.godRadius / 3;
    this.ropeGodHolySpirit.height = this.godRadius / 3;

    this.godLittleStartX = this.personStartX + (this.ropePerson.width - this.ropeGodFather.width) / 2;
    this.godLittleStartY = this.personStartY + this.ropePerson.height / 2;

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

    let radius = this.personRadius * (2 / 3) - this.lineWidth;
    
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

    this.charmTween = this.charmFather.followCurve(
        this.ropeGodFather,
        curveFather,
        100,
        "smoothstep",
        false,
    )

    var self = this;
    this.charmTween.onCompleted = function() {
        self.recalcTrinity()};

    this.charmSon.followCurve(
        this.ropeGodSon,
        curveSon,
        100,
        "smoothstep",
        false,
    )

    this.charmHolySpirit.followCurve(
        this.ropeGodHolySpirit,
        curveHolySpirit,
        100,
        "smoothstep",
        false,
    )
    
    // this.charmFather.slide(
    //     this.ropeGodFather,
    //     posFatherFinish[0],
    //     posFatherFinish[1]
    // )

  }

  private animLoop(delta){
    this.animExec(delta);
    this.animExec2(delta);
    this.charmFather.update();
    this.charmSon.update();
    this.charmHolySpirit.update();
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
    this.setupFifthBase();
            
  }

  setupFifthBase() {

    this.timer = 0;
    this.animExec = this.showFifthBase;
  }

  showFifthBase(delta) {
    if (this.timer >= 0.98) {
      this.ropeGod.alpha = 1;
      this.spritePerson.alpha = 1;
      this.animExec = function(){};
    } else {
      this.ropeGod.alpha = this.timer;
      this.spritePerson.alpha = this.timer;
      this.timer += .04;
    }
  }

  showScene54(){

    console.log('HERE');
    this.charmFather.fadeIn(this.ropeGodFather);
    this.charmSon.fadeIn(this.ropeGodSon);
    this.charmHolySpirit.fadeIn(this.ropeGodHolySpirit);
    this.charmShow1.fadeOut(this.spritePerson);
    this.charmShow2.fadeIn(this.ropePerson);

  }

  hideScene54(){

    this.charmFather.fadeOut(this.ropeGodFather);
    this.charmSon.fadeOut(this.ropeGodSon);
    this.charmHolySpirit.fadeOut(this.ropeGodHolySpirit);
    this.charmShow1.fadeIn(this.spritePerson);
    this.charmShow2.fadeOut(this.ropePerson);
  }

}
