import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleGamePage } from './simple-game.page';

const routes: Routes = [
  {
    path: '',
    component: SimpleGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleGamePageRoutingModule {}
