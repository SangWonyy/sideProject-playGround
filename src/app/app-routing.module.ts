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
    loadChildren: () => import('./img-block/img-block.module').then(m => m.ImgBlockPageModule)
  },
  {
    path: 'img-slide',
    loadChildren: () => import('./img-slide/img-slide.module').then(m => m.ImgSlidePageModule)
  },
  {
    path: 'simple-game',
    loadChildren: () => import('./simple-game/simple-game.module').then(m => m.SimpleGamePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
