import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KingdomFivePage } from './kingdom-five';

@NgModule({
  declarations: [
    KingdomFivePage,
  ],
  imports: [
    IonicPageModule.forChild(KingdomFivePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class KingdomFivePageModule {}
