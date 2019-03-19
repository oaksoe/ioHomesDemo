import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController} from 'ionic-angular';
import { HomeApiService } from '../../providers';
import { Constants } from '../../models';

/**
 * Generated class for the PopupDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-dialog',
  templateUrl: 'popup-dialog.html',
})
export class PopupDialogPage implements OnInit{

    type: any;
    public toggleState = false;

    constructor(
        public navParams: NavParams, 
        private view: ViewController,
        private homeApiService: HomeApiService
    ) {
        this.type = this.navParams.get('type');
    }

    public ngOnInit() {
        this.homeApiService.getToggleState().subscribe(result => {
            if (result.status === Constants.Api.ServerResponseCodes.SUCCESS) {
                this.toggleState = result.data.state === 1 ? true : false;
            }
        });
    }

    closeModal(){
        this.view.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PopupDialogPage');
    }

    public toggleChanged(event) {
        console.log('toggle state: ', this.toggleState);
        this.homeApiService.togglePlug().subscribe(result => {
            console.log(result);
        });
    }
}
