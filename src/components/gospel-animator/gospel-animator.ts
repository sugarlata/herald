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
  selector: 'gospel-animator',
  templateUrl: 'gospel-animator.html'
})

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})


export class GospelAnimatorComponent {

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
  countBar: number;
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
  ropeBar: any;
  pointsBar: any;
  ropeBarAlpha: number;

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
    this.countBar = 0;
    this.personRadius = this.screenWidth / 14;
    this.godRadius = this.screenWidth / 7;

    this.timer = 0;
    this.timerSecond = 0;

    this.ropeBarAlpha = 0;
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

    // ---------------------------------------------------------   Setup Bar   ---------------------------------------------------------
    // Create Graphic
    let graphicBar = new PIXI.Graphics(); 
    let graphicBarRadius = 200;
    graphicBar.width = 5 * graphicBarRadius;
    graphicBar.height = graphicBarRadius;

    graphicBar.lineStyle(1, 0x9E9E9E);
    graphicBar.beginFill(0x9e9e9e, 1);
    graphicBar.drawCircle(graphicBarRadius + 0.5 * this.lineWidth, graphicBarRadius + 0.5 * this.lineWidth, graphicBarRadius);
    graphicBar.drawCircle(5 * graphicBarRadius, graphicBarRadius + 0.5 * this.lineWidth, 0.5 * graphicBarRadius);
    let polyPoints = [graphicBarRadius, 0.5 * this.lineWidth,5 * graphicBarRadius, 0.5 * graphicBarRadius + 0.5 * this.lineWidth, 5 * graphicBarRadius, 1.5 * graphicBarRadius + 0.5 * this.lineWidth, graphicBarRadius, 2 * graphicBarRadius + 0.5 * this.lineWidth];
    graphicBar.drawPolygon(polyPoints);
    graphicBar.endFill();    
    
    // Create Mesh
    this.ropeBar = new PIXI.heaven.mesh.Rope(graphicBar.generateCanvasTexture(), 200, 2, 0);
    this.pointsBar = this.ropeBar.points;
    this.ropeBar.enableColors();

    // Lots of Maths to figure out the size and location
    let bufferVal = 5;

    // Location of A - Person
    let personX = this.spritePerson.x + 0.5 * this.spritePerson.width;
    let personY = this.spritePerson.y + 0.5 * this.spritePerson.height;

    // Location of B - God
    let godX = this.ropeGod.x + 0.5 * this.ropeGod.width;
    let godY = this.ropeGod.y;

    // Distance between A and B
    let xDiff = godX - personX;
    let yDiff = godY - personY;

    let personGodLength = Math.sqrt(Math.pow(yDiff,2) + Math.pow(xDiff,2));

    // Ratios
    let lengthAa = 0.5 * this.spritePerson.width + bufferVal;
    let lengthBb = 0.5 * this.ropeGod.width + bufferVal;

    // if (personGodLength < lengthAa + lengthBb + 100) {
    //   throw new Error('Not enough distance between circles, need to increase the size of screen');
    // }

    // Calc the length of ab and set size
    let lengthab = personGodLength - lengthAa - lengthBb;

    this.ropeBar.width = lengthab;
    this.ropeBar.height = lengthab / 5;

    // Apply Rotation
    let barRotate = Math.atan(yDiff / xDiff);
    this.ropeBar.rotation = barRotate;

    // Calc Point a
    let ratioAa = lengthAa / personGodLength;
    let aX = xDiff * ratioAa;
    let aY = yDiff * ratioAa;

    this.ropeBar.x = personX + aX;
    this.ropeBar.y = personY + aY;
    this.ropeBarAlpha = 0;
    this.ropeBar.alpha = 0;


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

    // Add elements into the stage
    this.pixi.stage.addChild(this.spritePerson);
    this.pixi.stage.addChild(this.ropeGod);
    this.pixi.stage.addChild(this.ropeBar);
    this.pixi.stage.addChild(this.ropePerson);


