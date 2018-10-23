import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the KingdomFivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kingdom-five',
  templateUrl: 'kingdom-five.html',
})
export class KingdomFivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KingdomFivePage');
  }

  goHome(params){
    this.navCtrl.setRoot(HomePage);
  }

  goBack(params){
    this.navCtrl.pop({animate: true, animation: "transition", duration: 300, direction: 'back'});
  }
}
