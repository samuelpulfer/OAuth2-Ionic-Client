import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestrictedPageRoutingModule } from './restricted-routing.module';

import { RestrictedPage } from './restricted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestrictedPageRoutingModule
  ],
  declarations: [RestrictedPage]
})
export class RestrictedPageModule {}
