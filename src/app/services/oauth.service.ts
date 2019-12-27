import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { AppConfigurationService } from './app-configuration.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LocalPersistenceService } from './local-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private logger: LoggerService,
    private config: AppConfigurationService,
    private settings: LocalPersistenceService,
    private http: HttpClient) {
      this.authenticated = this.settings.getAuthenticated();
      this.auth.next(this.authenticated);
      this.auth.subscribe(
        auth => {
          this.authenticated = auth;
          this.settings.setAuthenticated(auth);
        }
      );
     }

  private authenticated: boolean = false;
  private auth = new Subject<boolean>();

  getAuthObservable() {
    return this.auth.asObservable();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  login() {
    let url = this.config.authorizationUrl;
    url += '?response_type=code';
    url += '&client_id=' + this.config.clientId;
    url += '&redirect_uri=' + this.config.redirectUri;
    url += '&scope=' + this.config.openIdScope;
    this.logger.debug('Url: ' + url);
    window.location.href = url;
  }

  logout() {
    this.auth.next(false);
  }

  retreiveToken(state: string, code: string, grantType: string) {
    this.logger.info('retrieveToken for code: ' + code);
    return new Observable(subscriber => {
      if(state != null && code.length > 10) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        };
        let data = 'grant_type=' + grantType;
        data += '&redirect_uri=' + this.config.redirectUri;
        data += '&client_id=' + this.config.clientId;
        if(grantType === 'refresh_token') {
          data += '&refresh_token=' + code;
        } else {
          data += '&code=' + code;
        }
        this.logger.info('post to server: ' + data);
        this.http.post(this.config.tokenUrl, data, httpOptions).subscribe(
          (data: any[]) => {
            this.logger.info('Token received' + data);
            if(data['access_token'] !== null && data['refresh_token'] !== null) {
              this.settings.setTokens(data['access_token'], data['refresh_token']);
              this.auth.next(true);
              subscriber.complete();
            } else {
              this.logger.info('cant find token');
              subscriber.error('No tokens received');
            }
          },
          error => {
            this.logger.info('Post went wrong..');
            subscriber.error(error);
          }
        );
      } else {
        this.logger.info('Code looks wrong...');
        subscriber.error('Wrong code received...');
      }
    });
  }

  getResourceData(resource: string) {
    return this.getData(this.urlTrailer(this.config.resourceUrl) + resource);
  }

  getUserinfo() {
    console.log("Authenticated: " + this.authenticated);
    return this.getData(this.config.userinfoUrl);
  }

  private getDataNoAuthCheck(resource: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        //Accept: 'application/fhir+json; fhirVersion=4.0',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.settings.getAccessToken()
      })
    };
    return this.http.get(resource, httpOptions);
  }

  private urlTrailer(url: string) {
    if(url == null || url.endsWith("/")) {
      return url;
    }
    return url + "/";
  }

  private getData(resource: string) {
    this.logger.info('getData for: ' + resource);
    return new Observable(subscriber => {
      if (!this.authenticated) {
        this.logger.warn('user is not authenticated');
        subscriber.error('User is not signed in');
        return;
      }
      this.logger.debug('First try to get data');
      this.getDataNoAuthCheck(resource).subscribe(
        (data: any[]) => {
          this.logger.debug('Data received: ' + data);
          subscriber.next(data);
          subscriber.complete();
        },
        error => {
          // maybe try to refresh the authentication token
          this.logger.debug('First try failed, try to get the data');
          this.retreiveToken('none', this.settings.getRefreshToken(), 'refresh_token').subscribe(
            x => { console.log('this will never happen...'); },
            error => {
              this.logger.error('refresh failed, looks like you logged out');
              this.auth.next(false);
              subscriber.error(error);
            },
            () => {
              this.getDataNoAuthCheck(resource).subscribe(
                (data: any[]) => {
                  this.logger.debug('Data reveiced at second try: ' + data);
                  subscriber.next(data);
                  subscriber.complete();
                },
                error => {
                  this.logger.error('Second try failed.. will logout');
                  this.auth.next(false);
                  subscriber.error(error);
                }
              );
            }
          );
        }
      );
    });
  }









}
