import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { PopupDialogPage } from '../popup-dialog/popup-dialog';
import { DeviceCreatePage } from '../device-create/device-create';
import { Home, Constants } from '../../models';
import { HomeService, HomeApiService, AuthService, TranslatorService, ToastService } from '../../providers';

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
    testCheckboxOpen = false;
    testCheckboxResult: any;

    public home: Home;
    public isHomeInfo = false;

    private fetchHomeError: string;
    private updateHomeError: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public modalCtrl: ModalController,
        private homeService: HomeService,
        private homeApiService: HomeApiService,
        private authService: AuthService,
        private translateService: TranslatorService,
        private toastService: ToastService,
    ) {
        this.home = this.homeService.initHome();
        this.fetchHomeError = this.translateService.instance('FETCH_HOME_ERROR');
        this.updateHomeError = this.translateService.instance('UPDATE_HOME_ERROR');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
        this.homeApiService.getHomeByUserID(this.authService.getLoggedInUser().id).subscribe(result => {
                if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                    if (result.data) {
                        this.home = this.homeService.updateHome(result.data);
                    }
                } else {
                    this.toastService.show(this.fetchHomeError);
                }
            }, err => {
                console.log('error when fetching home info: ', err);
                this.toastService.show(this.fetchHomeError);
            });
    }

    optionMonitor() { 
        let obj = {type: 'Smart Plug'};
        let myModal = this.modalCtrl.create(PopupDialogPage, obj);
        myModal.present();
    }

    optionCCTV() {
        let obj = {type: 'CCTV'};
        let myModal = this.modalCtrl.create(PopupDialogPage, obj);
        myModal.present();
    }

    optionLighting(){
        let obj = {type: 'Lighting'};
        let myModal = this.modalCtrl.create(PopupDialogPage, obj);
        myModal.present();
    }

    addNew(){
        let myModal = this.modalCtrl.create(DeviceCreatePage);
        myModal.present();
    }

    public showDevices() {
        this.isHomeInfo = false;
    }

    public showHomeInfo() {
        this.isHomeInfo = true;
    }

    public updateHome() {
        if (!this.home.id) {
            this.createHome();         
        } else {
            this.homeApiService.updateHome(this.home).subscribe(result => {
                if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                    this.toastService.show(this.translateService.instance('UPDATE_HOME_SUCCESS'));
                } else {
                    this.toastService.show(this.updateHomeError);
                }
            }, err => {
                console.log('error when updating home info: ', err);
                this.toastService.show(this.updateHomeError);
            });
        }
    }

    private createHome() {
        this.home.userID = this.authService.getLoggedInUser().id;

        this.homeApiService.createHome(this.home).subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.home.id = result.data.id;
                this.toastService.show(this.translateService.instance('UPDATE_HOME_SUCCESS'));
            } else {
                this.toastService.show(this.updateHomeError);
            }
        }, err => {
            console.log('error when updating home info: ', err);
            this.toastService.show(this.updateHomeError);
        });  
    }
}
