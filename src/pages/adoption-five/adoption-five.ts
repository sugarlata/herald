import { AdoptionAniFiveComponent } from './../../components/adoption-ani-five/adoption-ani-five';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-adoption-five',
  templateUrl: 'adoption-five.html',
})
export class AdoptionFivePage {

  @ViewChild("gospelAni")
  public gospelAni: AdoptionAniFiveComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionFivePage');
  }

  ngAfterViewInit() {
    this.gospelAni.createAnim();
    this.gospelAni.setBase();
  }

  goBack(params) {
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }

  goHome(params){
    this.navCtrl.setRoot(HomePage);
  }
  
  tabBClick(params) {
    this.gospelAni.hideScene54();
  }
  
  tabBUnclicked(params) {
    this.gospelAni.hideScene54();
  }
  
  tabOneClick(params) {
    this.gospelAni.hideScene54();
  }
  
  tabOneUnclicked(params) {
    this.gospelAni.hideScene54();
  }
  
  tabTwoClick(params) {
    this.gospelAni.hideScene54();
  }
  
  tabTwoUnclicked(params) {
    this.gospelAni.hideScene54();
  }
  
  tabThreeClick(params) {
    this.gospelAni.hideScene54();
  }
  
  tabThreeUnclicked(params) {
    this.gospelAni.hideScene54();
  }
  
  tabFourClick(params) {
    this.gospelAni.showScene54();
  }

  tabFourUnclicked(params) {
    this.gospelAni.hideScene54();
    
  }
}
