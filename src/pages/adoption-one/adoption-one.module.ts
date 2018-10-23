import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionOnePage } from './adoption-one';
import { AdoptionAniOneComponent } from '../../components/adoption-ani-one/adoption-ani-one'

@NgModule({
  declarations: [
    AdoptionOnePage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionOnePage),
    AdoptionAniOneComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    AdoptionOnePage,
  ]
})
export class AdoptionOnePageModule {}
