import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { User, Constants } from '../../models';
import { AuthService, UserApiService, ToastService, TranslatorService } from '../../providers';
import { EditProfilePage } from '../edit-profile/edit-profile';

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
export class ProfilePage implements OnInit {

    public user: User;

    constructor(
        private navCtrl: NavController, 
        private authService: AuthService,
        private modalCtrl: ModalController
    ) {
        this.user = this.authService.initUser();
    }

    public ngOnInit() {
        this.user = this.authService.getLoggedInUser();
    }

    public editProfile() {
        let myModal = this.modalCtrl.create(EditProfilePage);
        myModal.present();
    }

    public ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

    public goToHouse(){
        this.navCtrl.push('HousePage');
    }

    
}
