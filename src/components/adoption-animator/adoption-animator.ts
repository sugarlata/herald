import { Component, ViewChild, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';

import * as PIXI from 'pixi.js';
import 'pixi-spine';
import 'pixi-heaven';
import * as CHARM from 'pixijs-charm';


function easeInOutQuint(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t*t*t + 2) + b;
}

function calcTrinityFinish(x, y, radius, angle) {  
  return [x + radius * Math.cos(Math.PI * angle / 180),
          y + radius * Math.sin(Math.PI * angle / 180)];
}

abstract class ObjectBase {
  
  lineWidth: number;
  counter: number;
  angleRotation:number;
  width: number;
  height: number;
  radius: number;
  startX: number;
  startY: number;
  finishX: number;
  finishY: number;
  animObject: any;
  charm: any;
  charmTween: any;

  animExec = function(delta){};
  
  constructor() {

    this.charm = new CHARM.Charm(PIXI);
  
  }

  public setPosition(x: number, y: number){
    this.animObject.x = x;
    this.animObject.y = y;
  }

  public setAlpha(alpha: number){
    this.animObject.alpha = alpha;
  }
  
}

abstract class CircleObject extends ObjectBase{

  constructor(lineWidth: number, startX: number, startY: number, radius: number){
    super();

    this.lineWidth = lineWidth;
    this.startX = startX;
    this.startY = startY;
    this.width = 2 * radius;
    this.height = 2 * radius;
    this.radius = radius;
    this.counter = 0;

    this.createObject();
    this.setPosition(startX, startY);
    this.setAlpha(0);

  }

  abstract createObject();

}

class RopeCircle extends CircleObject{

  createObject(){
    let graphicCircle = new PIXI.Graphics();

    // Draw Circle
    graphicCircle.lineStyle(2 * this.lineWidth, 0x9E9E9E);
    graphicCircle.drawCircle(this.radius + 0.5 * this.lineWidth, this.radius + 0.5 * this.lineWidth, this.radius);
    graphicCircle.endFill();

    this.animObject = new PIXI.heaven.mesh.Rope(graphicCircle.generateCanvasTexture(), 100, 2, 0);
    this.animObject.enableColors();
   
    this.setSize();
    this.animExec = this.colorCircle;

  }

  private setSize(){
    this.animObject.width = 2 * this.radius;
    this.animObject.height = 2 * this.radius;
  }

  public colorCircle(delta) {
    this.counter += 0.1 + delta / 10;
    if (this.counter > 10000) {
      this.counter = 0;
    }

    for (let i = 0; i < this.animObject.points.length; i++) {
      
      const R = 0.5 + 0.3 * Math.cos( i * 0.1 + this.counter);
      const G = 0.5 + 0.5 * Math.cos( i * 0.15 + this.counter);
      const B = 0.5 + 0.3 * Math.cos( i * 0.2 + this.counter);

      this.animObject.points[i].color.setLight(R, 0.5, B);
      this.animObject.points[i].color.setDark(1, G, 1);
      this.animObject.points[i].alpha = this.animObject.alpha;

    }

  }


}

class RopeBar {

}

class PersonSprite extends CircleObject{

  createObject(){
    
    // Create Graphics
    let graphicPerson = new PIXI.Graphics();

    // Draw Person
    graphicPerson.lineStyle(this.lineWidth, 0x9e9e9e);
    graphicPerson.drawCircle(0, 0, this.radius);
    graphicPerson.endFill();

    // Create Sprite
    this.animObject = new PIXI.Sprite(graphicPerson.generateCanvasTexture());

  }

}

