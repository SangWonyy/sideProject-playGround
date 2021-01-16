import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImgBlockPage} from "./img-block.page";

const routes: Routes = [
  {
    path: '',
    component: ImgBlockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgBlockPageRoutingModule {}
