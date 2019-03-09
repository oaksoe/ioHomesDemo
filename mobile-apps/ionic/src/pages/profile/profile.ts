import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HousePage } from '../house/house';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  isDisabled = false;
  username="Thet Htet Aung";
  mail="thethtetaung17@gmail.com";
  gender="Male";
  phonenum="09787800455";
  address="60 St & Myitzu St Corner, Mandalay."
  houses:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToHouse(){
    this.navCtrl.push('HousePage');
  }


}
