import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HeaderComponentModule} from '../common/header/header.component.module';
import {ImgBlockPageRoutingModule} from "./img-block-routing.module";
import {ImgBlockPage} from "./img-block.page";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImgBlockPageRoutingModule,
        HeaderComponentModule
    ],
    declarations: [
        ImgBlockPage
    ],
})
export class ImgBlockPageModule {
}
