import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService, ToastService, TranslatorService } from '../../providers';
import { User, Constants } from '../../models';
import { WelcomePage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
    private user: User;

    private signupError: string;

    constructor (
        public navCtrl: NavController,
        public authService: AuthService,
        public toastService: ToastService,
        public translateService: TranslatorService
    ) {
        this.signupError = this.translateService.instance('SIGNUP_ERROR');
        this.user = this.authService.initUser();
    }

    public signup() {
        this.authService.register(this.user).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.navCtrl.push(WelcomePage);
            } else {
                this.toastService.show(this.signupError);
            }
        }, err => {
            this.user = this.authService.initUser();
            this.toastService.show(this.signupError);
        });
    }
}
