import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DeviceInterface } from '../device/device.component';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
})
export class InterfaceComponent implements OnInit, AfterViewInit{

  public ip: string;
  public host: string;
  public mac: string;
  public idnumber: string;

  constructor() { }

  ngOnInit() {
    this.ip = this.interface.ipaddress;
    this.host = this.interface.hostname;
    this.mac = this.interface.macaddress;
  }

  ngAfterViewInit() {
   
  }

  @Input() interface: DeviceInterface;
}
