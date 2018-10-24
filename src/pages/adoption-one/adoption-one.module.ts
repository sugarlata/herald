import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptionOnePage } from './adoption-one';
import { AdoptionAnimatorComponent } from '../../components/adoption-animator/adoption-animator'

@NgModule({
  declarations: [
    AdoptionOnePage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptionOnePage),
    AdoptionAnimatorComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    AdoptionOnePage,
  ]
})
export class AdoptionOnePageModule {}
