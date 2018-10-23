import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdoptionOnePage } from './../pages/adoption-one/adoption-one';
import { AdoptionTwoPage } from './../pages/adoption-two/adoption-two';
import { AdoptionThreePage } from './../pages/adoption-three/adoption-three';
import { AdoptionFourPage } from './../pages/adoption-four/adoption-four';
import { AdoptionFivePage } from './../pages/adoption-five/adoption-five';
import { KingdomOnePage } from './../pages/kingdom-one/kingdom-one';
import { KingdomTwoPage } from './../pages/kingdom-two/kingdom-two';
import { KingdomThreePage } from './../pages/kingdom-three/kingdom-three';
import { KingdomFourPage } from './../pages/kingdom-four/kingdom-four';
import { KingdomFivePage } from './../pages/kingdom-five/kingdom-five';

import { GospelAnimatorComponent } from './../components/gospel-animator/gospel-animator';
import { AdoptionAniOneComponent } from './../components/adoption-ani-one/adoption-ani-one';
import { AdoptionAniTwoComponent } from './../components/adoption-ani-two/adoption-ani-two';
import { AdoptionAniThreeComponent } from './../components/adoption-ani-three/adoption-ani-three';
import { AdoptionAniFourComponent } from './../components/adoption-ani-four/adoption-ani-four';
import { AdoptionAniFiveComponent } from './../components/adoption-ani-five/adoption-ani-five';

import { ParallaxHeaderDirective } from './../directives/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdoptionOnePage,
    AdoptionTwoPage,
    AdoptionThreePage,
    AdoptionFourPage,
    AdoptionFivePage,
    KingdomOnePage,
    KingdomTwoPage,
    KingdomThreePage,
    KingdomFourPage,
    KingdomFivePage,
    GospelAnimatorComponent,
    AdoptionAniOneComponent,
    AdoptionAniTwoComponent,
    AdoptionAniThreeComponent,
    AdoptionAniFourComponent,
    AdoptionAniFiveComponent,
    ParallaxHeaderDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    GospelAnimatorComponent,
    AdoptionAniOneComponent,
    AdoptionAniTwoComponent,
    AdoptionAniThreeComponent,
    AdoptionAniFourComponent,
    AdoptionAniFiveComponent,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdoptionOnePage,
    AdoptionTwoPage,
    AdoptionThreePage,
    AdoptionFourPage,
    AdoptionFivePage,
    KingdomOnePage,
    KingdomTwoPage,
    KingdomThreePage,
    KingdomFourPage,
    KingdomFivePage,
    GospelAnimatorComponent,
    AdoptionAniOneComponent,
    AdoptionAniTwoComponent,
    AdoptionAniThreeComponent,
    AdoptionAniFourComponent,
    AdoptionAniFiveComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
