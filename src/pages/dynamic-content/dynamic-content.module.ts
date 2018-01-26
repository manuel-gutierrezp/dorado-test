import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicContentPage } from './dynamic-content';

@NgModule({
  declarations: [
    DynamicContentPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicContentPage),
  ],
})
export class DynamicContentPageModule {}
