import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestrictedPage } from './restricted.page';

const routes: Routes = [
  {
    path: '',
    component: RestrictedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedPageRoutingModule {}
