import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupDialogPage } from './popup-dialog';

@NgModule({
  declarations: [
    PopupDialogPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupDialogPage),
  ],
})
export class PopupDialogPageModule {}
