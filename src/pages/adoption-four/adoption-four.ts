import { AdoptionAniFourComponent } from './../../components/adoption-ani-four/adoption-ani-four';
import { AdoptionFivePage } from './../adoption-five/adoption-five';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adoption-four',
  templateUrl: 'adoption-four.html',
})
export class AdoptionFourPage {

  @ViewChild("gospelAni")
  public gospelAni: AdoptionAniFourComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionFourPage');
  }

  ngAfterViewInit() {
    this.gospelAni.createAnim();
    this.gospelAni.setBase();
  }

  goForward(params){
    this.navCtrl.push(AdoptionFivePage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'})
  }
  
  
  tabOneClick(params) {
    this.gospelAni.hideScene();
    this.gospelAni.hideScene44();
    this.gospelAni.showScene41();

  }

  tabOneUnclicked(params) {
    this.gospelAni.hideScene();
    
  }

  tabTwoClick(params) {
    this.gospelAni.hideScene();
    this.gospelAni.hideScene44();
    this.gospelAni.showScene42();
  }

  tabTwoUnclicked(params) {
    this.gospelAni.hideScene();
    
  }

  tabThreeClick(params) {
    this.gospelAni.hideScene();
    this.gospelAni.hideScene44();
    this.gospelAni.showScene43();
  }

  tabThreeUnclicked(params) {
    this.gospelAni.hideScene();
    
  }

  tabFourClick(params) {
    this.gospelAni.hideScene();
    this.gospelAni.showScene44();
  }

  tabFourUnclicked(params) {
    this.gospelAni.hideScene44();
    
  }
}
