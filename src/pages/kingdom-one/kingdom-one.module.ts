import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KingdomOnePage } from './kingdom-one';

@NgModule({
  declarations: [
    KingdomOnePage,
  ],
  imports: [
    IonicPageModule.forChild(KingdomOnePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class KingdomOnePageModule {}
