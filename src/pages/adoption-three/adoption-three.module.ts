import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionThreePage } from './adoption-three';

@NgModule({
  declarations: [
    AdoptionThreePage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionThreePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AdoptionThreePageModule {}
