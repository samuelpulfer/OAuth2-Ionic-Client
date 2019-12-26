import { Injectable } from '@angular/core';
import { AppConfigurationService } from './app-configuration.service';

@Injectable({
  providedIn: 'root'
})

//public const loglevel: Number = 0;

export class LoggerService {

  private loglevel: number = 0;

  constructor(private config: AppConfigurationService) {
    this.loglevel = config.loglevel;
   }

  public debug(msg: any) {
    if(this.loglevel > 3) {
      console.log("DEBUG - " + msg);
    }
  }
  public info(msg: any) {
    if(this.loglevel > 2) {
      console.log("INFO - " + msg);
    }
  }
  public warn(msg: any) {
    if(this.loglevel > 1) {
      console.log("WARNING - " + msg);
    }
  }
  public error(msg: any) {
    if(this.loglevel > 0) {
      console.log("ERROR - " + msg);
    }
  }

}
