import { KingdomFivePage } from '../kingdom-five/kingdom-five';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KingdomFourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kingdom-four',
  templateUrl: 'kingdom-four.html',
})
export class KingdomFourPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KingdomFourPage');
  }

  goForward(params){
    this.navCtrl.push(KingdomFivePage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }
}
