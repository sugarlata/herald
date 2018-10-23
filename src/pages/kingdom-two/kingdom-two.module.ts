import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KingdomTwoPage } from './kingdom-two';

@NgModule({
  declarations: [
    KingdomTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(KingdomTwoPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class KingdomTwoPageModule {}
