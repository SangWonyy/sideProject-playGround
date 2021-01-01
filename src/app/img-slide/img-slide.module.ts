import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ImgSlidePageRoutingModule} from './img-slide-routing.module';
import {ImgSlidePage} from './img-slide.page';
import {HeaderComponentModule} from '../common/header/header.component.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ImgSlidePageRoutingModule,
        HeaderComponentModule
    ],
    declarations: [
        ImgSlidePage
    ],
})
export class ImgSlidePageModule {
}
