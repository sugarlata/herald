import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionFourPage } from './adoption-four';

@NgModule({
  declarations: [
    AdoptionFourPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionFourPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AdoptionFourPageModule {}
