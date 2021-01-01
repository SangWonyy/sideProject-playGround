import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EditSomethingMainPageRoutingModule} from './editSomething-main-routing.module';
import {EditSomeThingMainPage} from './editSomething-main.page';
import {HeaderComponentModule} from '../common/header/header.component.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditSomethingMainPageRoutingModule,
        HeaderComponentModule
    ],
    declarations: [
        EditSomeThingMainPage
    ],
})
export class EditSomeThingMainPageModule {
}
