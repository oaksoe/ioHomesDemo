import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController} from 'ionic-angular';

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

  constructor(public navParams: NavParams, private view: ViewController) {

    this.type = this.navParams.get('type');
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupDialogPage');
  }

}
