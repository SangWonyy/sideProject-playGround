import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaygroundMainPage } from './playground-main.page';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaygroundMainPageRoutingModule {}
