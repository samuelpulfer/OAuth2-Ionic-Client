import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { PersistenceModule } from 'angular-persistence';
import { AppConfigurationService } from './services/app-configuration.service';
import { LocalPersistenceService } from './services/local-persistence.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), PersistenceModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigurationFactory,
      deps: [AppConfigurationService, HttpClient], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(update: SwUpdate, settings: LocalPersistenceService) {
    // Update
    update.available.subscribe(
      update => {
        console.log("Update available");
        settings.setUpdateAvailable(true);
      },
      error => {
        console.log("There was an error while checking for updates");
        console.log(error);
      },
      () => {
        console.log("Update subscription completed. (something went wrong...)");
      }
    );
    update.activated.subscribe(
      update => {
        settings.setUpdateAvailable(false);
        console.log("Update was activated");
        window.location.reload(true);
      }
    );
    if(update.isEnabled) {
      console.log("Update is enabled");
      setInterval(() => {
        console.log("checking for updates");
        update.checkForUpdate().then(() => console.log("successfully checked for update"));
      }, 60000);
      console.log("checking for updates");
      update.checkForUpdate().then(() => console.log("successfully checked for update"));
    }
  }
}

export function AppConfigurationFactory(appConfig: AppConfigurationService) {
  return () => appConfig.ensureInit();
}