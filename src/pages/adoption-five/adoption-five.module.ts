import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionFivePage } from './adoption-five';

@NgModule({
  declarations: [
    AdoptionFivePage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionFivePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AdoptionFivePageModule {}
