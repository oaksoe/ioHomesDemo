import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User, Constants } from '../../models';
import { AuthService, UserApiService, ToastService, TranslatorService } from '../../providers';
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
export class ProfilePage implements OnInit {

    private user: User;
    private updateSuccess: string;
    private updateError: string;

    constructor(
        private navCtrl: NavController, 
        private translateService: TranslatorService,
        private authService: AuthService,
        private userApiService: UserApiService,
        private toastService: ToastService
    ) {
        this.user = this.authService.initUser();
        this.updateSuccess = this.translateService.instance('UPDATE_SUCCESS');
        this.updateError = this.translateService.instance('UPDATE_ERROR');
    }

    public ngOnInit() {
        this.user = this.authService.getLoggedInUser();
    }

    public ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

    public goToHouse(){
        this.navCtrl.push('HousePage');
    }

    public update() {
        this.userApiService.updateUser(this.user).subscribe((result) => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.toastService.show(this.updateSuccess);
            } else {
                console.log('Error at login. ', result.error);
                this.toastService.show(this.updateError);
            }
        }, (err) => {
            this.user = this.authService.initUser();
            this.toastService.show(this.updateError);
        });
    }
}
