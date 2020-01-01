import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConnectionService } from 'ng-connection-service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-status-toast',
  templateUrl: './status-toast.component.html',
  styleUrls: ['./status-toast.component.scss'],
})
export class StatusToastComponent implements OnInit {

  constructor(public toastController: ToastController, private oauth: OauthService) { 
    this.oauth.getStatusObservable().subscribe(
      state => {
        this.presentToast(state);
      }
    )
  }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
