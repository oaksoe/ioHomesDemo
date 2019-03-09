import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DeviceCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-create',
  templateUrl: 'device-create.html',
})
export class DeviceCreatePage {

  
  constructor( public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceCreatePage');
  }

  cancel(){
    this.view.dismiss();
  }

}
