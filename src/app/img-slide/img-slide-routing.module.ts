import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImgSlidePage} from './img-slide.page';

const routes: Routes = [
  {
    path: '',
    component: ImgSlidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgSlidePageRoutingModule {}
