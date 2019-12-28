import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LocalPersistenceService } from '../../services/local-persistence.service';
import { AppConfigurationService } from 'src/app/services/app-configuration.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public version: String = "";
  public updatable: boolean = false;

  constructor(private persistence: LocalPersistenceService, private config: AppConfigurationService, private swUpdate: SwUpdate) { 
    this.version = config.version;
    this.updatable = this.persistence.getUpdateAvailable();
    this.persistence.getUpdateObservable().subscribe(
      update => this.updatable = update
    );
  }

  ngOnInit() {
  }

  update() {
    this.swUpdate.activateUpdate();
  }
}
