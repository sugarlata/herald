import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KingdomThreePage } from '../kingdom-three/kingdom-three';

/**
 * Generated class for the KingdomTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kingdom-two',
  templateUrl: 'kingdom-two.html',
})
export class KingdomTwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KingdomTwoPage');
  }

  goForward(params){
    this.navCtrl.push(KingdomThreePage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }

}
