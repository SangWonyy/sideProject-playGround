import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IonTabs, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private router: Router,
        public loadingController: LoadingController,
        public toastController: ToastController
    ) {
    }
    public async go(url) {
        await this.router.navigate([url]);
    }

    async loading(message?) {
        const loading = await this.loadingController.create({
            message: message ? message : '조회중..',
            cssClass: 'custom-loading'
        });
        await loading.present();
        return loading;
    }

    public async showToast(Content, Duration = 2000, Color = 'dark', Position = 'middle'): Promise<void> {

        const toast = await this.toastController.create({
            message: Content,
            // @ts-ignore
            position: Position,
            color: Color,
            duration: Duration

        });
        toast.style.cssText = 'text-align: center';
        await toast.present();
    }

    public hideLoader() {
        this.loadingController.dismiss();
    }
}
