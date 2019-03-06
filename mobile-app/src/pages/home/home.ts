import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { PopupDialogPage } from '../popup-dialog/popup-dialog';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  home ="Home";

  testCheckboxOpen = false;
  testCheckboxResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.home = navParams.get('home')|| "Home";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  optionMonitor(){ 
    let obj = {type: 'Smart TV'};
    let myModal = this.modalCtrl.create(PopupDialogPage, obj);
    myModal.present();
  }

  optionCCTV(){

    let obj = {type: 'CCTV'};
    let myModal = this.modalCtrl.create(PopupDialogPage, obj);
    myModal.present();
  }

  optionLighting(){
    let obj = {type: 'Lighting'};
    let myModal = this.modalCtrl.create(PopupDialogPage, obj);
    myModal.present();
  }

}
