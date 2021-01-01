import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {menuType: 'mainPage'},
    redirectTo: 'editSomething-main',
    pathMatch: 'full'
  },
  {
    path: 'editSomething-main',
    data: {menuType: 'mainPage'},
    loadChildren: () => import('./editSomeThing-main/editSomething-main.module').then(m => m.EditSomeThingMainPageModule)
  },
  {
    path: 'img-upload',
    data: {menuType: 'upload'},
    loadChildren: () => import('./img-upload/img-upload.module').then(m => m.ImgUploadPageModule)
  },
  {
    path: 'img-edit',
    data: {menuType: 'edit'},
    loadChildren: () => import('./img-edit/img-edit.module').then(m => m.ImgEditPageModule)
  },
  {
    path: 'img-slide',
    data: {menuType: 'slide'},
    loadChildren: () => import('./img-slide/img-slide.module').then(m => m.ImgSlidePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
