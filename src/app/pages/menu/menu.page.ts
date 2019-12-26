import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Main',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Restricted',
      url: '/menu/restricted',
      icon: 'lock'
    },
    {
      title: 'Signin',
      url: '/menu/signin',
      icon: 'log-in'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
