import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  version: string;
  loglevel: number;
  authorizationUrl: string;
  tokenUrl: string;
  resourceUrl: string;
  redirectUri: string;
  clientId: string;

  constructor(private httpClient: HttpClient) { }

  ensureInit(): Promise<any> {
    return new Promise((r, e) => {
      this.httpClient.get("./assets/config/config.json")
      .subscribe(
        (content: AppConfigurationService) => {
          Object.assign(this, content);
          r(this);
        },
        reason => e(reason)
      )
    })

  }
}
