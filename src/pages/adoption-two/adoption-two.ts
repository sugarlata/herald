import { AdoptionAniTwoComponent } from './../../components/adoption-ani-two/adoption-ani-two';
import { AdoptionThreePage } from './../adoption-three/adoption-three';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdoptionTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adoption-two',
  templateUrl: 'adoption-two.html',
})

export class AdoptionTwoPage {

  @ViewChild("gospelAni")
  public gospelAni: AdoptionAniTwoComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionTwoPage');
  }
  
  ngAfterViewInit() {
    this.gospelAni.createAnim();
    this.gospelAni.setBase();
  }

  goForward(params){

    this.navCtrl.push(AdoptionThreePage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }
  
  tabOneClick(params) {
    this.gospelAni.showScene21();
    this.gospelAni.hideScene22();
    this.gospelAni.hideScene23();
    this.gospelAni.hideScene24();

  }

  tabOneUnclicked(params) {
    this.gospelAni.hideScene21();
    
  }

  tabTwoClick(params) {
    this.gospelAni.hideScene21();
    this.gospelAni.showScene22();
    this.gospelAni.hideScene23();
    this.gospelAni.hideScene24();
  }

  tabTwoUnclicked(params) {
    this.gospelAni.hideScene22();
    
  }

  tabThreeClick(params) {
    this.gospelAni.hideScene21();
    this.gospelAni.hideScene22();
    this.gospelAni.showScene23();
    this.gospelAni.hideScene24();
  }

  tabThreeUnclicked(params) {
    this.gospelAni.hideScene23();
    
  }

  tabFourClick(params) {
    this.gospelAni.hideScene21();
    this.gospelAni.hideScene22();
    this.gospelAni.hideScene23();
    this.gospelAni.showScene24();
  }

  tabFourUnclicked(params) {
    this.gospelAni.hideScene24();
    
  }
}
