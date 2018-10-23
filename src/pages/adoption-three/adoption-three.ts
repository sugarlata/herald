import { AdoptionAniThreeComponent } from './../../components/adoption-ani-three/adoption-ani-three';
import { AdoptionFourPage } from './../adoption-four/adoption-four';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdoptionThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adoption-three',
  templateUrl: 'adoption-three.html',
})
export class AdoptionThreePage {

  @ViewChild("gospelAni")
  public gospelAni: AdoptionAniThreeComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionThreePage');
  }

  ngAfterViewInit() {
    this.gospelAni.createAnim();
    this.gospelAni.setBase();
  }

  goForward(params){
    this.navCtrl.push(AdoptionFourPage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }

  
  tabOneClick(params) {
    this.gospelAni.hideScene32();
    this.gospelAni.hideScene33();
    this.gospelAni.showScene31();

  }

  tabOneUnclicked(params) {
    this.gospelAni.hideScene31();
    
  }

  tabTwoClick(params) {
    this.gospelAni.hideScene31();
    this.gospelAni.hideScene33();
    this.gospelAni.showScene32();
  }

  tabTwoUnclicked(params) {
    this.gospelAni.hideScene32();
    
  }

  tabThreeClick(params) {
    this.gospelAni.hideScene31();
    this.gospelAni.hideScene32();
    this.gospelAni.showScene33();
  }

  tabThreeUnclicked(params) {
    this.gospelAni.hideScene33();
    
  }
}