@Component({
  selector: 'adoption-animator',
  templateUrl: 'adoption-animator.html'
})

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdoptionAnimatorComponent {

  @ViewChild("pixiContainer")
  public pixiContainer: ElementRef;

  private pixi: PIXI.Application;
  
  elementDictionary: any;

  screenHeight: number;
  screenWidth: number;
  trinityAngle: number;
  trinityStartX: number;
  trinityStartY: number;
  
  charmAnimator: any;
  hideAnim: boolean;

  constructor(platform: Platform) {

    this.elementDictionary = {};
    this.hideAnim = false;
    this.trinityAngle = 0;
    
  }

  ngAfterViewInit() {
    
    // Init Variables
    let lineWidth = 4;
    
    // Setup the sizes
    this.screenHeight = this.pixiContainer.nativeElement.offsetHeight;
    this.screenWidth = this.pixiContainer.nativeElement.offsetWidth;

    this.initAnimator();
    this.initComponents(lineWidth)
    this.addObjectsToStage();

    this.pixi.ticker.add(delta => this.animLoop(delta));

    this.animTrinity();

  }

  initAnimator(){

    // Create PIXI Application
    this.pixi = new PIXI.Application(
      this.screenWidth,
      this.screenHeight,
      {
        antialias: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0xffffff,
      });

    this.pixi.view.style.width = this.screenWidth.toString();
    this.pixi.view.style.height = this.screenHeight.toString();
    this.pixiContainer.nativeElement.appendChild(this.pixi.view);

  }

  initComponents(lineWidth: number){

    // Setup Person
    let personRadius = this.screenWidth / 14;
    let personStartX = 0.15 * this.screenWidth
    let personStartY = 0.5 * (this.screenHeight - 2 * personRadius) + 0.2 * this.screenHeight;
    this.elementDictionary['spritePerson'] = new PersonSprite(lineWidth, personStartX, personStartY, personRadius)

    // Setup God
    let godRadius = this.screenHeight / 7;
    let godStartX = (this.screenWidth / 2) - (godRadius);
    let godStartY = this.screenHeight / 2;
    this.elementDictionary['ropeGod'] = new RopeCircle(lineWidth, godStartX, godStartY, godRadius);

    // Setup Trinity
    let trinityRadius = godRadius / 3;
    this.trinityStartX = godStartX + (godRadius - trinityRadius);
    this.trinityStartY = godStartY;
    this.elementDictionary['ropeFather'] = new RopeCircle(lineWidth / 3, this.trinityStartX, this.trinityStartY, trinityRadius);
    this.elementDictionary['ropeSon'] = new RopeCircle(lineWidth / 3, this.trinityStartX, this.trinityStartY, trinityRadius);
    this.elementDictionary['ropeHS'] = new RopeCircle(lineWidth / 3, this.trinityStartX, this.trinityStartY, trinityRadius);

  }

  addObjectsToStage(){

    for (let objName in this.elementDictionary){
      let obj = this.elementDictionary[objName];
      this.pixi.stage.addChild(obj.animObject);
    }

  }

  animLoop(delta){

    this.animObjects(delta);

  }

  animObjects(delta) {

    for (let objName in this.elementDictionary){
      let obj = this.elementDictionary[objName];
      obj.animExec(delta);
      obj.charm.update();
    }
  }

  animTrinity() {
    console.log('Anim Trinity')

    this.trinityAngle += Math.floor(Math.random() * 90);
    if (this.trinityAngle > 360) {
      this.trinityAngle -= 360;
    }

    let godRadius = this.elementDictionary['ropeGod'].radius;
    let lineWidth = this.elementDictionary['ropeGod'].lineWidth;
    
    let radius = godRadius * (2 / 3) - lineWidth;
    
    let x0 = this.trinityStartX;
    let y0 = this.trinityStartY;

    let posFatherFinish = calcTrinityFinish(x0, y0, radius, this.trinityAngle)
    let posSonFinish = calcTrinityFinish(x0, y0, radius, this.trinityAngle + 120)
    let posHSFinish = calcTrinityFinish(x0, y0, radius, this.trinityAngle + 240)

    let ropeFather = this.elementDictionary['ropeFather'].animObject;
    let ropeSon = this.elementDictionary['ropeSon'].animObject;
    let ropeHS = this.elementDictionary['ropeHS'].animObject;

    let cvFather = [
      [ropeFather.x, ropeFather.y],
      [ropeSon.x, ropeSon.y],
      [ropeHS.x, ropeHS.y],
      posFatherFinish
    ]
    let cvSon = [
      [ropeSon.x, ropeSon.y],
      [ropeHS.x, ropeHS.y],
      [ropeFather.x, ropeFather.y],
      posSonFinish
    ]
    let cvHS = [
      [ropeHS.x, ropeHS.y],
      [ropeFather.x, ropeFather.y],
      [ropeSon.x, ropeSon.y],
      posHSFinish
    ]

    this.elementDictionary['ropeFather'].charmTween = this.elementDictionary['ropeFather'].charm.followCurve(
      ropeFather,
      cvFather,
      100,
      "smoothstep",
      false,
    )

    var self = this;
    this.elementDictionary['ropeFather'].charmTween.onCompleted = function() {
      self.animTrinity()};
    
    this.elementDictionary['ropeSon'].charmTween = this.elementDictionary['ropeSon'].charm.followCurve(
      ropeSon,
      cvSon,
      100,
      "smoothstep",
      false,
    )
    
    this.elementDictionary['ropeHS'].charmTween = this.elementDictionary['ropeHS'].charm.followCurve(
      ropeHS,
      cvHS,
      100,
      "smoothstep",
      false,
    )
    


  }

  hideAll(){

    for (let objName in this.elementDictionary){
      let obj = this.elementDictionary[objName];
      obj.animObject.alpha = 0;
    }

  }

  loadScene11() {

    this.hideAll();

    let ropeGod = this.elementDictionary['ropeGod'];
    let x = (this.screenWidth / 2) - (ropeGod.width / 2);
    let y = this.screenHeight / 2;
    ropeGod.setPosition(x, y);
    ropeGod.animObject.alpha = 1;
    
  }

  loadScene12() {
    
    this.hideAll();

    let spritePerson = this.elementDictionary['spritePerson'];
    let x = (this.screenWidth / 2) - (spritePerson.width / 2);
    let y = (this.screenHeight / 2) - (spritePerson.width / 2);
    spritePerson.setPosition(x, y);
    spritePerson.setAlpha(1);

    

  }
  
  loadScene13() {
    
    this.hideAll();


    let ropeGod = this.elementDictionary['ropeGod'];
    let ropeFather = this.elementDictionary['ropeFather'];
    let ropeSon = this.elementDictionary['ropeSon'];
    let ropeHS = this.elementDictionary['ropeHS'];
    
    let x = (this.screenWidth / 2) - (ropeGod.width / 2);
    let y = this.screenHeight / 2;
    let trinityRadius = ropeGod.radius / 3;
    this.trinityStartX = x + (ropeGod.radius - trinityRadius);
    this.trinityStartY = y;

    ropeGod.setAlpha(1);
    ropeFather.setAlpha(1);
    ropeSon.setAlpha(1);
    ropeHS.setAlpha(1);

  }


}
