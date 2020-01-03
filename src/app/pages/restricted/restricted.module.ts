import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestrictedPageRoutingModule } from './restricted-routing.module';

import { RestrictedPage } from './restricted.page';
import { StatusToastComponent } from 'src/app/components/status-toast/status-toast.component';
import { DeviceComponent } from 'src/app/components/example/device/device.component';
import { InterfaceComponent } from 'src/app/components/example/interface/interface.component';
import { BarcodescannerComponent } from 'src/app/components/example/barcodescanner/barcodescanner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestrictedPageRoutingModule
  ],
  declarations: [RestrictedPage, StatusToastComponent, DeviceComponent, InterfaceComponent, BarcodescannerComponent]
})
export class RestrictedPageModule {}
