import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaygroundMainPageRoutingModule } from './playground-main-routing.module';

import { PlaygroundMainPage } from './playground-main.page';
import {HeaderComponentModule} from "../common/header/header.component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaygroundMainPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [PlaygroundMainPage]
})
export class PlaygroundMainPageModule {}
