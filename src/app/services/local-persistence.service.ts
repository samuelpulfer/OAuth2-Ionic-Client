import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Subject } from 'rxjs/Subject';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalPersistenceService {

  private secret: string = "mySuperSecret123"; //max length: 16

  private data: any = {};

  private update = new Subject<boolean>();

  constructor(private persistenceService: PersistenceService) { 
    this.load();
  }

  private store() {
    let _key = CryptoJS.enc.Utf8.parse(this.secret);
    let _iv = CryptoJS.enc.Utf8.parse(this.secret);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(this.data), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    this.persistenceService.set('appdata', encrypted.toString(), {type: StorageType.LOCAL});
  }

  private load() {
    let encrypted = this.persistenceService.get('appdata', StorageType.LOCAL);
    let _key = CryptoJS.enc.Utf8.parse(this.secret);
    let _iv = CryptoJS.enc.Utf8.parse(this.secret);
    try {
      this.data = JSON.parse(CryptoJS.AES.decrypt(
        encrypted, _key, {
          keySize: 16,
          iv: _iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8));
    } catch(e) {
      console.log(e);
      this.data = {};
    }
  }

  public getUpdateObservable() {
    return this.update.asObservable();
  }

  public getExampleData() {
    return this.data.example;
  }

  public getAccessToken() {
    return this.data.accessToken;
  }

  public getRefreshToken() {
    return this.data.refreshToken;
  }

  public getAuthenticated() {
    if(this.data.authenticated == null) {
      return false;
    }
    return this.data.authenticated;
  }

  public getUpdateAvailable() {
    if(this.data.updateavailable == null) {
      return false;
    }
    return this.data.updateavailable;
  }

  public setExampleData(data: String) {
    this.data.example = data;
    this.store();
  }

  public setTokens(accessToken: String, refreshToken: String) {
    this.data.accessToken = accessToken;
    this.data.refreshToken = refreshToken;
    this.store();
  }

  public setAuthenticated(auth: boolean) {
    this.data.authenticated = auth;
    this.store();
  }

  public setUpdateAvailable(available: boolean) {
    this.data.updateavailable = available;
    this.update.next(available);
    this.store();
  }

}
