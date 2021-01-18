import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {menuType: 'mainPage'},
    redirectTo: 'playground-main',
    pathMatch: 'full'
  },
  {
    path: 'playground-main',
    loadChildren: () => import('./playground-main/playground-main.module').then( m => m.PlaygroundMainPageModule)
  },
  {
    path: 'img-block',
    data: {menuType: 'upload'},
    loadChildren: () => import('./img-block/img-block.module').then(m => m.ImgBlockPageModule)
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
