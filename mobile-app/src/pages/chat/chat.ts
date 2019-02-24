import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  friText = "Hi, Nice to meet you.";
  myText = "Hello."

  username: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
