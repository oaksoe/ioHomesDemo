import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceCreatePage } from './device-create';

@NgModule({
  declarations: [
    DeviceCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceCreatePage),
  ],
})
export class DeviceCreatePageModule {}
