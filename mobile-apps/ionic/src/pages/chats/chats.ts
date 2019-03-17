import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserApiService } from '../../providers';
import { User } from '../../models';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
    public users: User[];

    constructor (
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userApiService: UserApiService) {
        this.users = [];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatsPage');
    } 

    openChat(userID: string) {
        this.navCtrl.push('ChatPage', userID);
    }
}
