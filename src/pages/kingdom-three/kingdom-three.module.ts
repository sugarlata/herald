import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KingdomThreePage } from './kingdom-three';

@NgModule({
  declarations: [
    KingdomThreePage,
  ],
  imports: [
    IonicPageModule.forChild(KingdomThreePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class KingdomThreePageModule {}
