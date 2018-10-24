import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdoptionTwoPage } from '../adoption-two/adoption-two';
import { AdoptionAnimatorComponent } from './../../components/adoption-animator/adoption-animator';


@IonicPage()
@Component({
  selector: 'page-adoption-one',
  templateUrl: 'adoption-one.html',
})

export class AdoptionOnePage {
  
  @ViewChild("gospelAni")
  public gospelAni: AdoptionAnimatorComponent;

  @ViewChild("blinky")
  private blinky: any;

  stage: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.stage = 0;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionOnePage');
  }

  ngAfterViewInit() {
    // this.gospelAni.createAnim();
    // this.gospelAni.setBase();
    
  }

  goHome(params) {
    // this.gospelAni.hideAll();
    this.navCtrl.setRoot(HomePage);
  }

  goForward(params){
    // this.gospelAni.hideAll();
    this.navCtrl.push(AdoptionTwoPage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  onScroll(event) {
    let sv = event['scrollTop'];

    if (sv != 0) {
      this.blinky.nativeElement.style.webkitAnimationPlayState = 'paused';
      this.blinky.nativeElement.style.visibility = "hidden";
    } else {
      this.blinky.nativeElement.style.webkitAnimationPlayState = 'running';
      this.blinky.nativeElement.style.visibility = "visible";
    }

    if (sv < 1415 && this.stage != 1) {
      this.stage = 1;
      this.gospelAni.loadScene11();
    } else if (1415 <= sv && sv < 2200 && this.stage != 2) {
      this.stage = 2;
      this.gospelAni.loadScene12();
    } else if (2200 <= sv && this.stage != 3) {
      this.stage = 3;
      this.gospelAni.loadScene13();
    }

  }
  
}
