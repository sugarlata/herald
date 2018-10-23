import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdoptionTwoPage } from '../adoption-two/adoption-two';
import { AdoptionAniOneComponent } from './../../components/adoption-ani-one/adoption-ani-one';


/**
 * Generated class for the AdoptionOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adoption-one',
  templateUrl: 'adoption-one.html',
})

export class AdoptionOnePage {
  
  @ViewChild("gospelAni")
  public gospelAni: AdoptionAniOneComponent;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptionOnePage');
  }

  ngAfterViewInit() {
    this.gospelAni.createAnim();
    this.gospelAni.setBase();
    
  }

  goHome(params) {
    this.gospelAni.hideAll();
    this.navCtrl.setRoot(HomePage);
  }

  goForward(params){
    this.gospelAni.hideAll();
    this.navCtrl.push(AdoptionTwoPage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  tabOneClick(params) {
    this.gospelAni.hideScene12();
    this.gospelAni.hideScene13();
    this.gospelAni.showScene11();

  }

  tabOneUnclicked(params) {
    this.gospelAni.hideScene11();
    
  }

  tabTwoClick(params) {
    this.gospelAni.hideScene11();
    this.gospelAni.hideScene13();

    this.gospelAni.showScene12();
  }

  tabTwoUnclicked(params) {
    this.gospelAni.hideScene12();
    
  }

  tabThreeClick(params) {
    this.gospelAni.hideScene11();
    this.gospelAni.hideScene12();

    this.gospelAni.showScene13();
  }

  tabThreeUnclicked(params) {
    this.gospelAni.hideScene13();
    
  }
  
}
