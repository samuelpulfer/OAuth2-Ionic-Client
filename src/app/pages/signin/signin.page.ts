import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';
import { AppConfigurationService } from 'src/app/services/app-configuration.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public authenticated: boolean = false;
  public username: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauth: OauthService,
    private config: AppConfigurationService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const state = queryParams.get('state');
      const code = queryParams.get('code');
      if (code != null && code !== '') {
        console.log('State: ' + state);
        console.log('Code: ' + code);
        this.oauth.retreiveToken(state, code, 'authorization_code').subscribe(
          x => {
            // this will never happen
          },
          error => {
            // Do something
          },
          () => {
            this.router.navigate(['/menu/signin']);
          }
        );
      }
    });
  }

  logout() {
    console.log("logout");
  }

  login() {
    console.log("login");
    this.oauth.login();
  }

}
