import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

 
@Injectable()
export class ToastService {
    constructor(
        public toastCtrl: ToastController,
    ) {
    }
 
    public show(message: string, position?: string) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: position || 'top'
        });
        toast.present();
    }
}
