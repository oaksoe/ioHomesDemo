import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserApiService, HomeService, TranslatorService, ToastService, AuthService } from '../../providers';
import { UserMini, Constants } from '../../models';

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
    public neighbors: UserMini[];
    private fetchNeighborsError: string;

    constructor (
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userApiService: UserApiService,
        private homeService: HomeService,
        private translateService: TranslatorService,
        private toastService: ToastService,
        private authService: AuthService,
    ) {
        this.neighbors = [];
        this.fetchNeighborsError = this.translateService.instance('FETCH_NEIGHBORS_ERROR');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatsPage');
        const home = this.homeService.getHome();
        if (home.id) {
            this.userApiService.getNeighbors(home.id).subscribe(result => {
                if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                    this.setNeighbors(result.data);
                } else {
                    this.toastService.show(this.fetchNeighborsError);
                }
            }, err => {
                console.log('error when fetching neighbors info: ', err);
                this.toastService.show(this.fetchNeighborsError);
            });
        }
    } 

    public openChat(userID: string) {
        this.navCtrl.push('ChatPage', userID);
    }

    private setNeighbors(users) {
        const currentUserID = this.authService.getLoggedInUser().id;
        this.neighbors = [];
        users.forEach(user => {
            if (user.id !== currentUserID){
                const neighbor: UserMini = {
                    id: user.id,
                    name: user.name
                };
                
                this.neighbors.push(neighbor);
            }
        });
    }
}
