import { GospelAnimatorComponent } from './../../components/gospel-animator/gospel-animator';
import { KingdomOnePage } from './../kingdom-one/kingdom-one';
import { AdoptionOnePage } from './../adoption-one/adoption-one';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild("gospelAni")
    public gospelAni: GospelAnimatorComponent;

  constructor(public navCtrl: NavController) {
    
  }

  ngAfterViewInit() {
      this.gospelAni.createAnim();
      this.gospelAni.beginFullAnim();

  }
  
  goToSettings(params){
  }
  
  goToAdoption(params){
    this.navCtrl.push(AdoptionOnePage);
  }

  goToKingdom(params){
    this.navCtrl.push(KingdomOnePage);
  }

  goToExplainer(params){

  }
}