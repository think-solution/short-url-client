import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../shared/user-details';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userFirstName : string = '';
  loggedIn : boolean = false;
  loginChecked : boolean = false;

  constructor(private loginService : LoginService, public router : Router, private recaptchaV3Service: ReCaptchaV3Service) {
  }

  async ngOnInit(): Promise<void> {
    await this.recaptchaV3Service.execute('check_login').subscribe(async (token : string) => {
      await this.loginService.checkLogin(token).then((data : UserDetails) => {
        if(data){
          this.userFirstName = data.firstName;
          this.loggedIn = true;
        } else {
          this.userFirstName = '';
          this.loggedIn = false;
        }
      }).catch((err) => {
        console.log(err);
        console.log('An error has occured.');
        this.userFirstName = '';
        this.loggedIn = false;
      });
    });
  }

  public async logOut() : Promise<void> {
    this.loginService.logOut();
    var loginInfo = undefined;
    await this.recaptchaV3Service.execute('check_login').subscribe(async (token : string) => {
      loginInfo = this.loginService.checkLogin(token);
    });
    this.loggedIn = loginInfo ? true : false;
  }

}
