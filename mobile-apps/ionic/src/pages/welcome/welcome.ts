import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MainPage } from '..';
import { User, Constants } from '../../models';
import { AuthService, UserApiService, ToastService, TranslatorService, ChatService } from '../../providers';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    public user: User;
    private loginError: string;

    constructor(
        private navCtrl: NavController,
        private authService: AuthService,        
        private userApiService: UserApiService,
        private translateService: TranslatorService,
        private toastService: ToastService,
        private chatService: ChatService,
    ) {
        this.user = this.authService.initUser();
        this.loginError = this.translateService.instance('LOGIN_ERROR');
    }

    public doLogin() {
      this.authService.login(this.user).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.userApiService.getUser(result.data.id).subscribe(result => {
                    if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                        this.authService.setLoggedInUser(result.data);
                        this.chatService.connect();
                        this.navCtrl.push(MainPage);
                    } else {
                        this.toastService.show(this.loginError);
                    }
                }, err => {
                    this.toastService.show(this.loginError);
                });
            } else {
                this.toastService.show(this.loginError);
            }
      }, err => {
          this.user = this.authService.initUser();
          this.toastService.show(this.loginError);
      });
    }

    public signup() {
        this.navCtrl.push('SignupPage');
    }
}
