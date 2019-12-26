import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { PersistenceModule } from 'angular-persistence';
import { AppConfigurationService } from './services/app-configuration.service';

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
export class AppModule {}

export function AppConfigurationFactory(appConfig: AppConfigurationService) {
  return () => appConfig.ensureInit();
}