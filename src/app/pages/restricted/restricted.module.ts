import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestrictedPageRoutingModule } from './restricted-routing.module';

import { RestrictedPage } from './restricted.page';
import { StatusToastComponent } from 'src/app/components/status-toast/status-toast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestrictedPageRoutingModule
  ],
  declarations: [RestrictedPage, StatusToastComponent]
})
export class RestrictedPageModule {}
