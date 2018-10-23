import { AdoptionAniTwoComponent } from './../../components/adoption-ani-two/adoption-ani-two';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionTwoPage } from './adoption-two';

@NgModule({
  declarations: [
    AdoptionTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionTwoPage),
    AdoptionAniTwoComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    AdoptionTwoPage,
  ]
})
export class AdoptionTwoPageModule {}
