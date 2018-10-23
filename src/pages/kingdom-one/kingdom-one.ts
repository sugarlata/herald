import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KingdomTwoPage } from '../kingdom-two/kingdom-two';
import { HomePage } from '../home/home';

/**
 * Generated class for the KingdomOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kingdom-one',
  templateUrl: 'kingdom-one.html',
})
export class KingdomOnePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KingdomOnePage');
  }

  goForward(params){
    this.navCtrl.push(KingdomTwoPage, {params: params}, {animate: true, animation: "transition", duration: 300, direction: 'forward'});
  }

  goHome(params){
    this.navCtrl.setRoot(HomePage);
  }
}
