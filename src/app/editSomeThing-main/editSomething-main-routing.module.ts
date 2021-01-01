import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditSomeThingMainPage} from './editSomething-main.page';

const routes: Routes = [
  {
    path: '',
    component: EditSomeThingMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSomethingMainPageRoutingModule {}
