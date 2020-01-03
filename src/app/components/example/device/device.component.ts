import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {

  constructor() { }

  interfaces = [
    {
      ipaddress: "192.168.1.1",
      hostname: "host1",
      macaddress: "00:00:00:00:00:00",
      id: 1
    },
    {
      ipaddress: "192.168.1.2",
      hostname: "host2",
      macaddress: "00:00:00:00:00:00",
      id: 1
    },
    {
      ipaddress: "192.168.1.3",
      hostname: "host3",
      macaddress: "00:00:00:00:00:00",
      id: 1
    },
    {
      ipaddress: "192.168.1.4",
      hostname: "host4",
      macaddress: "00:00:00:00:00:00",
      id: 1
    }
  ]

  ngOnInit() {}

  addInterface() {
    this.interfaces.push({
      ipaddress: "10.10.10.10",
      hostname: "something",
      macaddress: "11:11:11:11:11",
      id: 4
    });
  }
}

export interface DeviceInterface {
  ipaddress: string,
  hostname: string,
  macaddress: string,
  id: number
}
