import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopupDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-dialog',
  templateUrl: 'popup-dialog.html',
})
export class PopupDialogPage {

  type: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.type = this.navParams.get('type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupDialogPage');
  }

}
