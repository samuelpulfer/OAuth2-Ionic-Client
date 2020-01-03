import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.page.html',
  styleUrls: ['./restricted.page.scss'],
})
export class RestrictedPage implements OnInit {

  constructor(private oauth: OauthService ) { }

  ngOnInit() {
  }

  doit() {
    this.oauth.getResourceData("i/am/inexistent").subscribe(
      (result: any) => {
        console.log("result", result);
      },
      (error: HttpErrorResponse) => {
        console.log("error", error);
      },
      () => console.log("completed")
    )
  }

  getBarcode(barcode: string) {
    console.log(barcode);
  }
}
