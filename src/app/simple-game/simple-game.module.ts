import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimpleGamePageRoutingModule } from './simple-game-routing.module';

import { SimpleGamePage } from './simple-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimpleGamePageRoutingModule
  ],
  declarations: [SimpleGamePage]
})
export class SimpleGamePageModule {}
