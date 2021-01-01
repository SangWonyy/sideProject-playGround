import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ImgUploadPage} from './img-upload.page';
import {ImgUploadPageRoutingModule} from './img-upload-routing.module';
import {HeaderComponentModule} from '../common/header/header.component.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImgUploadPageRoutingModule,
        HeaderComponentModule
    ],
    declarations: [
        ImgUploadPage
    ],
})
export class ImgUploadPageModule {
}
