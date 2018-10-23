import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KingdomFourPage } from './kingdom-four';

@NgModule({
  declarations: [
    KingdomFourPage,
  ],
  imports: [
    IonicPageModule.forChild(KingdomFourPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class KingdomFourPageModule {}
