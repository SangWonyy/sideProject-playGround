import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ImgEditPageRoutingModule} from './img-edit-routing.module';
import {ImgEditPage} from './img-edit.page';
import {HeaderComponentModule} from '../common/header/header.component.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImgEditPageRoutingModule,
        HeaderComponentModule
    ],
    declarations: [
        ImgEditPage
    ],
})
export class ImgEditPageModule {
}
