import { KingdomFourPage } from './../kingdom-four/kingdom-four';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KingdomThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kingdom-three',
  templateUrl: 'kingdom-three.html',
})
export class KingdomThreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KingdomThreePage');
  }

  goForward(params){
    this.navCtrl.push(KingdomFourPage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: "back"});
  }
}
