import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { GospelAnimatorComponent } from './gospel-animator/gospel-animator';
import { CommonModule } from '@angular/common';
import { AdoptionAniOneComponent } from './adoption-ani-one/adoption-ani-one';
import { AdoptionAniTwoComponent } from './adoption-ani-two/adoption-ani-two';
import { AdoptionAniThreeComponent } from './adoption-ani-three/adoption-ani-three';
import { AdoptionAniFourComponent } from './adoption-ani-four/adoption-ani-four';
import { AdoptionAniFiveComponent } from './adoption-ani-five/adoption-ani-five';

@NgModule({
	declarations: [
		GospelAnimatorComponent,
    	AdoptionAniOneComponent,
		AdoptionAniTwoComponent,
		AdoptionAniThreeComponent,
		AdoptionAniFourComponent,
		AdoptionAniFiveComponent,
	],
	imports: [ 
		CommonModule,
		IonicModule,
	],
	exports: [
		GospelAnimatorComponent,
    	AdoptionAniOneComponent,
		AdoptionAniTwoComponent,
		AdoptionAniThreeComponent,
		AdoptionAniFourComponent,
		AdoptionAniFiveComponent,
	]
})
export class ComponentsModule {}
