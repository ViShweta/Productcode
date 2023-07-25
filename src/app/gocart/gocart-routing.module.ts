import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GocartPage } from './gocart.page';

const routes: Routes = [
  {
    path: '',
    component: GocartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GocartPageRoutingModule {}
