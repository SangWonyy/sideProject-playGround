import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HeaderComponent} from './header.component';
import {HeaderComponentRoutingModule} from './header-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderComponentRoutingModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderComponentModule {
}