    // Add animation functions
    this.pixi.ticker.add(delta => this.colorpulseBar(delta));
    this.pixi.ticker.add(delta => this.colorCircles(delta));
    this.pixi.ticker.add(delta => this.animLoop(delta));

  }

  beginFullAnim(){
    this.animExec = this.animTwo;
  }

  resetLocations(){
          
    this.spritePerson.x = this.personStartX;
    this.spritePerson.y = this.personStartY;
    
    this.ropeGod.x = this.godStartX;
    this.ropeGod.y = this.godStartY;
    
    this.ropePerson.x = this.personStartX;
    this.ropePerson.y = this.personStartY + 0.5 * this.ropePerson.height;
    
    this.ropeBarMove();
    
    this.timer = 0;
    this.countBar = 0;
    this.countGod = 0;
    
  }

  private ropeBarMove() {
    // Lots of maths to figure out size and location of bar
    let bufferVal = 5;

    // Location of A
    let personX = this.spritePerson.x + 0.5 * this.spritePerson.width;
    let personY = this.spritePerson.y + 0.5 * this.spritePerson.height;

    // Location of B
    let godX = this.ropeGod.x + 0.5 * this.ropeGod.width;
    let godY = this.ropeGod.y;

    // Distance between
    let yDiff = godY - personY;
    let xDiff = godX - personX;

    let personGodLength = Math.sqrt(Math.pow(yDiff,2) + Math.pow(xDiff, 2));

    // Ratios
    let lengthAa = 0.5 * this.spritePerson.width + bufferVal;
    let lengthBb = 0.5 * this.ropeGod.width + bufferVal;

    // if (personGodLength < lengthAa + lengthBb + 100) {
    //     throw new Error('Not enough distance between circles, need to increase size of screen.');
    // }

    // Calc length of ab and set size
    let lengthab = personGodLength - lengthAa - lengthBb;

    this.ropeBar.width = lengthab;
    this.ropeBar.height = lengthab / 5;

    // Apply rotation
    let barRotate = Math.atan(yDiff / xDiff);
    this.ropeBar.rotation = barRotate;

    // Calc point a
    let ratioAa = lengthAa / personGodLength;
    let aX = xDiff * ratioAa;
    let aY = yDiff * ratioAa;

    this.ropeBar.x = personX + aX;
    this.ropeBar.y = personY + aY;
    this.ropeBarAlpha = 0;
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
        
        this.pointsPerson[i].color.setLight(R, 0.5, B);
        this.pointsPerson[i].color.setDark(1, G , 1);
        this.pointsPerson[i].color.alpha = this.ropePerson.alpha;
     
    }

  }

  private colorpulseBar(delta){

    this.countBar += 0.105;

    
    for (let i = 0; i < this.pointsBar.length; i++){
        const R = 0.7 + 0.3 * Math.cos( i * 0.1 + this.countBar);
        const G = 0.5 + 0.5 * Math.cos( i * 0.15 + this.countBar);
        const B = 0.5 + 0.3 * Math.cos( i * 0.2 + this.countBar);

        this.pointsBar[i].color.setLight(R, 0.5, B);
        this.pointsBar[i].color.setDark(R, G , .5);
        this.pointsBar[i].color.alpha = this.ropeBarAlpha;
        this.pointsBar[i].scale = 1 + 0.3 * Math.sin((i / 20) + this.countBar / 2);

    }
          
  }

  private animLoop(delta){
    this.animExec(delta);
    this.animExec2(delta);
  }
  
  private animTwo(delta){
    // Animation in here
    if (this.timer > 1 * 60){
        this.animExec = this.animThree;
        this.timer = 0;
    } else {
        this.timer += 1
    }
  }

  private animThree(delta){
    if (this.spritePerson.alpha >= 0.988){
        this.animExec = this.animFour;
        this.timer = 0
    } else {
        this.spritePerson.alpha += .012;
    }
  }

  private animFour(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animFive;
        this.timer = 0;
    } else {
        this.timer += 1;
    }
  }

  private animFive(delta){
    if (this.ropeGod.alpha >= .95){
        this.ropeGod.alpha = 1;
        this.animExec = this.animSix;
        this.timer = 0;
    } else {
        this.ropeGod.alpha += .012;
    }
  }

  private animSix(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animSeven;
        this.timer = 0;
    } else {
        this.timer += 1;
    }
  }

  private animSeven(delta){
    if (this.ropeBarAlpha >= .95){
        this.ropeBarAlpha = 1;
        this.ropeBar.alpha = 1;
        this.animExec = this.animEight;
        this.timer = 0;
    } else {
        this.ropeBarAlpha += .012;
        this.ropeBar.alpha = this.ropeBarAlpha;
    }
  }

  private animEight(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animNine;
        this.timer = 0;
    } else {
        this.timer += 1;
    }
  }

  private animNine(delta){
    if (this.spritePerson.alpha <= .05){
        this.spritePerson.alpha = 0;
        this.ropePerson.alpha = 1;
        this.animExec = this.animTen;
        this.timer = 0;
    } else {
        this.spritePerson.alpha -= .012;
        this.ropePerson.alpha = 1 - this.spritePerson.alpha;
    }
  }

  private animTen(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animEleven;
        this.timer = 0;
        this.timerSecond = 0;
    } else {
        this.timer += 1;
    }
  }

  private animEleven(delta){
    
    let funcMove = easeInOutQuint;
    
    if (this.timer > 0.995) {
        this.ropeGod.x = this.godFinishX;
        this.ropeGod.y = this.godFinishY;
        this.ropePerson.x = this.personFinishX;
        this.ropePerson.y = this.personFinishY;
        this.timer = 0;
        this.changePerson();
        this.animExec = this.animTwelve;
    } else {  
        this.timer += .01;
        this.ropeGod.x = funcMove(this.timer, this.godStartX, this.godFinishX - this.godStartX, 1);
        this.ropeGod.y = funcMove(this.timer, this.godStartY, this.godFinishY - this.godStartY, 1);
        this.ropePerson.x = funcMove(this.timer, this.personStartX, this.personFinishX - this.personStartX, 1);
        this.ropePerson.y = funcMove(this.timer, this.personStartY + 0.5 * this.ropePerson.height, this.personFinishY - (this.personStartY + 0.5 * this.ropePerson.height), 1);
    }
    
    if (this.timerSecond >= 0.92) {
        this.ropeBarAlpha = 0;
        this.ropeBar.alpha = 0;
    } else {
      this.timerSecond += 0.08;
        this.ropeBarAlpha = 1 - this.timerSecond;
    }
  }

  private animTwelve(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animThirteen;
        this.timer = 0;
        this.timerSecond = 0;
    } else {
        this.timer += 1;
    }
  }

  private changePerson() {
    
    this.spritePerson.y = 0.5 * (this.screenHeight - this.spritePerson.height) - .2 * this.screenHeight;
    this.ropeBarMove();
    
  }

  private animThirteen(delta){
    if (this.spritePerson.alpha >= .95){
        this.spritePerson.alpha = 1;
        this.animExec = this.animFourteen;
        this.timer = 0;
    } else {
        this.spritePerson.alpha += .012;
    }
     
  }

  private animFourteen(delta) {
    
    if (this.ropeBar.alpha >= .95){
        this.ropeBarAlpha = 1;
        this.ropeBar.alpha = 1;
        this.animExec = this.animLastWait;
        this.timer = 0;
    } else {
        this.timer += 0.012
        this.ropeBarAlpha = this.timer;
        this.ropeBar.alpha = this.ropeBarAlpha;
    }
  }

  // Final Animations -----------------------------------------------------------------------

  private animLastWait(delta){
    if (this.timer > 1 * 60){
        this.animExec = this.animHideAll;
        this.timer = 0;
        
        this.ropeBarAlpha = 1;
        this.ropeBar.alpha = 1;
    } else {
        this.timer += 1;
    }
  }

  animHideAll(delta){
    if (this.spritePerson.alpha <= 0 && this.ropeGod.alpha <= 0){
        this.timer = 0
        this.ropeGod.alpha = 0;
        this.ropeBarAlpha = 0;
        this.ropeBar.alpha = 0;
        this.ropePerson.alpha = 0;              
        this.spritePerson.alpha = 0;
        this.resetLocations();
        if (this.finishAll) {
            this.animExec = function(delta){};
        } else {
        this.animExec = this.animLast;
        }

    } else {
        this.spritePerson.alpha -= .1;
        this.ropeGod.alpha -= .1;
        this.ropeBarAlpha -= .1;
        this.ropeBar.alpha = this.ropeBarAlpha;
        this.ropePerson.alpha -= .1;
    }
    
  }

  private animLast(delta){
    if (this.timer > 1 * 60){
        this.resetLocations();
        this.animExec = this.animTwo;
        this.timer = 0;
    } else {
        this.timer += 1;
    }
  }

  hideAll() {
      this.finishAll = true;
      this.animExec = this.animHideAll;
  }

}
