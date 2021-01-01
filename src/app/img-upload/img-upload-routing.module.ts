import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImgUploadPage} from './img-upload.page';

const routes: Routes = [
  {
    path: '',
    component: ImgUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgUploadPageRoutingModule {}
