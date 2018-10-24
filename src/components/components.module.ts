import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { GospelAnimatorComponent } from './gospel-animator/gospel-animator';
import { CommonModule } from '@angular/common';
import { AdoptionAniTwoComponent } from './adoption-ani-two/adoption-ani-two';
import { AdoptionAniThreeComponent } from './adoption-ani-three/adoption-ani-three';
import { AdoptionAniFourComponent } from './adoption-ani-four/adoption-ani-four';
import { AdoptionAniFiveComponent } from './adoption-ani-five/adoption-ani-five';
import { AdoptionAnimatorComponent } from './adoption-animator/adoption-animator';

@NgModule({
	declarations: [
		GospelAnimatorComponent,
		AdoptionAniTwoComponent,
		AdoptionAniThreeComponent,
		AdoptionAniFourComponent,
		AdoptionAniFiveComponent,
    	AdoptionAnimatorComponent,
	],
	imports: [ 
		CommonModule,
		IonicModule,
	],
	exports: [
		GospelAnimatorComponent,
		AdoptionAniTwoComponent,
		AdoptionAniThreeComponent,
		AdoptionAniFourComponent,
		AdoptionAniFiveComponent,
    	AdoptionAnimatorComponent,
	]
})
export class ComponentsModule {}
