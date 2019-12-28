import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/main',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'main', loadChildren: () => import('../main/main.module').then( m => m.MainPageModule) },
      { path: 'signin', loadChildren: () => import('../signin/signin.module').then( m => m.SigninPageModule) },
      { path: 'restricted', loadChildren: () => import('../restricted/restricted.module').then( m => m.RestrictedPageModule) },
      { path: 'settings', loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
