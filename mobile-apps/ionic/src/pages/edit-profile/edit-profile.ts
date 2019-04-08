import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AuthService, UserApiService, ToastService, TranslatorService } from '../../providers';
import { User, Constants } from '../../models';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

public user: User;
private updateSuccess: string;
private updateError: string;

  constructor(
    private navCtrl: NavController, 
    private authService: AuthService,
    private translateService: TranslatorService,
    private userApiService: UserApiService,
    private toastService: ToastService,
    private view: ViewController
  ) {
      this.user = this.authService.initUser();
      this.updateSuccess = this.translateService.instance('UPDATE_SUCCESS');
      this.updateError = this.translateService.instance('UPDATE_ERROR');
  }

  public ngOnInit() {
    this.user = this.authService.getLoggedInUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  public closeModal() {
    this.view.dismiss();
  }

  public update() {
    this.userApiService.updateUser(this.user).subscribe((result) => {
        if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
            this.toastService.show(this.updateSuccess);
            this.view.dismiss();
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
